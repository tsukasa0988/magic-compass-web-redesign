<script setup>
import { computed, ref, watch } from "vue";

const isMenuOpen = ref(false);

const navItems = [
  { label: "首頁", href: "#hero" },
  { label: "交易產品", href: "#markets" },
  { label: "交易平台", href: "#platform" },
  { label: "市場分析", href: "#quotes" },
  { label: "學習與支持", href: "#video" },
  { label: "關於我們", href: "#trust" },
  { label: "合作伙伴", href: "#footer" },
];

const stats = [
  { label: "產品", value: "50+", icon: "cube" },
  { label: "最高杠杆", value: "1:400", icon: "leverage" },
  { label: "點差低至", value: "0.1 Pip", icon: "spread" },
  { label: "最低交易手數", value: "0.01 手", icon: "lot" },
];

const marketTabs = ["外匯", "貴金屬", "指數", "商品", "加密貨幣"];

const marketCards = [
  {
    symbol: "EURUSD",
    change: "+0.23%",
    trend: "positive",
    price: "1.08540",
    points: "0,38 12,36 24,40 36,24 48,30 60,16 72,20 84,14 96,18 108,12 124,18 140,10 160,14",
  },
  {
    symbol: "XAUUSD",
    change: "+0.18%",
    trend: "positive",
    price: "2335.57",
    points: "0,34 18,38 36,28 54,30 72,22 90,18 108,24 126,16 144,20 160,14",
  },
  {
    symbol: "GBPUSD",
    change: "+0.16%",
    trend: "positive",
    price: "1.26487",
    points: "0,40 18,34 36,36 54,24 72,30 90,20 108,24 126,18 144,22 160,16",
  },
  {
    symbol: "USDJPY",
    change: "+0.21%",
    trend: "positive",
    price: "152.634",
    points: "0,36 16,40 32,26 48,24 64,20 80,16 96,18 112,12 128,16 144,10 160,8",
  },
  {
    symbol: "USOIL",
    change: "-0.15%",
    trend: "negative",
    price: "78.45",
    points: "0,16 16,18 32,22 48,26 64,24 80,30 96,28 112,34 128,32 144,38 160,36",
  },
  {
    symbol: "BTCUSD",
    change: "+1.32%",
    trend: "positive",
    price: "67821.3",
    points: "0,38 16,32 32,36 48,24 64,22 80,18 96,16 112,18 128,14 144,18 160,12",
  },
];

const heroWatchlist = [
  { pair: "EURUSD", price: "1.08540", delta: "+0.23%", trend: "positive" },
  { pair: "GBPUSD", price: "1.26487", delta: "+0.16%", trend: "positive" },
  { pair: "XAUUSD", price: "2335.57", delta: "+0.18%", trend: "positive" },
  { pair: "USOIL", price: "78.45", delta: "-0.15%", trend: "negative" },
  { pair: "BTCUSD", price: "67821.3", delta: "+1.32%", trend: "positive" },
];

const heroFooterStats = [
  { label: "Orders", value: "06" },
  { label: "Exposure", value: "$84K" },
  { label: "Swap", value: "Live" },
];

const heroStatusItems = [
  { label: "Spread", value: "0.1 Pip" },
  { label: "Margin Lv.", value: "398%" },
  { label: "Latency", value: "11 ms" },
  { label: "Session", value: "London" },
];

const heroPhoneStats = [
  { label: "BUY", value: "1.08540", tone: "up" },
  { label: "SELL", value: "1.08560", tone: "down" },
  { label: "SPREAD", value: "0.1 Pip", tone: "neutral" },
];

const advantages = [
  {
    title: "資金安全保障",
    body: "多重監管、資金分離與風控流程，以正式金融平台語氣承接信任感。",
    icon: "shield",
  },
  {
    title: "穩定快速執行",
    body: "低延遲執行架構與更乾淨的資訊呈現，強化成熟交易終端印象。",
    icon: "bolt",
  },
  {
    title: "多元交易產品",
    body: "外匯、黃金、指數、能源與加密貨幣，保留完整 CFD 市場廣度。",
    icon: "stack",
  },
  {
    title: "專業客戶支持",
    body: "7x24 小時支援與清楚服務承諾，不用過度促銷也能建立信任。",
    icon: "support",
  },
];

const downloadItems = [
  {
    title: "Android",
    kicker: "MOBILE APP",
    system: "手機 / 平板",
    subtitle: "隨時隨地掌握行情與持倉",
    icon: "android",
    cta: "Google Play",
  },
  {
    title: "iOS",
    kicker: "MOBILE APP",
    system: "iPhone / iPad",
    subtitle: "流暢交易體驗與一致視覺語言",
    icon: "ios",
    cta: "App Store",
  },
  {
    title: "MetaTrader 4",
    kicker: "DESKTOP TERMINAL",
    system: "桌面 / 專業交易",
    subtitle: "成熟終端平台，承接更完整的交易操作",
    icon: "mt4",
    cta: "下載 MT4",
  },
];

const quoteRows = [
  {
    name: "NAS100.g",
    bid: "16521.60",
    ask: "16622.90",
    change: "+53.40",
    ratio: "+0.29%",
    changeClass: "up",
  },
  {
    name: "UKOIL.g",
    bid: "82.44",
    ask: "82.46",
    change: "-0.27",
    ratio: "-0.33%",
    changeClass: "down",
  },
  {
    name: "XAUUSD.g",
    bid: "2335.57",
    ask: "2335.77",
    change: "+4.21",
    ratio: "+0.18%",
    changeClass: "up",
  },
  {
    name: "EURUSD.g",
    bid: "1.08540",
    ask: "1.08560",
    change: "+0.00246",
    ratio: "+0.23%",
    changeClass: "up",
  },
];

const flowSteps = [
  {
    step: "STEP 1",
    title: "註冊帳戶",
    body: "填寫信息並完成身份驗證。",
  },
  {
    step: "STEP 2",
    title: "快速入金",
    body: "選擇入金方式，快速進入市場。",
  },
  {
    step: "STEP 3",
    title: "開始交易",
    body: "執行訂單，把握全球市場機會。",
  },
];

const trustItems = [
  {
    kicker: "REGULATION",
    title: "多重監管",
    body: "合規牌照建立品牌信任。",
  },
  {
    kicker: "FUNDS",
    title: "資金隔離",
    body: "客戶資金分離存放。",
  },
  {
    kicker: "TRANSPARENCY",
    title: "透明交易",
    body: "報價與成本呈現清楚。",
  },
  {
    kicker: "SERVICE",
    title: "7x24 支持",
    body: "全天候支援真實交易。",
  },
];

const footerColumns = [
  {
    title: "關於我們",
    links: ["公司介紹", "監管信息", "聯繫我們"],
  },
  {
    title: "交易產品",
    links: ["外匯", "貴金屬", "指數"],
  },
  {
    title: "交易平台",
    links: ["MetaTrader 4", "平台下載", "市場分析"],
  },
];

