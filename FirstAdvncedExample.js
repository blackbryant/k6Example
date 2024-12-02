/*
    主題: 簡單測試範例
    內容: Get一個網址內容，在腳本中記錄每種 HTTP 狀態碼的分佈（如 429, 200, 等），以更清楚地了解失敗原因。
         當超過負載會回傳503狀態碼，我們會在訊息中顯示http_503_responses
    執行: (利用 10 VUs 進行為期 30 秒的壓力測試): k6 run --vus 10 --duration 30s FirstExample.js
*/

import http from "k6/http";
import { Counter } from "k6/metrics";

let status503 = new Counter("http_503_responses");

export default function () {
  let res = http.get("http://localhost:9999");
  if (res.status === 503) {
    status503.add(1);
  }
}

   