<template>
 <div>
   <AlWin @winEvent="clickResult" :align="'center'" :width="'400'" :height="'400'">
     <!--标题-->
     <span slot="title">{{obj.title}}</span>
     <!--内容-->
     <div slot="content" class="contain">
       内容
     </div>
   </AlWin>
 </div>

</template>
<script>
  import AlWin from "@/components/al-win/win";
  export default{
    data(){
      return {

      }
    },
    props:['obj'],
    components: {
      AlWin
    },
    created(){

    },
    methods:{
      clickResult(res){
          console.log(res);
          this.$emit('throwWinResult',res)
      }
    }
  }

</script>
<style  lang="scss" scoped>

</style>