const menuLabel = computed(() => (isMenuOpen.value ? "Close menu" : "Open menu"));

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(isMenuOpen, (value) => {
  document.body.classList.toggle("menu-open", value);
});
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#hero" aria-label="Magic Compass" @click="closeMenu">
          <span class="brand-mark">
            <span class="brand-ring"></span>
            <span class="brand-swoosh"></span>
          </span>
          <span class="brand-text">
            <strong>MAGIC COMPASS</strong>
            <small>GSCCE 209/110</small>
          </span>
        </a>

        <nav class="desktop-nav" aria-label="Primary">
          <a
            v-for="(item, index) in navItems"
            :key="item.label"
            :class="{ 'is-active': index === 0 }"
            :href="item.href"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="header-actions">
          <button class="lang-button" type="button">中文</button>
          <a class="ghost-button header-button subtle" href="#footer">登入</a>
          <a class="primary-button header-button" href="#bottom-cta">立即開戶</a>
          <button
            class="menu-toggle"
            :class="{ 'is-open': isMenuOpen }"
            type="button"
            :aria-expanded="String(isMenuOpen)"
            aria-controls="mobile-menu"
            :aria-label="menuLabel"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div v-show="isMenuOpen" id="mobile-menu" class="mobile-menu">
        <div class="mobile-menu-panel">
          <a
            v-for="item in navItems"
            :key="`mobile-${item.label}`"
            :href="item.href"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
          <div class="mobile-menu-actions">
            <a class="ghost-button subtle" href="#footer" @click="closeMenu">登入</a>
            <a class="primary-button" href="#bottom-cta" @click="closeMenu">立即開戶</a>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section id="hero" class="hero-section">
        <div class="hero-backdrop">
          <div class="hero-grid"></div>
          <div class="hero-orbit"></div>
          <div class="hero-bars">
            <span v-for="bar in 7" :key="bar"></span>
          </div>
          <div class="hero-map"></div>
        </div>
        <div class="container hero-layout">
          <div class="hero-copy">
            <span class="eyebrow">MAGIC COMPASS GLOBAL MARKETS</span>
            <h1>全球市場，一站式交易體驗</h1>
            <p>
              穩定執行、多元市場與專業支持，
              呈現成熟 CFD 平台應有的終端質感。
            </p>
            <div class="hero-cta">
              <a class="primary-button hero-primary" href="#bottom-cta">立即開戶</a>
              <a class="ghost-button hero-secondary" href="#platform">了解更多</a>
            </div>
            <ul class="hero-points">
              <li>安全</li>
              <li>執行</li>
              <li>產品</li>
              <li>支持</li>
            </ul>
          </div>

          <div class="hero-visual">
            <div class="device-cluster">
              <div class="visual-glow"></div>
              <div class="terminal-shell">
                <div class="terminal-topbar">
                  <div class="terminal-window-controls" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="terminal-nav" aria-hidden="true">
                    <span class="is-active">EURUSD</span>
                    <span>XAUUSD</span>
                    <span>NAS100</span>
                  </div>
                  <div class="terminal-brand">Magic Compass Terminal</div>
                </div>
                <div class="terminal-layout">
                  <div class="terminal-main">
                    <div class="terminal-chart-head">
                      <div>
                        <small>EURUSD · LIVE</small>
                        <strong>1.08540</strong>
                      </div>
                      <div class="terminal-chart-meta">
                        <span>1H</span>
                        <span>+0.23%</span>
                      </div>
                    </div>
                    <div class="terminal-chart">
                      <div class="terminal-chart-callout">
                        <small>Bid / Ask</small>
                        <strong>1.08540 / 1.08560</strong>
                      </div>
                      <div class="terminal-crosshair" aria-hidden="true"></div>
                      <div class="terminal-axis">
                        <span>1.0900</span>
                        <span>1.0860</span>
                        <span>1.0820</span>
                      </div>
                      <div class="terminal-grid">
                        <span v-for="line in 6" :key="`h-${line}`"></span>
                      </div>
                      <div class="terminal-bars">
                        <span v-for="line in 9" :key="`bar-${line}`"></span>
                      </div>
                      <div class="terminal-xaxis">
                        <span>08:00</span>
                        <span>12:00</span>
                        <span>16:00</span>
                        <span>20:00</span>
                      </div>
                      <svg viewBox="0 0 420 180" preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                          points="0,138 24,112 48,124 72,92 96,104 120,70 144,80 168,48 192,62 216,34 240,52 264,16 288,40 312,28 336,10 360,24 390,18 420,28"
                        />
                      </svg>
                      <div class="terminal-statusbar">
                        <div v-for="item in heroStatusItems" :key="item.label" class="status-chip">
                          <small>{{ item.label }}</small>
                          <strong>{{ item.value }}</strong>
                        </div>
                      </div>
                    </div>
                    <div class="terminal-panels">
                      <div class="terminal-panel">
                        <small>Equity</small>
                        <strong>$24,816</strong>
                      </div>
                      <div class="terminal-panel">
                        <small>Margin Lv.</small>
                        <strong>398.4%</strong>
                      </div>
                      <div class="terminal-panel">
                        <small>Free Margin</small>
                        <strong>$18,570</strong>
                      </div>
                    </div>
                  </div>
                  <div class="terminal-side">
                    <div class="side-title">MARKET WATCH</div>
                    <div class="side-head">
                      <span>PAIR</span>
                      <span>LAST</span>
                      <span>CHG</span>
                    </div>
                    <div class="side-row" v-for="item in heroWatchlist" :key="item.pair">
                      <span class="side-pair">{{ item.pair }}</span>
                      <span class="side-price">{{ item.price }}</span>
                      <span :class="['side-delta', item.trend]">{{ item.delta }}</span>
                    </div>
                    <div class="side-actions">
                      <button type="button" class="sell-button">SELL</button>
                      <button type="button" class="buy-button">BUY</button>
                    </div>
                  </div>
                </div>
                <div class="terminal-footer">
                  <div v-for="item in heroFooterStats" :key="item.label" class="footer-chip">
                    <small>{{ item.label }}</small>
                    <strong>{{ item.value }}</strong>
                  </div>
                </div>
              </div>

              <div class="phone-shell">
                <div class="phone-screen">
                  <div class="phone-notch"></div>
                  <div class="phone-strip">
                    <span>Real</span>
                    <span>11 ms</span>
                  </div>
                  <div class="phone-head">
                    <strong>EURUSD</strong>
                    <span class="positive">+0.23%</span>
                  </div>
                  <div class="phone-chart">
                    <div class="phone-callout">
                      <small>Spread</small>
                      <strong>0.1 Pip</strong>
                    </div>
                    <svg viewBox="0 0 120 220" preserveAspectRatio="none" aria-hidden="true">
                      <polyline
                        points="0,166 14,154 28,156 42,142 56,146 70,136 84,138 98,126 112,132 120,128"
                      />
                    </svg>
                  </div>
                  <div class="phone-rows">
                    <div v-for="item in heroPhoneStats" :key="item.label" class="phone-row-card">
                      <small>{{ item.label }}</small>
                      <strong :class="item.tone">{{ item.value }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="stats-strip container">
        <article v-for="item in stats" :key="item.label" class="stat-item">
          <div class="stat-icon" :class="item.icon"></div>
          <div class="stat-copy">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </article>
      </section>

      <section id="markets" class="section container section-spacing">
        <div class="section-heading">
          <div>
            <h2>熱門市場報價</h2>
            <p>保留交易平台感，但用更乾淨的卡片與留白處理資訊密度。</p>
          </div>
          <a href="#quotes">查看更多</a>
        </div>

        <div class="market-tabs" aria-label="Market categories">
          <button
            v-for="(tab, index) in marketTabs"
            :key="tab"
            :class="{ 'is-active': index === 0 }"
            type="button"
          >
            {{ tab }}
          </button>
        </div>

        <div class="market-grid-shell">
          <div class="market-grid">
            <article v-for="card in marketCards" :key="card.symbol" class="market-card">
              <div class="market-card-head">
                <div class="market-copy">
                  <small>現價</small>
                  <strong>{{ card.symbol }}</strong>
                  <span class="market-price">{{ card.price }}</span>
                </div>
                <span :class="['market-change', card.trend]">{{ card.change }}</span>
              </div>
              <svg
                viewBox="0 0 160 48"
                :class="['sparkline', card.trend]"
                aria-hidden="true"
              >
                <polyline :points="card.points" />
              </svg>
            </article>
          </div>
        </div>
      </section>

      <section id="platform" class="section container platform-slice">
        <article class="platform-overview glass-panel">
          <div class="platform-copy">
            <span class="eyebrow light">PLATFORM OVERVIEW</span>
            <h2>輕鬆交易，暢贏全球</h2>
            <p>
              隨時隨地掌握行情，多端同步。延續現有官網的成熟商業邏輯，
              但把整體節奏、視覺層級與平台感重新整理得更乾淨。
            </p>
            <ul class="platform-points">
              <li>跨設備一致體驗</li>
              <li>成熟終端視覺語言</li>
              <li>保留 CFD 市場屬性</li>
            </ul>
            <a class="secondary-button" href="#download">了解交易平台</a>
          </div>
          <div class="platform-mockup">
            <div class="mockup-device mini">
              <div class="mockup-screen">
                <div class="mockup-status">
                  <span class="is-live">LIVE</span>
                  <span>EURUSD</span>
                </div>
                <div class="mockup-line"></div>
                <div class="mockup-line short"></div>
                <div class="mockup-chart">
                  <div class="mockup-chart-pill">
                    <small>Price</small>
                    <strong>1.08540</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="mockup-device wide">
              <div class="mockup-screen wide-screen">
                <div class="mockup-toolbar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="mockup-candles">
                  <div class="mockup-candle-line"></div>
                </div>
                <div class="mockup-tickers">
                  <span>EURUSD</span>
                  <span>XAUUSD</span>
                  <span>US30</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div class="advantage-grid">
          <article v-for="item in advantages" :key="item.title" class="advantage-card">
            <div class="advantage-icon" :class="item.icon"></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </section>

      <section id="download" class="section container section-spacing">
        <div class="section-heading">
          <div>
            <h2>下載 Magic Compass</h2>
            <p>保留平台下載入口，但以更一致的卡片語言重新整理。</p>
          </div>
        </div>

        <div class="download-grid">
          <article v-for="item in downloadItems" :key="item.title" class="download-card">
            <div class="download-top">
              <div class="download-branding">
                <div class="download-icon" :class="item.icon"></div>
                <div class="download-headline">
                  <span class="download-kicker">{{ item.kicker }}</span>
                  <h3>{{ item.title }}</h3>
                </div>
              </div>
              <span class="download-system">{{ item.system }}</span>
            </div>
            <p class="download-desc">{{ item.subtitle }}</p>
            <button type="button" class="secondary-button small">{{ item.cta }}</button>
          </article>
        </div>
      </section>

      <section id="quotes" class="section container section-spacing">
        <div class="section-heading">
          <div>
            <h2>全球實時行情</h2>
            <p>簡版即時報價表保留專業感，但不把首頁做成過重工具頁。</p>
          </div>
          <a href="#footer">查看更多</a>
        </div>

        <div class="quote-table-shell desktop-only">
          <table class="quote-table">
            <thead>
              <tr>
                <th>產品</th>
                <th>買入價</th>
                <th>賣出價</th>
                <th>漲跌</th>
                <th>漲跌幅</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in quoteRows" :key="row.name">
                <td>{{ row.name }}</td>
                <td><span class="price-pill down">{{ row.bid }}</span></td>
                <td><span class="price-pill up">{{ row.ask }}</span></td>
                <td :class="row.changeClass">{{ row.change }}</td>
                <td :class="row.changeClass">{{ row.ratio }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="quote-mobile-list mobile-only">
          <article v-for="row in quoteRows" :key="`mobile-${row.name}`" class="quote-mobile-card">
            <div class="quote-mobile-head">
              <div class="quote-mobile-symbol">
                <strong>{{ row.name }}</strong>
                <small>即時報價</small>
              </div>
              <span :class="['quote-mobile-badge', row.changeClass]">{{ row.ratio }}</span>
            </div>
            <div class="quote-mobile-prices">
              <div class="quote-mobile-price">
                <small>買入價</small>
                <strong class="down">{{ row.bid }}</strong>
              </div>
              <div class="quote-mobile-price">
                <small>賣出價</small>
                <strong class="up">{{ row.ask }}</strong>
              </div>
            </div>
            <div class="quote-mobile-move">
              <span>日內變動</span>
              <strong :class="row.changeClass">{{ row.change }}</strong>
            </div>
          </article>
        </div>
      </section>

      <section id="video" class="section container video-flow section-spacing">
        <article class="video-card">
          <div class="section-heading compact">
            <div>
              <h2>品牌視頻</h2>
            </div>
          </div>
          <div class="video-frame">
            <div class="video-grid"></div>
            <div class="video-globe"></div>
            <div class="video-overlay">
              <span class="video-brand">MAGIC COMPASS</span>
              <strong>全球金融市場的領航者</strong>
            </div>
            <div class="video-timeline">
              <span></span>
              <small>00:38</small>
            </div>
            <button class="play-button" type="button" aria-label="Play video"></button>
          </div>
        </article>

        <article class="flow-card">
          <div class="flow-card-head">
            <span class="eyebrow light">ACCOUNT FLOW</span>
            <h2>便捷開戶，一鍵買賣</h2>
            <p>把操作流程整理成更像品牌官網區塊的節奏，不做後台表單感。</p>
          </div>
          <ol class="flow-list">
            <li v-for="item in flowSteps" :key="item.step">
              <span>{{ item.step }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.body }}</p>
            </li>
          </ol>
          <a class="primary-button full-width" href="#bottom-cta">立即開戶</a>
        </article>
      </section>

      <section id="trust" class="section container section-spacing">
        <div class="section-heading">
          <div>
            <h2>值得信賴的全球交易伙伴</h2>
            <p>以圖示與短句呈現核心信任訊號，保持正式而精煉。</p>
          </div>
        </div>

        <div class="trust-grid">
          <article v-for="item in trustItems" :key="item.title" class="trust-card">
            <div class="trust-top">
              <div class="trust-icon"></div>
              <span class="trust-kicker">{{ item.kicker }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </section>

      <section id="bottom-cta" class="bottom-cta section-spacing">
        <div class="container bottom-cta-inner">
          <div>
            <span class="eyebrow">READY TO START</span>
            <h2>準備好開始交易了嗎？</h2>
            <p>加入 Magic Compass，開啟您的全球交易之旅。</p>
          </div>
          <div class="bottom-cta-actions">
            <a class="primary-button" href="#hero">立即開戶</a>
            <a class="ghost-button hero-secondary" href="#platform">了解更多</a>
          </div>
        </div>
      </section>
    </main>

    <footer id="footer" class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
          <a class="brand footer-brand-link" href="#hero">
            <span class="brand-mark">
              <span class="brand-ring"></span>
              <span class="brand-swoosh"></span>
            </span>
            <span class="brand-text">
              <strong>MAGIC COMPASS</strong>
              <small>GSCCE 209/110</small>
            </span>
          </a>
          <p>受監管 CFD 平台首頁靜態原型與前端實作。</p>
        </div>

        <div v-for="section in footerColumns" :key="section.title" class="footer-links">
          <h3>{{ section.title }}</h3>
          <a v-for="link in section.links" :key="link" href="#footer">{{ link }}</a>
        </div>

        <form class="footer-subscribe">
          <h3>訂閱市場快訊</h3>
          <p>接收市場分析與平台更新。</p>
          <div class="footer-subscribe-row">
            <label>
              <span class="sr-only">Email</span>
              <input type="email" placeholder="輸入您的電子郵箱" />
            </label>
            <button class="primary-button" type="submit">訂閱</button>
          </div>
        </form>
      </div>

      <div class="container footer-risk">
        <strong>風險提示</strong>
        <p>
          差價合約屬高風險產品，槓桿交易可能導致快速虧損。請在充分理解風險並確認產品適合自身後再進行交易。
        </p>
      </div>

      <div class="container footer-bottom">
        <p>© 2025 Magic Compass Global Capital Ltd. 版權所有，保留所有權利。</p>
        <div class="footer-meta">
          <a href="#footer">隱私政策</a>
          <a href="#footer">風險披露</a>
          <a href="#footer">條款與條件</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-shell {
  overflow: clip;
  min-height: 100vh;
}

.container {
  width: var(--container);
  margin: 0 auto;
}

.section-spacing {
  margin-top: 34px;
}

.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.62rem, 1.18rem + 1vw, 2rem);
  line-height: 1.15;
}

