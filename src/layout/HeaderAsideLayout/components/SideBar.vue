<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="rgba(45,50,63,1)"
    text-color="#fff"
    router
    active-text-color="#fff"
  >
    <div class="boda-icon">

    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>首页</span>
      </template>
      <el-menu-item index="1-1" route="/">首页</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>test</span>
      </template>
      <el-menu-item index="2-1" route="/test">test</el-menu-item>
      <el-menu-item index="2-2" route="/test/one">test-one</el-menu-item>
      <el-menu-item index="2-3" route="/test/two">test-two</el-menu-item>
      <el-menu-item index="2-3" route="/test/three">test-three</el-menu-item>
    </el-submenu>

  </el-menu>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      onMouseLeave(e) {
        console.log(e);
      }
    }
  };
</script>
<style lang="scss">
  .el-menu-vertical-demo {
    width: 200px;
    $bgColor: linear-gradient(
        90deg,
        rgba(26, 94, 205, 1) 0%,
        rgba(49, 128, 253, 1) 100%
    ) !important;

    .boda-icon {
      display: flex;
      justify-content: center;
      margin-top: 60px;
      margin-bottom: 110px;
    }

    .el-menu-item {
      height: 40px;
      line-height: 40px;
      border-radius: 6px;
      width: 95% !important;
      margin: auto;
    }

    .el-menu-item:hover {
      background: $bgColor;
    }
  }
</style>

