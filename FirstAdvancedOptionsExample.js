/*
    主題: 將壓力參數寫在參數(進階)
    內容: 壓力測試的參數寫在程式中
    執行: 使用options的設定
*/

import http from "k6/http";
import { Counter } from "k6/metrics";
import { sleep } from "k6";

let status503 = new Counter("http_503_responses");

export default function () {
  let res = http.get("http://localhost:9999");
  sleep(1); //每位 VUser會停頓 1 秒鐘的時間
  if (res.status === 503) {
    status503.add(1);
  }
}

//參數
//30s-> 1 user -> 20 users
//1m30s -> 20 users -> 10 users 
//20s -> 10 users -> 0 users
export const options = {
  stages: [ 
    { duration: "30s", target: 20 },  
    { duration: "1m30s", target: 10 },
    { duration: "20s", target: 0 },
  ],
};