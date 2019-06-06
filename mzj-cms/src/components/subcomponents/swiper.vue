<template>
  <div>
      <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
            <!-- <mt-swipe-item> <img src="../../images/1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item> <img src="../../images/2.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item> <img src="../../images/3.jpg" alt=""></mt-swipe-item> -->
        </mt-swipe>
  </div>
</template>
<script>
export default {
  props:["lunbotuList","isfull"]
}
</script>
<style lang="less" scoped>
.mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
         
            img{
               // width:100%;
                height:100%
            }
        }
    }
    .full{
        width: 100%;
    }
</style>