.section-heading p {
  margin: 8px 0 0;
  max-width: 620px;
  color: var(--text-soft);
  font-size: 0.95rem;
}

.section-heading a {
  color: var(--blue);
  font-weight: 700;
  white-space: nowrap;
}

.section-heading.compact {
  margin-bottom: 18px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 0.72);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.eyebrow.light {
  color: var(--blue);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(18px);
  background: linear-gradient(180deg, rgba(3, 13, 34, 0.96), rgba(3, 13, 34, 0.84));
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  min-height: 82px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #fff;
}

.brand-mark {
  position: relative;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
}

.brand-ring,
.brand-swoosh {
  position: absolute;
  inset: 0;
  border-radius: 999px;
}

.brand-ring {
  border: 3px solid rgba(255, 255, 255, 0.92);
  transform: rotate(18deg);
}

.brand-swoosh {
  inset: 9px 3px 9px 12px;
  border-radius: 0 22px 22px 0;
  background: linear-gradient(135deg, #f4bc52, #bf7f19);
  transform: skewX(-26deg);
}

.brand-text {
  display: grid;
}

.brand-text strong {
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
}

.brand-text small {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.72rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: auto;
}

.desktop-nav a {
  position: relative;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 180ms ease;
}

.desktop-nav a:hover,
.desktop-nav a.is-active {
  color: #fff;
}

.desktop-nav a.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -28px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--gold), #f2c36a);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lang-button,
.ghost-button,
.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 12px;
  border: 0;
  font-weight: 700;
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}

.lang-button {
  min-height: 42px;
  padding: 0 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.84);
}

.ghost-button {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.03);
}

.ghost-button.subtle {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.015);
}

.primary-button {
  color: #fff;
  background: linear-gradient(180deg, #efb454, var(--gold-deep));
  box-shadow: 0 14px 28px rgba(184, 132, 39, 0.26);
}

.secondary-button {
  color: var(--blue);
  border: 1px solid rgba(44, 99, 211, 0.18);
  background: rgba(44, 99, 211, 0.08);
}

.secondary-button.small {
  min-height: 40px;
  padding: 0 16px;
}

.ghost-button:hover,
.primary-button:hover,
.secondary-button:hover,
.lang-button:hover {
  transform: translateY(-1px);
}

.header-button {
  min-height: 44px;
  padding: 0 20px;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 10px;
  border: 0;
  background: transparent;
}

.menu-toggle span {
  display: block;
  height: 2px;
  margin: 5px 0;
  border-radius: 999px;
  background: #fff;
  transition: transform 180ms ease, opacity 180ms ease;
}

.menu-toggle.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(3, 13, 34, 0.98);
}

.mobile-menu-panel {
  display: grid;
  gap: 10px;
  width: var(--container);
  margin: 0 auto;
  padding: 18px 0 24px;
}

.mobile-menu-panel a {
  color: rgba(255, 255, 255, 0.86);
  padding: 8px 0;
  font-weight: 600;
}

.mobile-menu-actions {
  display: grid;
  gap: 12px;
  margin-top: 10px;
}

