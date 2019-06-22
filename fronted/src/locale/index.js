import Vue from 'vue'
import Loacles from './locale'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        'zh': Loacles["zh-CN"]
    }
})

export default i18n
