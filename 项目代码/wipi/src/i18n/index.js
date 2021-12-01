import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    messages: {
        'zh-CN': require('./lang/cn'),   // 中文语言包
        'en-US': require('./lang/en')    // 英文语言包
    },
})

export default i18n