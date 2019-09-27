<template>
  <div>
    {{info}}
  </div>
</template>
<script>
import {mapState} from 'vuex'
  export default{
    components: {

    },
    data(){
        return {
          isShow:true,
          obj:{title:'test'}
        }
    },
    created(){

    },
    computed:{
        ...mapState('admin/user', {
          info: state => state.info,
        })

    },
    methods:{

    }
  }

</script>
<style lang="scss" scoped>

</style>
