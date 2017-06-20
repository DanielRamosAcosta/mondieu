const coffee = require('coffeescript')
const fs = require('fs')
const pathh = require('path')
const babel = require("babel-core")

module.exports = {
  process (src, path) {
    if (path.endsWith('.coffee') || path.endsWith('.cjsx')) {
      const es6 = coffee.compile(src, { bare: true })
      const { code } = babel.transform(es6, {
        "presets": [
          "es2015",
          "stage-0",
          "react"
        ],
        "plugins": [
          "transform-decorators-legacy",
          ["module-resolver", {
            "root": ["./app"],
            "alias": {
              "components": "./components"
            }
          }]
        ]
      })
      return code
    }

    return src
  }
};
