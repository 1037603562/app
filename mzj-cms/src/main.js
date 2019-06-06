//入口文件
import Vue from 'vue'
//导入app跟组件
import app from './App.vue'

//导入路由报
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器用于解决时间格式问题的
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
return moment(dataStr).format(pattern)
})

//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root='http://www.liulongbin.top:3005';
//q全局设置post时候的表单数据格式组织形式
Vue.http.options.emulateJSON=true; 
//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//按需导入min-ui当中的组件
// import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全部导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
//导入自己的router.js模块
import router from './router.js'

//导入vue-resource
// import VueResource from 'vue-resource'
// Vue.use(VueResource)//安装vue-resource

var ve=new Vue({
  el:'#app',
  render:c => c(app),
  router//挂载路由对象 
})