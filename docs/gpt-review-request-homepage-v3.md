# Magic Compass 首頁 V3 審稿交接

本輪基於 Vue 首頁 V2 繼續修正，沒有推倒重來，也沒有改首頁模組順序。

## 本輪重點

1. 修正預覽方式：
   - 已改為 `npm run build` + `npm run preview`
   - 所有預覽皆從本地 Vite 預覽 URL 截圖
   - 不再使用 `file://` 直接打開 `index.html`

2. 修正手機端截圖流程：
   - `preview-mobile-viewport-v3.png` 為固定手機 viewport 截圖
   - `preview-mobile-full-v3.png` 為手機 full-page 截圖
   - full-page 改用實際文檔高度裁切，避免 Footer 後大面積空白

3. 手機端可讀性精修：
   - Hero 文案節奏、按鈕與 bullet 間距調整
   - 即時報價區改得更像掃讀卡片而不是壓縮表格
   - 信任背書、CTA、Footer 尾段收得更緊湊

4. Hero 終端畫面加強：
   - 桌機 / 手機裝置畫面加入更像交易終端的 watchlist、價格、數據卡、狀態信息

## 這輪請 GPT 主要審查

1. 手機端整體可讀性是否已足夠像獨立設計過的 WAP 首頁
2. Hero 裝置畫面的真實感是否已足夠接近成熟 CFD 平台
3. 手機端即時報價、信任背書、底部 CTA / Footer 是否還有可以再壓縮或再精煉的地方
4. 若需 V4，請直接列出：
   - 保留不動
   - 必改項目
   - 可優化但非必要

## 對照檔案

- 參考稿：
  - `PCV1.png`
  - `WAPV1.png`
- 本輪預覽：
  - `preview-desktop-v3.png`
  - `preview-mobile-viewport-v3.png`
  - `preview-mobile-full-v3.png`
