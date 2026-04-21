import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import net from "node:net";

const args = parseArgs(process.argv.slice(2));

const options = {
  url: args.url ?? "http://127.0.0.1:4173",
  out: args.out ?? path.resolve("static-preview.html"),
  edgePath:
    args.edgePath ??
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  width: Number(args.width ?? 1440),
  height: Number(args.height ?? 1200),
  waitMs: Number(args.wait ?? 1200),
};

let browser;
let userDataDir;
let ws;

try {
  const debugPort = await getFreePort();
  userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "mc-static-export-"));

  browser = spawn(
    options.edgePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-crash-reporter",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    {
      stdio: "ignore",
      windowsHide: true,
    },
  );

  const endpoint = `http://127.0.0.1:${debugPort}`;
  await waitForDebugger(endpoint);

  const targets = await fetchJson(`${endpoint}/json/list`);
  const pageTarget = targets.find((target) => target.type === "page");

  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("Unable to find a debuggable Edge page target.");
  }

  const session = await connect(pageTarget.webSocketDebuggerUrl);
  ws = session.ws;

  await session.send("Page.enable");
  await session.send("Runtime.enable");
  await session.send("Emulation.setDeviceMetricsOverride", {
    width: options.width,
    height: options.height,
    mobile: false,
    deviceScaleFactor: 1,
  });
  await session.send("Page.navigate", { url: options.url });
  await session.waitFor("Page.loadEventFired");
  await session.send("Runtime.evaluate", {
    expression: "document.fonts ? document.fonts.ready.then(() => true) : true",
    awaitPromise: true,
    returnByValue: true,
  });
  await delay(options.waitMs);

  const htmlResult = await session.send("Runtime.evaluate", {
    expression: `(() => {
      const clone = document.documentElement.cloneNode(true);
      clone.querySelectorAll('script[type="module"]').forEach((node) => node.remove());
      clone.querySelectorAll('link[rel="modulepreload"]').forEach((node) => node.remove());
      clone.querySelectorAll('[crossorigin]').forEach((node) => {
        const href = node.getAttribute('href') ?? '';
        const src = node.getAttribute('src') ?? '';
        const target = href || src;

        if (target.startsWith('./') || target.startsWith('assets/')) {
          node.removeAttribute('crossorigin');
        }
      });
      return '<!DOCTYPE html>\\n' + clone.outerHTML;
    })()`,
    returnByValue: true,
  });

  fs.writeFileSync(options.out, htmlResult.result.value, "utf8");
} finally {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }

  if (browser && !browser.killed) {
    spawnSync("taskkill", ["/PID", String(browser.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
    await delay(300);
  }

  if (userDataDir) {
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      // Ignore Windows temp cleanup races after Edge exits.
    }
  }
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }

    parsed[key] = value;
    index += 1;
  }

  return parsed;
}

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForDebugger(endpoint) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      await fetchJson(`${endpoint}/json/version`);
      return;
    } catch {
      await delay(200);
    }
  }

  throw new Error("Timed out waiting for Edge remote debugging endpoint.");
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function connect(debuggerUrl) {
  const ws = new WebSocket(debuggerUrl);
  const pending = new Map();
  const listeners = new Map();
  let sequence = 0;

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  ws.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);

    if (payload.id) {
      const entry = pending.get(payload.id);

      if (!entry) {
        return;
      }

      pending.delete(payload.id);

      if (payload.error) {
        entry.reject(new Error(payload.error.message));
        return;
      }

      entry.resolve(payload.result);
      return;
    }

    const handlers = listeners.get(payload.method);

    if (handlers) {
      for (const handler of handlers) {
        handler(payload.params ?? {});
      }
    }
  });

  return {
    ws,
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++sequence;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    },
    waitFor(method, timeoutMs = 10000) {
      return new Promise((resolve, reject) => {
        const handlers = listeners.get(method) ?? new Set();

        const timer = setTimeout(() => {
          handlers.delete(onEvent);
          reject(new Error(`Timed out waiting for ${method}`));
        }, timeoutMs);

        const onEvent = (params) => {
          clearTimeout(timer);
          handlers.delete(onEvent);
          resolve(params);
        };

        handlers.add(onEvent);
        listeners.set(method, handlers);
      });
    },
  };
}
