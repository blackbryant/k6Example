### 安裝教學

安裝教學: https://blog.miniasp.com/post/2023/08/01/Getting-Started-with-Grafana-k6-Load-testing-tool (保哥)

#### 參數說明
scenario: 測試情境
VUs: 虛擬使用者人數 (Virtual Users)
iterations: 迭代數，也就是重複測試的次數
data_received: 從「受測目標」接收到的傳輸量
data_sent: 發送到「受測目標」的傳輸量
http_req_blocked: 在發出要求前 TCP 連線的等待時間 (等候有空的 TCP 連線)
http_req_connecting: 建立到「測試目標」的 TCP 連線時間
http_req_duration: 整個 HTTP 的往返時間 (不含 DNS 查詢時間)
( http_req_duration = http_req_sending + http_req_waiting + http_req_receiving )
http_req_failed: 失敗率
http_req_receiving: 從「受測目標」接收到數據的時間
http_req_sending: 發送數據到「受測目標」的傳輸時間
http_req_tls_handshaking: 進行 TLS 交握的時間
http_req_waiting: 等待伺服器回應的時間，也就是俗稱的 time to first byte (TTFB) 時間
http_reqs: 總共發出了多少 HTTP 要求
iteration_duration: 一次完整 iteration 的時間
iterations: 完成幾次 iteration
vus: 虛擬使用者人數
vus_max: 同時最大與最小虛擬使用者人數

#### 後端使用C#來撰寫，QueueLimit為2、每個 12 秒視窗最多允許 4 個要求。

#### 簡單範例: FirstExample.js

* 指令: k6 run --vus 10 --duration 5s .\FirstExample.js

 data_received..................: 24 MB  3.0 MB/s
 data_sent......................: 18 MB  2.2 MB/s
 http_req_blocked...............: avg=2.12µs   min=0s      med=0s     max=9.38ms p(90)=0s      p(95)=0s
 http_req_connecting............: avg=35ns     min=0s      med=0s     max=1.04ms p(90)=0s      p(95)=0s
 http_req_duration..............: avg=208.61µs min=0s      med=0s     max=4.03s  p(90)=527.5µs p(95)=542.2µs
   { expected_response:true }...: avg=1.6s     min=516.9µs med=1.04ms max=4.03s  p(90)=4.03s   p(95)=4.03s
 http_req_failed................: 99.99% 224165 out of 224175
 http_req_receiving.............: avg=18.79µs  min=0s      med=0s     max=1.72ms p(90)=0s      p(95)=0s
 http_req_sending...............: avg=6.29µs   min=0s      med=0s     max=1.51ms p(90)=0s      p(95)=0s
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s     max=0s     p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=183.53µs min=0s      med=0s     max=4.03s  p(90)=525.1µs p(95)=533.9µs
 http_reqs......................: 224175 27867.86845/s
 iteration_duration.............: avg=243.45µs min=0s      med=0s     max=4.03s  p(90)=529.9µs p(95)=547.29µs
 iterations.....................: 224175 27867.86845/s
 vus............................: 2      min=2                max=10
 vus_max........................: 10     min=10               max=10


#### 自訂錯誤訊息: FirstAdvncedExample.js

* 指令: k6 run --vus 10 --duration 5s .\FirstAdvncedExample.js

 data_received..................: 24 MB  3.0 MB/s
 data_sent......................: 18 MB  2.2 MB/s
 http_503_responses.............: 224165 27866.62532/s
 http_req_blocked...............: avg=2.12µs   min=0s      med=0s     max=9.38ms p(90)=0s      p(95)=0s
 http_req_connecting............: avg=35ns     min=0s      med=0s     max=1.04ms p(90)=0s      p(95)=0s
 http_req_duration..............: avg=208.61µs min=0s      med=0s     max=4.03s  p(90)=527.5µs p(95)=542.2µs
   { expected_response:true }...: avg=1.6s     min=516.9µs med=1.04ms max=4.03s  p(90)=4.03s   p(95)=4.03s
 http_req_failed................: 99.99% 224165 out of 224175
 http_req_receiving.............: avg=18.79µs  min=0s      med=0s     max=1.72ms p(90)=0s      p(95)=0s
 http_req_sending...............: avg=6.29µs   min=0s      med=0s     max=1.51ms p(90)=0s      p(95)=0s
 http_req_tls_handshaking.......: avg=0s       min=0s      med=0s     max=0s     p(90)=0s      p(95)=0s
 http_req_waiting...............: avg=183.53µs min=0s      med=0s     max=4.03s  p(90)=525.1µs p(95)=533.9µs
 http_reqs......................: 224175 27867.86845/s
 iteration_duration.............: avg=243.45µs min=0s      med=0s     max=4.03s  p(90)=529.9µs p(95)=547.29µs
 iterations.....................: 224175 27867.86845/s
 vus............................: 2      min=2                max=10
 vus_max........................: 10     min=10               max=10


