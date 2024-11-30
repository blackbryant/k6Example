/*
    主題: 簡單測試範例
    內容: Get一個網址內容
    安裝教學: https://blog.miniasp.com/post/2023/08/01/Getting-Started-with-Grafana-k6-Load-testing-tool (保哥)
*/

import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
}
