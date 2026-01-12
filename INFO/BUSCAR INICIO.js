import fetch from "node-fetch";

let url =
  "https://sapi.dramaboxdb.com/drama-box/search/index?timestamp=1768016412102";

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
    "device-id": "917d3745-e595-4846-a69b-048568393995",
    nchid: "DRA1000042",
    instanceid: "6d01ec0d9499e0c15d3bfa268352efbf",
    md: "Redmi Note 8",
    "store-source": "store_google",
    mf: "XIAOMI",
    "local-time": "2026-01-10 00:39:49.413 -0300",
    "time-zone": "-0300",
    brand: "Xiaomi",
    lat: "0",
    "current-language": "es",
    ov: "13",
    userid: "389033070",
    afid: "1768016354787-6522693864639817617",
    "android-id": "000000004b1fb2184b1fb21800000000",
    srn: "1080x2340",
    ins: "1768016354790",
    build: "Build/TQ2B.230505.005.A1",
    pline: "ANDROID",
    vn: "4.8.0",
    "over-flow": "new-fly",
    tn: "Bearer ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnlaV2RwYzNSbGNsUjVjR1VpT2lKVVJVMVFJaXdpZFhObGNrbGtJam96T0Rrd016TXdOekI5LjBaZ0lGZC1ydzZRbU5pclI4LVVfZjl5eGFvTlNqOW5BNVJsRzg5T0J1RnM=",
    sn: "cIuTLsASUZ7sDR016MWKod2BF/lTFCv/Vk91TZY87szCG/9OA0/QgMd0LXgLje+870JlnB7IeInz/rEEneSUvViQVgqeZnp403j11jsH3P4IFoQSCrKaZ4a+A5M2bS/foymkLjabPYoeJlbC4EqgKzmuUGmRMHBPtn+0qmMKW7SaytzC9D/0QxRqbGsbnMYXDpoB9dmnRinRYdhrANnhXqozyYtaz85Yyqa6ZulHx6Nkufo1r04wPHi4e3YackDVIGWTBwwf+/zp9KN9CfzSTiZR8sBW/oRkJkVmZ5pJVuf2yitVdmwicsYqzKwPxL4wyU3sqIw01Ww8No5XiGogQg==",
    "active-time": "22689",
    host: "sapi.dramaboxdb.com",
    connection: "Keep-Alive",
    "accept-encoding": "gzip",
    "user-agent": "okhttp/4.10.0",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
