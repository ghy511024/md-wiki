// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // cssnext 都具有 autoprefixer功能
    "postcss-cssnext": {},
    // https://github.com/songsiqi/postcss-adaptive
    "postcss-adaptive": {
      remUnit: 75,
      baseDpr: 1,
      remPrecision: 6,
      hairlineClass: 'hairlines',
      autoRem: false,
    },
  }
}
