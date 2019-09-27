<template>
  <div>
    <Detail v-if="isShow" @throwWinResult='doThrowWinResult'  :obj="obj"></Detail>
  </div>
</template>
<script>
  import Detail from "./detail";
  export default{
    data(){
        return {
          isShow:true,
          obj:{title:'test'}
        }
    },
    components: {
      Detail
    },
    created(){

    },
    methods:{
        //子组件返回的事件
      doThrowWinResult(res){
          this.isShow=false
      }

    }
  }

</script>
<style lang="scss" scoped>

</style>
