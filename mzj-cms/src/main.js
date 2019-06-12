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

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//没错刚进入网址 肯定会调用main.js 在岗调用的时候 先从本地存储中吧购物车中的数据读出来放到store中
var car=JSON.parse(localStorage.getItem('car')|| '[]')


var store= new Vuex.Store({
   state:{//this.$store.state.***
     car:car//将购物车中的商品数据用这个数字存储起来，在car数 组当中存储一些商品对象，
   },
   mutations:{//this.$store.commit('方法名称'，‘按需传递唯一的参数 ’)
        //定义一个方法用于 将  要保存到state中的商品信息对象 保存到state里面去
        addToCar(state,goodsinfo){//即点击加入购物车 吧商品信息保存到store的car里面
          
          //假设在购物车当中没有找到对应的商品
          var flag=false
          
          state.car.some(item => {
            if(item.id==goodsinfo.id){
           item.count+=parseInt(goodsinfo.count)
              flag=true
              return true//用于终止some循环
            }
          })


          if(!flag){
            state.car.push(goodsinfo)
          }
          //将更新的car数组存储到本地的localStorage中
          localStorage.setItem('car',JSON.stringify(state.car))


        },
        updateGoodsInfo(state,goodsinfo){//修改购物车中的商品额数量值
            state.car.some(item=>{
              if(item.id== goodsinfo.id){
                item.count=parseInt(goodsinfo.count)
                return true
              }
            }) 
            //当修改完商品的数量 吧最新的购物车数据保存到本地存储当中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
          //根据id从store中的购物车中删除对应的那条商品数据
          state.car.some((item,i)=>{
            if(item.id==id){
                state.car.splice(i,1)
                  return true;
              }
          })
          //将删除完毕的最新的购物车数据同步到本地存储中
          localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
          state.car.some(item=>{
            if(item.id==info.id){
              item.selected=info.selected
            }
          })
          //把最新的所有购物车商品的状态保存到store中
          localStorage.setItem('car',JSON.stringify(state.car))
        }
   },
   getters:{//this.$store.getters.***
    getAllCount(state){
      var c=0;
      state.car.forEach(item => {
        c+=item.count
      })
      return c
    },
    getGoodsCount(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o={
        count:0,//勾选的数量
        amount:0//勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected==true){
          // o.count+=item.count
          o.count=o.count+item.count
          o.amount+=item.price * item.count
        }
      })
      return o
    }

   }
})




var ve=new Vue({
  el:'#app',
  render:c => c(app),
  router,//挂载路由对象 
  store//挂载store 状态管理对象
})