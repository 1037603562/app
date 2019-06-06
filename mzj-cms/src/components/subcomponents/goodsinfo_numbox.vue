<template>
  <div>
      <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
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
      //每当文本框数据被修改的时候 立即吧最新的数据通过实际调用传递给父组件
      console.log(this.$refs.numbox.value)
      this.$emit("getcount",parseInt(this.$refs.numbox.value))
    }
  },
  props:["max"],
  watch:{
    //属性监听
    'max':function(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption("max",newVal);
    }
  }
}
</script>
<style lang="less" scoped>

</style>
