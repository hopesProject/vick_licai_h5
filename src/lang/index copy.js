import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'
import Cookies from 'js-cookie'
Vue.use(VueI18n)

const DEFAULT_LANG = 'zh-CN'

const locales = {
  'zh-CN': {
    ...zh
  },
  en: {
    ...en
  }
}
if (!Cookies.get('language')) {
  Cookies.set('language', DEFAULT_LANG)
}
let langLocale = Cookies.get('language')
  ? Cookies.get('language')
  : DEFAULT_LANG
const i18n = new VueI18n({
  locale: langLocale,
  messages: locales,
  silentTranslationWarn: true
})
const init = Vue.prototype._init
Vue.prototype._init = function(options) {
  init.call(this, {
    i18n,
    ...options
  })
}

export const setup = (lang) => {
  if (lang === undefined) {
    const language = Cookies.get('language')
    if (language) {
      langLocale = language.replace('-', '_').toLowerCase()
    }
    if (undefined !== langLocale && langLocale !== '') {
      lang = langLocale
    }
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
    // console.log(`lang-${lang}`);
  }

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()

export default i18n
