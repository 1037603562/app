<template>
  <div class="photoinfo-container">
      <h3>{{photoinfo.title}}</h3>
      <p class="subtitle">
          <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
          <span>点击：{{photoinfo.click}}次</span>
      </p>
      <hr>

      <!-- 缩略图 -->


      <!--内容 -->
      <div class="content" v-html="photoinfo.content">
         
      </div>
      <!-- 子组件 -->
      <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
//导入评论子组件
import comment from '../subcomponents/comment.vue'


export default {
  data(){
      return {
          id:this.$route.params.id,
          photoinfo:{}
      }
  },
  created(){
      this.getPhotoInfo();
  },
  methods:{
      getPhotoInfo(){
          //获取图片的详情
          this.$http.get("api/getimageInfo/"+this.id).then(result=>{
              if(result.body.status===0){
                  this.photoinfo=result.body.message[0];
              }
          })
      }
  },
  components:{
      'cmt-box':comment//注册评论子组件
  }
}
</script>
<style lang="less" scoped>
.photoinfo-container{
    padding:3px;

    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>