.hero-section {
  position: relative;
  isolation: isolate;
  padding: 30px 0 118px;
  background:
    radial-gradient(circle at 72% 24%, rgba(72, 141, 255, 0.28), transparent 22%),
    radial-gradient(circle at 86% 24%, rgba(46, 104, 209, 0.16), transparent 14%),
    linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%);
  color: #fff;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent);
}

.hero-orbit {
  position: absolute;
  top: 44px;
  right: -120px;
  width: min(58vw, 760px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(84, 150, 255, 0.16);
  box-shadow:
    inset 0 0 50px rgba(37, 109, 222, 0.18),
    0 0 140px rgba(54, 123, 238, 0.12);
}

.hero-orbit::before,
.hero-orbit::after {
  content: "";
  position: absolute;
  border-radius: inherit;
}

.hero-orbit::before {
  inset: 8%;
  border: 1px solid rgba(87, 169, 255, 0.12);
}

.hero-orbit::after {
  inset: 15%;
  background:
    radial-gradient(circle at 32% 24%, rgba(112, 178, 255, 0.76), transparent 10%),
    radial-gradient(circle at 74% 30%, rgba(67, 129, 237, 0.2), transparent 42%);
}

.hero-bars {
  position: absolute;
  right: 4%;
  top: 82px;
  display: flex;
  align-items: end;
  gap: 10px;
  opacity: 0.48;
}

.hero-bars span {
  width: 14px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, rgba(98, 170, 255, 0.82), rgba(23, 74, 159, 0.18));
}

.hero-bars span:nth-child(1) {
  height: 72px;
}

.hero-bars span:nth-child(2) {
  height: 98px;
}

.hero-bars span:nth-child(3) {
  height: 76px;
}

.hero-bars span:nth-child(4) {
  height: 122px;
}

.hero-bars span:nth-child(5) {
  height: 92px;
}

.hero-bars span:nth-child(6) {
  height: 136px;
}

.hero-bars span:nth-child(7) {
  height: 108px;
}

.hero-map {
  position: absolute;
  top: 122px;
  left: 44%;
  width: 360px;
  height: 172px;
  background:
    radial-gradient(circle, rgba(98, 170, 255, 0.34) 0 1px, transparent 2px) 0 0 / 10px 10px;
  opacity: 0.22;
  transform: translateX(-30%);
}

.hero-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.06fr);
  align-items: center;
  gap: 46px;
}

.hero-copy h1 {
  margin: 0 0 18px;
  max-width: 520px;
  font-size: clamp(3.1rem, 2rem + 2.2vw, 4.6rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.038em;
}

.hero-copy p {
  margin: 0;
  max-width: 498px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.62;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 26px;
}

.hero-primary {
  min-width: 144px;
  box-shadow: 0 18px 36px rgba(185, 132, 39, 0.26);
}

.hero-secondary {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.18);
}

.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  padding: 0;
  margin: 18px 0 0;
  list-style: none;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 600;
}

.hero-points li {
  position: relative;
  padding-left: 14px;
}

.hero-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.58em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffd37d, #d59729);
  box-shadow: 0 0 12px rgba(217, 164, 65, 0.34);
}

.hero-visual {
  display: flex;
  justify-content: end;
}

.device-cluster {
  position: relative;
  width: min(100%, 720px);
  min-height: 452px;
}

.visual-glow {
  position: absolute;
  right: 14%;
  top: 16%;
  width: 56%;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(92, 156, 255, 0.3) 0%, rgba(13, 46, 104, 0) 64%);
  opacity: 0.68;
  filter: blur(8px);
}

.terminal-shell,
.phone-shell {
  position: absolute;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02)),
    #061327;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 42px 90px rgba(0, 0, 0, 0.34);
}

.terminal-shell {
  right: 0;
  top: 18px;
  width: min(84%, 568px);
  padding: 16px 16px 12px;
}

.phone-shell {
  left: 11%;
  bottom: 18px;
  width: 122px;
  padding: 10px;
  z-index: 2;
}

.terminal-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.terminal-window-controls {
  display: inline-flex;
  gap: 8px;
}

.terminal-window-controls span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
}

