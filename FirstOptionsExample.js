/*
    主題: 將壓力參數寫在參數
    內容: 壓力測試的參數寫在程式中
    執行: 使用options的設定
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

//參數 
export const options = {
  vus: 10,            // 虛擬使用者人數 :20 Users
  duration: "30s",    // 時間為30秒
};
   