#### 將壓力參數寫在參數

* 在程式中設定30s與10使用者
* 指令: k6 run .\FirstOptionsExample.js   

    scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
              * default: 10 looping VUs for 30s (gracefulStop: 30s)


    data_received..................: 147 MB  4.5 MB/s
    data_sent......................: 108 MB  3.3 MB/s
    http_503_responses.............: 1344785 41110.618058/s
    http_req_blocked...............: avg=1.83µs   min=0s med=0s      max=8.08ms   p(90)=0s       p(95)=0s
    http_req_connecting............: avg=4ns      min=0s med=0s      max=653.29µs p(90)=0s       p(95)=0s
    http_req_duration..............: avg=187.4µs  min=0s med=0s      max=4.1s     p(90)=527.69µs p(95)=542.5µs
      { expected_response:true }...: avg=1.93s    min=0s med=64.45ms max=4.1s     p(90)=4.1s     p(95)=4.1s
    http_req_failed................: 99.99%  1344785 out of 1344819
    http_req_receiving.............: avg=17.62µs  min=0s med=0s      max=7.99ms   p(90)=0s       p(95)=0s
    http_req_sending...............: avg=5.56µs   min=0s med=0s      max=3.5ms    p(90)=0s       p(95)=0s
    http_req_tls_handshaking.......: avg=0s       min=0s med=0s      max=0s       p(90)=0s       p(95)=0s
    http_req_waiting...............: avg=164.21µs min=0s med=0s      max=4.1s     p(90)=525.4µs  p(95)=535.2µs
    http_reqs......................: 1344819 41111.657452/s
    iteration_duration.............: avg=220.77µs min=0s med=0s      max=4.1s     p(90)=530µs    p(95)=547.69µs
    iterations.....................: 1344819 41111.657452/s
    vus............................: 2       min=2                  max=10
    vus_max........................: 10      min=10                 max=10
 
#### 將壓力參數寫在參數(進階)

  data_received..................: 183 kB 1.3 kB/s
  data_sent......................: 128 kB 907 B/s
  http_503_responses.............: 1455   10.338733/s
  http_req_blocked...............: avg=9.18µs   min=0s med=0s       max=8.57ms  p(90)=0s       p(95)=0s
  http_req_connecting............: avg=3.39µs   min=0s med=0s       max=542.5µs p(90)=0s       p(95)=0s
  http_req_duration..............: avg=140.56ms min=0s med=88.5µs   max=4.1s    p(90)=192.56µs p(95)=670.5µs
    { expected_response:true }...: avg=1.6s     min=0s med=966.15µs max=4.1s    p(90)=3.48s    p(95)=3.55s
  http_req_failed................: 91.22% 1455 out of 1595
  http_req_receiving.............: avg=14.77µs  min=0s med=0s       max=739.3µs p(90)=0s       p(95)=0s
  http_req_sending...............: avg=1.95µs   min=0s med=0s       max=510.2µs p(90)=0s       p(95)=0s
  http_req_tls_handshaking.......: avg=0s       min=0s med=0s       max=0s      p(90)=0s       p(95)=0s
  http_req_waiting...............: avg=140.54ms min=0s med=81.8µs   max=4.1s    p(90)=183.56µs p(95)=506.98µs
  http_reqs......................: 1595   11.333525/s
  iteration_duration.............: avg=1.14s    min=1s med=1s       max=5.1s    p(90)=1s       p(95)=1s
  iterations.....................: 1595   11.333525/s
  vus............................: 1      min=1            max=20
  vus_max........................: 20     min=20           max=20

