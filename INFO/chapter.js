import fetch from "node-fetch";

let url =
  "https://sapi.dramaboxdb.com/drama-box/chapterv2/batch/load?timestamp=1768154086389";

import { generateSn } from "./signature.util.js";

const timestamp = "1768154086389";
const body =
  '{"boundaryIndex":0,"comingPlaySectionId":-1,"index":-1,"currencyPlaySource":"discover_177_rec","needEndRecommend":0,"currencyPlaySourceName":"首页发现_Descubrir_推荐列表","preLoad":false,"rid":"","pullCid":"","loadDirection":0,"startUpKey":"9f5cdb6a-7dba-47c6-8bb3-68de3fe8ed78","bookId":"42000000746"}';
const deviceId = "917d3745-e595-4846-a69b-048568393995";
const androidId = "000000004b1fb2184b1fb21800000000";
const tn =
  "Bearer ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnlaV2RwYzNSbGNsUjVjR1VpT2lKVVJVMVFJaXdpZFhObGNrbGtJam96T1RBMk5EWXhOelY5LlF5cV9RNlJoV3FUckJObERhbGp5ZkhuUGE1UXpXYUpFb01NTXJ5MTRnam8=";

const sn = generateSn(timestamp, body, deviceId, androidId, tn);

let options = {
  method: "POST",
  headers: {
    version: "480",
    "package-name": "com.storymatrix.drama",
    p: "47",
    cid: "DRA1000042",
    apn: "2",
    "country-code": "PY",
    mchid: "",
    mbid: "",
    tz: "180",
    language: "es",
    mcc: "744",
    locale: "es_US",
    "device-id": deviceId,
    nchid: "DRA1000042",
    instanceid: "c1590bfc83f34e708da096e6feb98e4d",
    md: "Redmi Note 8",
    "store-source": "store_google",
    mf: "XIAOMI",
    "device-score": "75",
    "local-time": "2026-01-10 00:39:49.413 -0300",
    "time-zone": "-0300",
    brand: "Xiaomi",
    lat: "0",
    "current-language": "es",
    ov: "13",
    userid: "389033070",
    afid: "1768016354787-6522693864639817617",
    "android-id": androidId,
    srn: "1080x2340",
    ins: "1768016354790",
    build: "Build/TQ2B.230505.005.A1",
    pline: "ANDROID",
    vn: "4.8.0",
    "over-flow": "new-fly",
    tn: tn,
    sn: sn,
    "active-time": "38535",
    "content-type": "application/json; charset=UTF-8",
    host: "sapi.dramaboxdb.com",
    connection: "Keep-Alive",
    "accept-encoding": "gzip",
    "user-agent": "okhttp/4.10.0",
  },
  body: body,
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));

// {
//   "boundaryIndex": 0,
//   "comingPlaySectionId": -1,
//   "index": -1,
//   "currencyPlaySource": "discover_177_rec",
//   "needEndRecommend": 0,
//   "currencyPlaySourceName": "首页发现_Descubrir_推荐列表",
//   "preLoad": false,
//   "rid": "",
//   "pullCid": "",
//   "loadDirection": 0,
//   "startUpKey": "9f5cdb6a-7dba-47c6-8bb3-68de3fe8ed78",
//   "bookId": "42000000746"
// }

// // para avanzar de capitulo.

// // siguiente lote.
// {
//   "boundaryIndex": 4,
//   "comingPlaySectionId": -1,
//   "index": 3,
//   "currencyPlaySourceName": "首页发现_Descubrir_推荐列表",
//   "rid": "",
//   "enterReaderChapterIndex": 0,
//   "loadDirection": 2,
//   "startUpKey": "9f5cdb6a-7dba-47c6-8bb3-68de3fe8ed78",
//   "bookId": "42000000746",
//   "currencyPlaySource": "discover_177_rec",
//   "needEndRecommend": 0,
//   "preLoad": true,
//   "pullCid": ""
// }