.terminal-nav {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.terminal-nav span {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.terminal-nav span.is-active {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
}

.terminal-brand {
  color: rgba(255, 255, 255, 0.54);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.terminal-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 164px;
  gap: 14px;
}

.terminal-main,
.terminal-side,
.phone-screen,
.mockup-screen {
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(12, 25, 52, 0.98), rgba(5, 17, 38, 0.94)),
    #081a35;
  border: 1px solid rgba(93, 134, 199, 0.16);
}

.terminal-main {
  padding: 13px;
}

.terminal-chart-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.terminal-chart-head small {
  display: block;
  color: rgba(255, 255, 255, 0.54);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.terminal-chart-head strong {
  display: block;
  margin-top: 8px;
  color: #ffffff;
  font-size: 1.42rem;
  letter-spacing: 0.01em;
}

.terminal-chart-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.terminal-chart-meta span {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.72rem;
  font-weight: 700;
}

.terminal-chart {
  position: relative;
  overflow: hidden;
  height: 214px;
  margin-top: 10px;
  border-radius: 18px;
  border: 1px solid rgba(104, 149, 228, 0.18);
  background: linear-gradient(180deg, rgba(12, 32, 71, 0.98), rgba(6, 18, 40, 0.98));
}

.terminal-chart::before {
  content: "";
  position: absolute;
  inset: 16px 18px 28px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px) 0 0 / 56px 100%;
  opacity: 0.68;
}

.terminal-chart::after {
  content: "";
  position: absolute;
  inset: 16px 18px auto auto;
  width: 112px;
  height: 56px;
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

.terminal-chart-callout {
  position: absolute;
  top: 18px;
  right: 22px;
  z-index: 2;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(7, 19, 43, 0.74);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.terminal-chart-callout small {
  display: block;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.terminal-chart-callout strong {
  display: block;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.72rem;
}

.terminal-crosshair {
  position: absolute;
  left: 57%;
  top: 16px;
  bottom: 42px;
  z-index: 1;
  width: 1px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03));
}

.terminal-crosshair::after {
  content: "";
  position: absolute;
  left: -118px;
  right: -82px;
  top: 44%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.terminal-axis {
  position: absolute;
  right: 12px;
  top: 16px;
  bottom: 42px;
  z-index: 1;
  display: grid;
  align-content: space-between;
  justify-items: end;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.terminal-grid {
  position: absolute;
  inset: 16px 16px 34px;
  display: grid;
  gap: 16px;
}

.terminal-grid span {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.terminal-bars {
  position: absolute;
  inset: 36px 14px 40px auto;
  display: flex;
  align-items: end;
  gap: 7px;
  opacity: 0.34;
}

.terminal-bars span {
  width: 8px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, rgba(80, 156, 255, 0.9), rgba(22, 70, 150, 0.16));
}

.terminal-bars span:nth-child(1) {
  height: 58px;
}

.terminal-bars span:nth-child(2) {
  height: 78px;
}

.terminal-bars span:nth-child(3) {
  height: 54px;
}

.terminal-bars span:nth-child(4) {
  height: 88px;
}

.terminal-bars span:nth-child(5) {
  height: 70px;
}

.terminal-bars span:nth-child(6) {
  height: 96px;
}

.terminal-bars span:nth-child(7) {
  height: 64px;
}

.terminal-bars span:nth-child(8) {
  height: 80px;
}

.terminal-bars span:nth-child(9) {
  height: 72px;
}

.terminal-chart svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.terminal-chart polyline {
  fill: none;
  stroke: #28d591;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 8px rgba(40, 213, 145, 0.18));
}

.terminal-xaxis {
  position: absolute;
  left: 16px;
  right: 92px;
  bottom: 42px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.36);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.terminal-statusbar {
  position: absolute;
  left: 12px;
  right: 14px;
  bottom: 10px;
  z-index: 1;
  display: flex;
  gap: 6px;
}

.status-chip {
  min-width: 82px;
  padding: 7px 10px;
  border-radius: 10px;
  background: rgba(3, 13, 34, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.status-chip small {
  display: block;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.status-chip strong {
  display: block;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.76rem;
}

.terminal-panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.terminal-panel {
  min-height: 50px;
  padding: 9px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.terminal-panel small {
  display: block;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.terminal-panel strong {
  display: block;
  margin-top: 7px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.88rem;
}

.terminal-side {
  padding: 12px 11px;
}

.side-title {
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.side-head {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  margin: 10px 0 2px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.side-head span {
  color: rgba(255, 255, 255, 0.36);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.side-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 6px;
  align-items: center;
  min-height: 36px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.side-row:last-of-type {
  border-bottom: 0;
}

.side-pair {
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.side-price {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.64rem;
  font-weight: 700;
}

.side-delta {
  min-width: 46px;
  text-align: right;
  font-size: 0.66rem;
  font-weight: 700;
}

.side-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 14px;
}

.side-actions button {
  height: 38px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  font-weight: 700;
}

.sell-button {
  background: linear-gradient(180deg, #e66761, #bc3f3a);
}

.buy-button {
  background: linear-gradient(180deg, #32cb8e, #1f9e69);
}

.terminal-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.footer-chip {
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.footer-chip small {
  display: block;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.footer-chip strong {
  display: block;
  margin-top: 6px;
  font-size: 1rem;
}

.phone-screen {
  min-height: 238px;
  padding: 10px;
}

.phone-notch {
  width: 40px;
  height: 8px;
  margin: 0 auto 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}

.phone-strip {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.phone-strip span {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.phone-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.phone-head strong {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.phone-chart {
  position: relative;
  height: 164px;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(15, 40, 87, 0.95), rgba(8, 24, 52, 0.96));
}

.phone-callout {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  padding: 6px 8px;
  border-radius: 10px;
  background: rgba(5, 17, 38, 0.74);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.phone-callout small {
  display: block;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.48rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.phone-callout strong {
  display: block;
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.58rem;
}

.phone-chart::before {
  content: "";
  position: absolute;
  inset: 16px;
  background:
    linear-gradient(transparent 94%, rgba(255, 255, 255, 0.06) 94%),
    linear-gradient(90deg, transparent 94%, rgba(255, 255, 255, 0.06) 94%);
  background-size: 100% 18px, 24px 100%;
}

.phone-chart svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.phone-chart polyline {
  fill: none;
  stroke: #28d591;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 8px rgba(40, 213, 145, 0.18));
}

.phone-rows {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.phone-row-card {
  padding: 9px 7px 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.phone-row-card small {
  display: block;
  color: rgba(255, 255, 255, 0.44);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.phone-row-card strong {
  display: block;
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.66rem;
}

.phone-row-card strong.up {
  color: #28d591;
}

.phone-row-card strong.down {
  color: #ef6e64;
}

.stats-strip {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: -52px;
  padding: 8px 16px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 20px 44px rgba(7, 22, 50, 0.1);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 96px;
  padding: 8px 18px;
}

.stat-item + .stat-item {
  border-left: 1px solid rgba(15, 23, 42, 0.08);
}

.stat-copy span {
  display: block;
  color: var(--text-soft);
  font-size: 0.84rem;
}

.stat-copy strong {
  display: block;
  margin-top: 4px;
  font-size: clamp(1.65rem, 1.1rem + 1vw, 2.2rem);
  line-height: 1.06;
}

.stat-icon,
.advantage-icon,
.download-icon,
.trust-icon {
  position: relative;
  flex: 0 0 auto;
}

.stat-icon {
  width: 34px;
  height: 34px;
  color: var(--blue);
  opacity: 0.92;
}

.stat-icon::before,
.stat-icon::after,
.advantage-icon::before,
.advantage-icon::after,
.download-icon::before,
.download-icon::after,
.trust-icon::before,
.trust-icon::after {
  content: "";
  position: absolute;
}

.stat-icon.cube::before {
  inset: 5px;
  border: 1.8px solid currentColor;
  transform: rotate(45deg);
  border-radius: 7px;
}

.stat-icon.leverage::before {
  left: 9px;
  right: 9px;
  top: 16px;
  height: 1.5px;
  background: currentColor;
}

.stat-icon.leverage::after {
  inset: 6px 10px;
  border-left: 1.8px solid currentColor;
  border-right: 1.8px solid currentColor;
}

.stat-icon.spread::before {
  inset: 6px;
  border: 1.8px solid currentColor;
  border-radius: 50%;
}

.stat-icon.spread::after {
  left: 16px;
  top: 9px;
  width: 1.8px;
  height: 10px;
  background: currentColor;
  box-shadow: 3px 6px 0 0 currentColor;
  transform-origin: bottom;
  transform: rotate(45deg);
}

.stat-icon.lot::before,
.stat-icon.lot::after {
  left: 8px;
  right: 8px;
  height: 7px;
  border: 1.8px solid currentColor;
  border-radius: 999px;
}

.stat-icon.lot::before {
  top: 7px;
}

.stat-icon.lot::after {
  top: 19px;
}

.market-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}

.market-tabs button {
  min-height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(44, 99, 211, 0.08);
  background: rgba(244, 248, 255, 0.88);
  color: rgba(42, 56, 78, 0.74);
  font-weight: 700;
}

.market-tabs button.is-active {
  border-color: rgba(44, 99, 211, 0.14);
  background: linear-gradient(180deg, #346bdd, #214ca8);
  box-shadow:
    0 12px 24px rgba(44, 99, 211, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  color: #fff;
}

.market-grid-shell {
  overflow: hidden;
}

.market-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
}

.market-card,
.advantage-card,
.download-card,
.quote-table-shell,
.video-card,
.flow-card,
.trust-card {
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-md);
}

.market-card {
  padding: 16px 16px 12px;
}

.market-card-head {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 12px;
  margin-bottom: 6px;
}

.market-copy small {
  display: block;
  color: var(--text-soft);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  opacity: 0.72;
}

.market-card strong {
  display: block;
  margin-top: 2px;
  font-size: 0.96rem;
}

.market-price {
  display: block;
  margin-top: 8px;
  color: var(--text);
  font-size: 1.24rem;
  font-weight: 700;
}

.market-change {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(44, 99, 211, 0.08);
  background: rgba(44, 99, 211, 0.06);
  font-size: 0.78rem;
  font-weight: 700;
}

.market-change.positive {
  background: rgba(40, 213, 145, 0.08);
  border-color: rgba(40, 213, 145, 0.12);
}

.market-change.negative {
  background: rgba(239, 110, 100, 0.08);
  border-color: rgba(239, 110, 100, 0.12);
}

.positive {
  color: var(--green);
}

.negative {
  color: var(--red);
}

.sparkline {
  height: 46px;
  opacity: 0.72;
}

.sparkline polyline {
  fill: none;
  stroke-width: 2.4;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.sparkline.positive polyline {
  stroke: #6ac88f;
}

.sparkline.negative polyline {
  stroke: #ed746a;
}

.platform-slice {
  display: grid;
  grid-template-columns: 1.56fr 1fr;
  gap: 20px;
  margin-top: 22px;
}

.glass-panel {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(238, 245, 255, 0.98), rgba(248, 251, 255, 0.94));
  border: 1px solid rgba(44, 99, 211, 0.08);
  box-shadow: var(--shadow-md);
}

.platform-overview {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
  gap: 18px;
  padding: 30px;
}

.platform-overview::after {
  content: "";
  position: absolute;
  inset: auto -60px -90px auto;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(44, 99, 211, 0.12), transparent 70%);
}

.platform-copy p {
  color: var(--text-soft);
}

.platform-points {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 18px 0 22px;
  list-style: none;
  color: var(--text);
  font-weight: 600;
}

.platform-points li {
  position: relative;
  padding-left: 18px;
}

.platform-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--blue);
}

.platform-mockup {
  position: relative;
  min-height: 280px;
}

.mockup-device {
  position: absolute;
  border-radius: 24px;
  background: linear-gradient(180deg, #0c1f44, #08122a);
  box-shadow: 0 24px 50px rgba(7, 22, 50, 0.22);
}

.mockup-device.mini {
  left: 4%;
  bottom: 16px;
  width: 126px;
  padding: 10px;
  z-index: 3;
}

.mockup-device.wide {
  right: 0;
  bottom: 0;
  width: 82%;
  padding: 16px;
}

.mockup-screen {
  min-height: 156px;
  padding: 12px;
  border-radius: 18px;
  background: linear-gradient(180deg, #0f2755, #07152f);
}

.wide-screen {
  min-height: 216px;
}

.mockup-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.mockup-status .is-live {
  color: #28d591;
}

.mockup-line {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.mockup-line.short {
  width: 58%;
  margin-top: 10px;
}

.mockup-chart {
  position: relative;
  overflow: hidden;
  height: 116px;
  margin-top: 14px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(15, 40, 87, 0.95), rgba(8, 24, 52, 0.96));
}

.mockup-chart::before {
  content: "";
  position: absolute;
  inset: 16px 12px 18px;
  background:
    linear-gradient(transparent 94%, rgba(255, 255, 255, 0.06) 94%),
    linear-gradient(90deg, transparent 94%, rgba(255, 255, 255, 0.06) 94%);
  background-size: 100% 20px, 24px 100%;
}

.mockup-chart-pill {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 1;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(6, 18, 40, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.mockup-chart-pill small {
  display: block;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.mockup-chart-pill strong {
  display: block;
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.7rem;
}

.mockup-toolbar {
  display: flex;
  gap: 8px;
}

.mockup-toolbar span {
  height: 10px;
  flex: 1;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.mockup-candles {
  position: relative;
  height: 154px;
  margin-top: 14px;
  border-radius: 16px;
  background:
    linear-gradient(transparent 94%, rgba(255, 255, 255, 0.05) 94%),
    linear-gradient(90deg, transparent 94%, rgba(255, 255, 255, 0.05) 94%),
    linear-gradient(180deg, rgba(17, 47, 103, 0.94), rgba(7, 21, 47, 0.94));
  background-size: 100% 24px, 26px 100%, auto;
}

.mockup-candle-line {
  position: absolute;
  inset: 20px 16px 28px;
  border-radius: 12px;
  background:
    linear-gradient(transparent calc(100% - 2px), rgba(255, 255, 255, 0.06) 0),
    linear-gradient(90deg, transparent calc(100% - 2px), rgba(255, 255, 255, 0.06) 0);
  background-size: 100% 26px, 28px 100%;
}

.mockup-candle-line::after {
  content: "";
  position: absolute;
  inset: 20% 8% 18% 8%;
  background:
    linear-gradient(145deg, transparent 0 8%, rgba(40, 213, 145, 0.78) 8% 10%, transparent 10% 18%, rgba(40, 213, 145, 0.78) 18% 20%, transparent 20% 28%, rgba(40, 213, 145, 0.78) 28% 30%, transparent 30% 38%, rgba(40, 213, 145, 0.78) 38% 40%, transparent 40% 48%, rgba(40, 213, 145, 0.78) 48% 50%, transparent 50% 58%, rgba(40, 213, 145, 0.78) 58% 60%, transparent 60% 68%, rgba(40, 213, 145, 0.78) 68% 70%, transparent 70%);
  filter: drop-shadow(0 0 8px rgba(40, 213, 145, 0.16));
  clip-path: polygon(0 76%, 10% 60%, 18% 64%, 28% 46%, 36% 54%, 46% 34%, 56% 42%, 68% 22%, 78% 30%, 88% 14%, 100% 22%, 100% 100%, 0 100%);
}

.mockup-tickers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 14px;
}

.mockup-tickers span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.advantage-card {
  padding: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(251, 253, 255, 0.94));
}

.advantage-card h3,
.download-card h3,
.trust-card h3 {
  margin: 14px 0 8px;
  font-size: 1.05rem;
}

.advantage-card p,
.download-card p,
.flow-card p,
.trust-card p,
.footer-brand p,
.footer-subscribe p {
  margin: 0;
  color: var(--text-soft);
}

.advantage-icon,
.trust-icon {
  width: 48px;
  height: 48px;
  color: var(--blue);
}

.advantage-icon.shield::before {
  inset: 4px 10px 8px;
  border: 2px solid currentColor;
  border-radius: 18px 18px 20px 20px / 12px 12px 28px 28px;
}

.advantage-icon.bolt::before {
  top: 6px;
  left: 18px;
  width: 12px;
  height: 34px;
  background: currentColor;
  clip-path: polygon(44% 0, 100% 0, 62% 44%, 100% 44%, 0 100%, 36% 56%, 0 56%);
}

.advantage-icon.stack::before,
.advantage-icon.stack::after {
  inset: 10px;
  border: 2px solid currentColor;
  border-radius: 8px;
}

.advantage-icon.stack::after {
  transform: translate(6px, -6px);
  opacity: 0.5;
}

.advantage-icon.support::before {
  inset: 10px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
}

.advantage-icon.support::after {
  left: 10px;
  right: 10px;
  bottom: 8px;
  height: 10px;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-top: 0;
}

.download-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.download-card {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 20px;
}

.download-top {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.download-branding {
  display: flex;
  align-items: center;
  gap: 12px;
}

.download-headline {
  display: grid;
  gap: 4px;
}

.download-kicker {
  color: rgba(44, 99, 211, 0.7);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.download-system {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(44, 99, 211, 0.08);
  color: var(--blue);
  font-size: 0.78rem;
  font-weight: 700;
}

.download-headline h3 {
  margin: 0;
}

.download-desc {
  margin: 0;
  color: var(--text-soft);
}

.download-card .secondary-button.small {
  min-width: 126px;
}

.download-icon {
  width: 48px;
  height: 48px;
}

.download-icon.android::before,
.download-icon.android::after,
.download-icon.ios::before,
.download-icon.mt4::before,
.download-icon.mt4::after {
  background: currentColor;
}

.download-icon.android {
  color: #62b84f;
}

.download-icon.android::before {
  inset: 16px 10px 8px;
  border-radius: 8px 8px 10px 10px;
}

.download-icon.android::after {
  left: 14px;
  right: 14px;
  top: 8px;
  height: 10px;
  border-radius: 10px 10px 0 0;
}

.download-icon.ios {
  color: #171717;
}

.download-icon.ios::before {
  inset: 7px 12px 10px;
  border-radius: 22px 22px 18px 18px / 24px 24px 16px 16px;
  clip-path: polygon(46% 0, 68% 12%, 62% 24%, 80% 46%, 68% 78%, 48% 100%, 26% 90%, 16% 60%, 26% 28%);
}

.download-icon.mt4 {
  color: #f0a53b;
}

.download-icon.mt4::before,
.download-icon.mt4::after {
  border-radius: 50%;
}

.download-icon.mt4::before {
  inset: 8px auto auto 4px;
  width: 20px;
  height: 20px;
  background: #4ab257;
  box-shadow: 16px 10px 0 0 #3f7bd8;
}

.download-icon.mt4::after {
  right: 2px;
  bottom: 4px;
  width: 22px;
  height: 22px;
  background: currentColor;
}

.quote-table-shell {
  overflow: auto hidden;
  padding: 8px;
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.quote-table th,
.quote-table td {
  padding: 14px 18px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  text-align: left;
}

.quote-table th {
  color: var(--text-soft);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.quote-table tbody tr:last-child td {
  border-bottom: 0;
}

.price-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  padding: 6px 12px;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
}

.price-pill.up {
  background: #1f9e89;
}

.price-pill.down {
  background: #de5752;
}

.up {
  color: var(--green);
}

.down {
  color: var(--red);
}

.quote-mobile-list {
  display: none;
  gap: 12px;
}

.quote-mobile-card {
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-md);
}

.quote-mobile-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.quote-mobile-symbol small {
  display: block;
  margin-top: 3px;
  color: var(--text-soft);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.quote-mobile-head strong {
  font-size: 1.12rem;
}

.quote-mobile-badge {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(44, 99, 211, 0.08);
  font-size: 0.76rem;
  font-weight: 700;
}

.quote-mobile-badge.up {
  background: rgba(40, 213, 145, 0.1);
}

.quote-mobile-badge.down {
  background: rgba(239, 110, 100, 0.1);
}

.quote-mobile-prices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 14px;
}

.quote-mobile-price {
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(244, 248, 255, 0.98), rgba(236, 243, 255, 0.94));
  border: 1px solid rgba(44, 99, 211, 0.08);
}

.quote-mobile-price small {
  display: block;
  color: var(--text-soft);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
}

.quote-mobile-price strong {
  display: block;
  margin-top: 7px;
  font-size: 1.04rem;
  line-height: 1.05;
}

.quote-mobile-move {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.quote-mobile-move span {
  color: var(--text-soft);
  font-size: 0.74rem;
  font-weight: 700;
}

.quote-mobile-move strong {
  font-size: 0.92rem;
}

.video-flow {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 20px;
}

.video-card,
.flow-card {
  padding: 22px;
}

.video-frame {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  border-radius: 20px;
  background:
    radial-gradient(circle at 72% 28%, rgba(67, 120, 220, 0.34), transparent 26%),
    radial-gradient(circle at 56% 38%, rgba(255, 255, 255, 0.06), transparent 34%),
    linear-gradient(180deg, #0a1732, #050d1f);
}

.video-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent);
}

.video-globe {
  position: absolute;
  right: -20px;
  bottom: -68px;
  width: 360px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 28%, rgba(169, 201, 255, 0.9), transparent 11%),
    radial-gradient(circle at 36% 30%, rgba(80, 144, 255, 0.16), transparent 38%),
    linear-gradient(180deg, rgba(79, 134, 220, 0.18), rgba(255, 255, 255, 0.03));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 60px rgba(96, 152, 255, 0.16);
}

.video-globe::before {
  content: "";
  position: absolute;
  inset: 6%;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-overlay {
  position: absolute;
  left: 32px;
  right: 32px;
  bottom: 94px;
  z-index: 1;
  color: #fff;
}

.video-brand {
  display: block;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.66);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
}

.video-overlay strong {
  font-size: clamp(1.7rem, 1.26rem + 0.8vw, 2.35rem);
  line-height: 1.18;
}

.video-timeline {
  position: absolute;
  left: 32px;
  right: 32px;
  bottom: 26px;
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 1;
}

.video-timeline span {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.86) 0%, rgba(255, 255, 255, 0.4) 42%, rgba(255, 255, 255, 0.12) 100%);
}

.video-timeline small {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.82rem;
  font-weight: 700;
}

.play-button {
  position: absolute;
  left: 32px;
  bottom: 54px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 1;
}

.play-button::before {
  content: "";
  position: absolute;
  left: 23px;
  top: 18px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 16px solid #fff;
}

.flow-card {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 241, 0.96));
}

.flow-card-head p {
  margin-top: 6px;
}

.flow-card-head h2 {
  margin: 0;
  font-size: clamp(1.7rem, 1.25rem + 0.8vw, 2.2rem);
}

.flow-list {
  display: grid;
  gap: 18px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
}

.flow-list li {
  position: relative;
  padding-left: 72px;
}

.flow-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(217, 164, 65, 0.3);
  background:
    linear-gradient(180deg, rgba(255, 244, 220, 0.98), rgba(247, 232, 197, 0.96));
  box-shadow:
    inset 0 0 0 8px rgba(255, 255, 255, 0.86),
    0 12px 24px rgba(217, 164, 65, 0.12);
}

.flow-list li span {
  display: block;
  color: var(--gold-deep);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.flow-list li strong {
  display: block;
  margin-top: 6px;
  font-size: 1.24rem;
}

.flow-list li p {
  margin-top: 6px;
}

.full-width {
  width: 100%;
  margin-top: 24px;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.trust-card {
  position: relative;
  overflow: hidden;
  padding: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(250, 252, 255, 0.96));
  border-top: 0;
}

.trust-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 3px;
  background: linear-gradient(90deg, rgba(44, 99, 211, 0.26), rgba(217, 164, 65, 0.34));
}

.trust-top {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.trust-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(44, 99, 211, 0.08);
}

.trust-icon::before {
  inset: 11px;
  border: 2px solid var(--blue);
  border-radius: 10px;
}

.trust-kicker {
  color: rgba(44, 99, 211, 0.7);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.bottom-cta {
  position: relative;
  padding: 24px 0 0;
}

.bottom-cta::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 100%;
  background:
    radial-gradient(circle at 92% 50%, rgba(255, 94, 94, 0.26), transparent 16%),
    radial-gradient(circle at 86% 46%, rgba(104, 156, 255, 0.2), transparent 18%),
    linear-gradient(180deg, #071632, #081a3b);
}

.bottom-cta-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 26px 0;
  color: #fff;
}

.bottom-cta-inner h2 {
  margin: 0;
  font-size: clamp(2rem, 1.5rem + 1vw, 2.8rem);
}

.bottom-cta-inner p {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.74);
}

.bottom-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.site-footer {
  background: linear-gradient(180deg, #071632, #041022);
  color: #fff;
  padding: 26px 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, 0.8fr) 1fr;
  gap: 18px;
}

.footer-brand-link {
  margin-bottom: 16px;
}

.footer-links,
.footer-subscribe {
  display: grid;
  align-content: start;
  gap: 6px;
}

.footer-links h3,
.footer-subscribe h3 {
  margin: 0 0 6px;
  font-size: 0.96rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9rem;
  line-height: 1.38;
}

.footer-subscribe-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
}

.footer-subscribe-row label {
  display: block;
}

.footer-subscribe input {
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}

.footer-subscribe .primary-button {
  min-width: 88px;
}

.footer-risk {
  display: grid;
  gap: 8px;
  margin-top: 22px;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
}

.footer-risk strong {
  font-size: 0.95rem;
}

.footer-risk p {
  margin: 0;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.92rem;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-bottom p,
.footer-meta a {
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.88rem;
}

.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1160px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: inline-block;
  }

  .header-button {
    display: none;
  }

  .hero-layout,
  .platform-slice,
  .video-flow,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .hero-layout {
    gap: 22px;
  }

  .hero-visual {
    justify-content: center;
  }

  .device-cluster {
    width: min(100%, 650px);
    min-height: 408px;
  }

  .terminal-shell {
    width: 88%;
  }

  .stats-strip,
  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .download-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  :root {
    --container: min(100vw - 28px, 100%);
  }

  .header-inner {
    min-height: 74px;
  }

  .brand-text strong {
    font-size: 1rem;
  }

  .lang-button {
    padding: 0 8px;
  }

  .hero-section {
    padding: 16px 0 78px;
  }

  .hero-map,
  .hero-bars {
    display: none;
  }

  .hero-orbit {
    top: 80px;
    right: -90px;
    width: 520px;
  }

  .hero-copy h1 {
    max-width: 480px;
    font-size: clamp(2.6rem, 1.85rem + 2.6vw, 3.5rem);
    line-height: 1.06;
  }

  .hero-copy p {
    font-size: 0.98rem;
  }

  .hero-points {
    gap: 12px 18px;
    font-size: 0.9rem;
  }

  .device-cluster {
    min-height: 330px;
  }

  .phone-shell {
    width: 96px;
    left: 6%;
  }

  .terminal-shell {
    width: 90%;
    top: 24px;
    padding: 14px;
  }

  .terminal-layout {
    grid-template-columns: minmax(0, 1fr) 138px;
  }

  .stats-strip {
    gap: 0;
    margin-top: -42px;
    padding: 10px 12px;
  }

  .stat-item {
    min-height: 82px;
    padding: 10px 14px;
  }

  .platform-overview {
    grid-template-columns: 1fr;
    padding: 22px;
  }

  .advantage-grid {
    grid-template-columns: 1fr 1fr;
  }

  .bottom-cta-inner,
  .footer-bottom,
  .section-heading {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: grid;
  }

  .quote-mobile-list {
    display: grid;
  }

  .brand {
    gap: 10px;
  }

  .brand-mark {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .brand-text strong {
    font-size: 0.94rem;
  }

  .brand-text small {
    font-size: 0.62rem;
  }

  .hero-section {
    padding-bottom: 48px;
  }

  .hero-layout {
    gap: 14px;
  }

  .hero-copy h1 {
    max-width: 304px;
    font-size: clamp(1.98rem, 1.7rem + 1.48vw, 2.5rem);
    line-height: 1.03;
  }

  .hero-copy p {
    max-width: 312px;
    font-size: 0.91rem;
    line-height: 1.58;
  }

  .hero-cta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 16px;
  }

  .primary-button,
  .ghost-button,
  .secondary-button {
    min-height: 44px;
    padding: 0 18px;
  }

  .hero-points {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 10px;
    margin-top: 12px;
    font-size: 0.78rem;
  }

  .device-cluster {
    min-height: 210px;
  }

  .phone-shell {
    left: 7%;
    bottom: 10px;
    width: 62px;
    padding: 6px;
  }

  .phone-screen {
    min-height: 154px;
    padding: 6px;
  }

  .phone-strip {
    margin-bottom: 5px;
  }

  .phone-strip span {
    min-height: 16px;
    padding: 0 5px;
    font-size: 0.42rem;
  }

  .phone-head {
    margin-bottom: 5px;
  }

  .phone-head strong {
    font-size: 0.6rem;
  }

  .phone-chart {
    height: 82px;
  }

  .phone-callout {
    top: 7px;
    right: 7px;
    padding: 4px 5px;
  }

  .phone-callout small {
    font-size: 0.4rem;
  }

  .phone-callout strong {
    font-size: 0.48rem;
  }

  .phone-rows {
    margin-top: 5px;
    gap: 4px;
  }

  .phone-row-card {
    padding: 6px 4px;
  }

  .phone-row-card small {
    font-size: 0.42rem;
  }

  .phone-row-card strong {
    font-size: 0.44rem;
  }

  .terminal-shell {
    top: 4px;
    width: 86%;
    padding: 7px;
  }

  .terminal-topbar {
    gap: 6px;
    margin-bottom: 6px;
  }

  .terminal-window-controls {
    gap: 4px;
  }

  .terminal-window-controls span {
    width: 6px;
    height: 6px;
  }

  .terminal-nav {
    gap: 4px;
  }

  .terminal-nav span {
    min-height: 18px;
    padding: 0 5px;
    font-size: 0.44rem;
  }

  .terminal-nav span:last-child {
    display: none;
  }

  .terminal-brand {
    font-size: 0.44rem;
  }

  .terminal-layout {
    grid-template-columns: minmax(0, 1fr) 92px;
    gap: 6px;
  }

  .terminal-main {
    padding: 7px;
  }

  .terminal-chart-head small {
    font-size: 0.54rem;
  }

  .terminal-chart-head strong {
    margin-top: 5px;
    font-size: 0.84rem;
  }

  .terminal-chart-meta {
    gap: 4px;
  }

  .terminal-chart-meta span {
    min-height: 20px;
    padding: 0 6px;
    font-size: 0.54rem;
  }

  .terminal-chart {
    height: 94px;
    margin-top: 8px;
  }

  .terminal-chart-callout {
    top: 8px;
    right: 8px;
    padding: 4px 6px;
  }

  .terminal-chart-callout small {
    font-size: 0.38rem;
  }

  .terminal-chart-callout strong {
    margin-top: 2px;
    font-size: 0.48rem;
  }

  .terminal-axis {
    right: 6px;
    top: 8px;
    bottom: 36px;
    font-size: 0.46rem;
  }

  .terminal-grid {
    inset: 8px 8px 30px;
    gap: 12px;
  }

  .terminal-bars {
    inset: 26px 8px 34px auto;
    gap: 4px;
  }

  .terminal-xaxis {
    left: 8px;
    right: 42px;
    bottom: 24px;
    font-size: 0.42rem;
  }

  .terminal-chart::after {
    inset: 8px 8px auto auto;
    width: 60px;
    height: 36px;
  }

  .terminal-statusbar {
    left: 8px;
    right: 8px;
    bottom: 6px;
    gap: 4px;
  }

  .status-chip {
    min-width: 44px;
    padding: 4px 5px;
    border-radius: 8px;
  }

  .status-chip small {
    font-size: 0.42rem;
  }

  .status-chip strong {
    margin-top: 2px;
    font-size: 0.48rem;
  }

  .terminal-panels {
    gap: 4px;
    margin-top: 6px;
  }

  .terminal-panel {
    min-height: 32px;
    padding: 5px;
  }

  .terminal-panel small {
    font-size: 0.42rem;
  }

  .terminal-panel strong {
    margin-top: 3px;
    font-size: 0.52rem;
  }

  .terminal-side {
    padding: 7px;
  }

  .side-title {
    font-size: 0.5rem;
    margin-bottom: 4px;
  }

  .side-head {
    gap: 4px;
    margin: 0 0 2px;
    padding-bottom: 4px;
  }

  .side-head span {
    font-size: 0.42rem;
  }

  .side-row {
    gap: 4px;
    min-height: auto;
    padding: 5px 0;
  }

  .side-pair {
    font-size: 0.48rem;
  }

  .side-price,
  .side-delta {
    font-size: 0.48rem;
  }

  .side-delta {
    min-width: 28px;
  }

  .side-actions {
    gap: 4px;
    margin-top: 6px;
  }

  .side-actions button {
    height: 22px;
    font-size: 0.56rem;
  }

  .terminal-footer {
    gap: 4px;
    margin-top: 6px;
  }

  .footer-chip {
    padding: 5px;
  }

  .footer-chip small {
    font-size: 0.44rem;
  }

  .footer-chip strong {
    font-size: 0.58rem;
  }

  .stats-strip {
    grid-template-columns: repeat(2, 1fr);
    margin-top: -14px;
    padding: 8px;
    border-radius: 16px;
    box-shadow: 0 16px 28px rgba(7, 22, 50, 0.08);
  }

  .stat-item {
    gap: 8px;
    min-height: 68px;
    padding: 9px 12px;
  }

  .stat-item + .stat-item {
    border-left: 0;
  }

  .stat-copy span {
    font-size: 0.76rem;
  }

  .stat-copy strong {
    margin-top: 3px;
    font-size: 1.65rem;
  }

  .stat-icon {
    width: 28px;
    height: 28px;
  }

  .section-spacing {
    margin-top: 28px;
  }

  .section-heading p {
    margin-top: 10px;
    font-size: 0.96rem;
    line-height: 1.7;
  }

  .market-tabs {
    flex-wrap: nowrap;
    overflow: auto hidden;
    gap: 8px;
    padding-bottom: 8px;
    scroll-snap-type: x proximity;
  }

  .market-tabs button {
    min-height: 40px;
    padding: 0 16px;
    font-size: 0.88rem;
    scroll-snap-align: start;
  }

  .market-grid-shell {
    overflow-x: auto;
    padding-bottom: 4px;
    scroll-snap-type: x proximity;
  }

  .market-grid {
    grid-auto-flow: column;
    grid-auto-columns: 82%;
    grid-template-columns: unset;
    gap: 14px;
  }

  .market-card {
    padding: 16px;
    scroll-snap-align: start;
  }

  .market-copy small {
    font-size: 0.64rem;
  }

  .market-card strong {
    font-size: 1.02rem;
  }

  .market-price {
    font-size: 1.18rem;
  }

  .market-change {
    min-height: 28px;
    padding: 0 9px;
    font-size: 0.78rem;
  }

  .sparkline {
    height: 36px;
    opacity: 0.58;
  }

  .platform-overview {
    padding: 20px;
  }

  .platform-points {
    gap: 10px;
    margin-bottom: 20px;
  }

  .platform-mockup {
    min-height: 190px;
  }

  .mockup-device.mini {
    width: 84px;
  }

  .mockup-device.wide {
    width: 88%;
  }

  .wide-screen {
    min-height: 128px;
  }

  .mockup-candles {
    height: 84px;
  }

  .advantage-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .advantage-card,
  .download-card,
  .video-card,
  .flow-card,
  .trust-card {
    padding: 20px;
  }

  .download-grid {
    gap: 12px;
  }

  .download-card {
    gap: 12px;
    padding: 16px;
  }

  .download-top {
    flex-direction: column;
    gap: 10px;
  }

  .download-branding {
    width: 100%;
  }

  .download-system {
    min-height: 22px;
    padding: 0 9px;
    font-size: 0.68rem;
  }

  .download-kicker {
    font-size: 0.56rem;
  }

  .download-headline h3 {
    font-size: 1.02rem;
  }

  .download-desc {
    font-size: 0.88rem;
    line-height: 1.52;
  }

  .quote-mobile-list {
    gap: 10px;
  }

  .quote-mobile-card {
    padding: 15px;
  }

  .quote-mobile-head strong {
    font-size: 1.08rem;
  }

  .quote-mobile-symbol small {
    font-size: 0.68rem;
  }

  .quote-mobile-badge {
    min-height: 26px;
    padding: 0 8px;
    font-size: 0.72rem;
  }

  .quote-mobile-prices {
    gap: 8px;
    margin-top: 12px;
  }

  .quote-mobile-price {
    padding: 10px;
  }

  .quote-mobile-price strong {
    font-size: 1rem;
  }

  .quote-mobile-move {
    margin-top: 8px;
    padding-top: 8px;
  }

  .quote-mobile-move span {
    font-size: 0.72rem;
  }

  .quote-mobile-move strong {
    font-size: 0.86rem;
  }

  .video-flow {
    gap: 16px;
  }

  .video-frame {
    min-height: 238px;
  }

  .video-overlay {
    left: 20px;
    right: 20px;
    bottom: 82px;
  }

  .video-overlay strong {
    font-size: 1.52rem;
  }

  .video-globe {
    width: 236px;
  }

  .video-timeline {
    left: 20px;
    right: 20px;
    bottom: 18px;
  }

  .play-button {
    left: 20px;
    bottom: 44px;
    width: 52px;
    height: 52px;
  }

  .play-button::before {
    left: 20px;
    top: 16px;
  }

  .flow-card-head h2 {
    font-size: 1.7rem;
  }

  .flow-card-head p {
    font-size: 0.96rem;
    line-height: 1.7;
  }

  .flow-list {
    gap: 14px;
    margin-top: 18px;
  }

  .flow-list li {
    padding-left: 58px;
  }

  .flow-list li::before {
    width: 40px;
    height: 40px;
  }

  .flow-list li strong {
    font-size: 1.08rem;
  }

  .flow-list li p {
    display: none;
  }

  .trust-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .trust-card {
    padding: 16px;
  }

  .trust-card p {
    font-size: 0.82rem;
    line-height: 1.48;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .trust-kicker {
    font-size: 0.6rem;
    letter-spacing: 0.14em;
  }

  .trust-card h3 {
    margin: 10px 0 4px;
    font-size: 0.94rem;
  }

  .bottom-cta {
    padding: 14px 0 0;
  }

  .bottom-cta-inner {
    gap: 12px;
    padding: 16px 0 6px;
  }

  .bottom-cta-inner h2 {
    font-size: 1.7rem;
  }

  .bottom-cta-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .site-footer {
    padding-top: 16px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .footer-brand,
  .footer-subscribe {
    grid-column: 1 / -1;
  }

  .footer-links h3,
  .footer-subscribe h3 {
    margin-bottom: 2px;
    font-size: 0.88rem;
  }

  .footer-subscribe p,
  .footer-brand p {
    font-size: 0.8rem;
    line-height: 1.42;
  }

  .footer-brand-link {
    margin-bottom: 10px;
  }

  .footer-links,
  .footer-subscribe {
    gap: 3px;
  }

  .footer-links a {
    font-size: 0.84rem;
    line-height: 1.34;
  }

  .footer-subscribe-row {
    gap: 8px;
  }

  .footer-subscribe input {
    min-height: 40px;
  }

  .footer-subscribe .primary-button {
    min-height: 40px;
    padding: 0 14px;
  }

  .footer-risk {
    margin-top: 12px;
    padding: 12px;
  }

  .footer-risk strong {
    font-size: 0.88rem;
  }

  .footer-risk p {
    font-size: 0.78rem;
    line-height: 1.48;
  }

  .footer-bottom {
    margin-top: 10px;
    padding-top: 12px;
    gap: 6px;
  }

  .footer-bottom p,
  .footer-meta a {
    font-size: 0.78rem;
  }

  .footer-meta {
    gap: 10px;
  }
}
</style>
