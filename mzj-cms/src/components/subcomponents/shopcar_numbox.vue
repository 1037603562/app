<template>
  <div>
      <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" 
    :value="initcount" @change="countChange" ref="numbox" readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted(){
      mui(".mui-numbox").numbox()
  },
  methods:{
    countChange(){
      //数量改变了
      console.log(this.$refs.numbox.value);
      //每当数量值改变 则立即吧最新的数量同步到购物车的store中 覆盖之前的数据值
      this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value})
    }
  },
  props:['initcount',"goodsid"]
}
</script>
<style lang="less" scoped>

</style>
