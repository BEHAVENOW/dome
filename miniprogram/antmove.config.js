module.exports = {
    "env": "production",
    "platform": "alipay",
    "component2": true,
    "scope": true,
    "type": "wx-alipay",
    "error": false,
    "empty": false,
    "fromId": 0,
    "isReport": true,
    "useRuntimeLog": false,
    "watch": false,
    "ignoreNpm": true,
    "libraryName": "",
    "useCompileLog": false,
    "autoOpenReport": false,
    "input": "./",
    "output": "dist\\weiduan1"
,
    "hooks": {
        "appJson": function plugin(appJson) {
          return appJson
        }

    },
    "babel": {
        "presets": [],
        "plugins": function() {
          return []
        }
    },
        "plugins": []
}