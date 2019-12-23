import Vue from 'vue'
import lan from '@/Framework/Language'
import Permission from './components/Permission'
import Header from './components/header'
import ImgUpload from './components/ImgUpload'
import variables from './utils/data/variables'
import filters from './filters'
import repeat from './utils/repeat'
import storage from './utils/storage'
import { isNullOrEmpty } from './utils/tools'

// 全局方法
Vue.prototype.$lan = lan
Vue.prototype.$storage = storage
Vue.prototype.$isNullOrEmpty = isNullOrEmpty
Vue.use(repeat)
// 全局组件
Vue.component('Permission', Permission)
Vue.component('Header', Header)
Vue.component('ImgUpload', ImgUpload)

// 全局变量
Object.keys(variables).forEach((item) => {
  Vue.prototype[item] = variables[item]
})

// 全局过滤器
Object.keys(filters).forEach((item) => {
  Vue.filter(item, filters[item])
})
