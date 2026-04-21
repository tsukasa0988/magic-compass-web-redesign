$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://127.0.0.1:4173/"

Add-Type -AssemblyName System.Web

$mimeTypes = @{
  ".css"  = "text/css"
  ".gif"  = "image/gif"
  ".htm"  = "text/html"
  ".html" = "text/html"
  ".ico"  = "image/x-icon"
  ".jpg"  = "image/jpeg"
  ".js"   = "text/javascript"
  ".json" = "application/json"
  ".mjs"  = "text/javascript"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
  ".txt"  = "text/plain"
  ".webp" = "image/webp"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()

if ($env:MC_NO_OPEN -ne "1") {
  Start-Process $prefix | Out-Null
}

Write-Host "Preview server started at $prefix"
Write-Host "Press Ctrl+C to stop."

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = [System.Web.HttpUtility]::UrlDecode($context.Request.Url.AbsolutePath.TrimStart("/"))

    if ([string]::IsNullOrWhiteSpace($requestPath)) {
      $requestPath = "index.html"
    }

    $localPath = Join-Path $root $requestPath

    if ((Test-Path $localPath) -and ((Get-Item $localPath) -isnot [System.IO.DirectoryInfo])) {
      $extension = [System.IO.Path]::GetExtension($localPath).ToLowerInvariant()
      $contentType = $mimeTypes[$extension]

      if (-not $contentType) {
        $contentType = "application/octet-stream"
      }

      $bytes = [System.IO.File]::ReadAllBytes($localPath)
      $context.Response.StatusCode = 200
      $context.Response.ContentType = $contentType
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $context.Response.StatusCode = 404
      $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $context.Response.ContentType = "text/plain"
      $context.Response.ContentLength64 = $notFound.Length
      $context.Response.OutputStream.Write($notFound, 0, $notFound.Length)
    }

    $context.Response.OutputStream.Close()
  }
} finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }

  $listener.Close()
}
