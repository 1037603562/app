<template>
  <div class="goodsinfo-container">
      <transition
       @before-enter="beforeEnter"
       @enter="enter"
       @after-enter="afterEnter">
          <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
      <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
       </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量:<goodsinfo_numbox 
                                    @getcount="getSelectedCount"
                                    :max="goodsinfo.stock_quantity"></goodsinfo_numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
	    </div>

        <!-- 商品参数区域 -->

        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号:{{goodsinfo.goods_no}}</p>
                        <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
        
  </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
import goodsinfo_numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
  data(){
      return {
          id:this.$route.params.id,
          lunbotu:[],
          goodsinfo:{},
          ballFlag:false,//控制小球的显示和隐藏的标识符
          selectedCount:1//保存用户选中的商品数量，默认为1
      }
  },
  created(){
      this.getLunbotu();
      this.getGoodsInfo();
  },
  methods:{
      getLunbotu(){
          this.$http.get('api/getthumimages/'+this.id).then(result=>{
              if(result.body.status===0){
                  result.body.message.forEach(item=>{
                      item.img=item.src
                  })
                  this.lunbotu=result.body.message;
              }
          })
      },
      getGoodsInfo(){
          //获取商品的信息
          this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
              if(result.body.status===0){
                  this.goodsinfo=result.body.message[0];
              }
          })
      },
      goDesc(id){
          //点击使用编程式导航跳转到图文介绍页面
          this.$router.push({name:"goodsdesc",params:{id}})
      },
      goComment(id){
          //点击跳转到评论页面
             this.$router.push({name:"goodscomment",params:{id}})
      },
      addToShopCar(){
          //添加到购物车
          this.ballFlag=!this.ballFlag;
          //{id:商品id,count:要购买的数量,price:商品单价,selected:true}
          //拼接出一个要保存的store中car数组里的商品信息对象
          var goodsinfo={
                    id:this.id,
                    count:this.selectedCount,
                    price:this.goodsinfo.sell_price,
                    selected:true
                        };
                    
                    //调用store中的mutations来将商品加入到购物车
                    this.$store.commit('addToCar',goodsinfo)
      },
      beforeEnter(el){
          el.style.transform="translate(0,0)";
      },
      enter(el,done){
          el.offsetWidth;
          //小球抵达位置写死了 导致不同分辨率和滑动滚动条之后小球抵达位置不正确
          //解决方法：(x2-x1,y2-y1)

          //获取小球在页面的位置
          const ballPosition = this.$refs.ball.getBoundingClientRect();
          //获取徽标在页面中的位置 个别情况在vue当中科院适当操作DOM元素的
          const badgePosition=document.getElementById('badge').getBoundingClientRect();
          var xDist=badgePosition.left - ballPosition.left;
          var yDist=badgePosition.top - ballPosition.top;
          el.style.transform="translate("+xDist+"px,"+yDist+"px)";
          el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
          done()
      },
      afterEnter(el){
           this.ballFlag=!this.ballFlag
      },
      getSelectedCount(count){
          this.selectedCount=count;
        
      }
       
  },
  components:{
      swiper,
      goodsinfo_numbox
  }
}
</script>
<style lang="less" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
.now_price{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-footer{
    display: block;
    button{
        margin:15px 0;
    }
}

.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color:red;
    position: absolute;
    z-index: 99;
    top:411px;
    left: 78px; 
    
}
}
</style>
