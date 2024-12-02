/*
    主題: 簡單測試範例
    內容: Get一個網址內容
    安裝教學: https://blog.miniasp.com/post/2023/08/01/Getting-Started-with-Grafana-k6-Load-testing-tool (保哥)
    執行1: k6 run FirstExample.js
    執行2: (利用 10 VUs 進行為期 30 秒的壓力測試): k6 run --vus 10 --duration 30s FirstExample.js
    執行3: (利用 10 VUs 進行總共 100 次 iterations 的壓力測試):k6 run --vus=10 --iterations=100 FirstExample.js
*/

import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("http://localhost:9999");
  sleep(1);
}
