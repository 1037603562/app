<template>
    <div class="shopcar-container">
       <div class="goods-list">

           <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch 
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChangeed(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <shopcar_numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></shopcar_numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
				</div>
			</div>

       </div>

        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan" >
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
                              总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>元</p>
                        </div>
                         <mt-button type="danger">去结算</mt-button> 
					</div>
				</div>
			</div>

            <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>
<script>
import shopcar_numbox from '../subcomponents/shopcar_numbox.vue'
    export default{
        data(){
            return {
                goodslist:[]//购物车中所有商品的数据
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                //获取store中的所有商品的id 然后拼接出一个用逗号分隔开的字符串
                var idArr=[]
                this.$store.state.car.forEach(item=>idArr.push(item.id))
                //获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                    if(result.body.status===0){
                        this.goodslist=result.body.message;
                    }
                });
                //如果购物车中没有商品 则直接返回 不需要请求接口数据 否则会报错
                if(idArr.length<=0){
                    return;
                }
            },
            remove(id,index){//点击删除 吧商品从store中更加传递的id删除 同时吧当前组件中的goodslist中 对应要//删除的那个商品使用index来删除
                            
            this.goodslist.splice(index,1)
            this.$store.commit("removeFromCar",id)
            },
            selectedChangeed(id,val){
                //每当点击开关吧最新的开关状态同步到store中
                //console.log(id+'--'+val); 
                this.$store.commit('updateGoodsSelected',{id,selected:val})
            }
        },
        components:{
            shopcar_numbox
        }
    }
</script>
<style lang="less" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center 
        }
        img{
            width: 60px;
            height: 60xp;
        }
        h1{
            font-size: 13px;

        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{color: red;font-weight: bold}
            p{display: flex;}
        }
    }
   .jiesuan{
       display: flex;
       justify-content: space-between;
       align-items: center;
       .red{
           color: red;
           font-weight: bold;
           font-size: 16px; 
       }
       
   }
    }
</style>
