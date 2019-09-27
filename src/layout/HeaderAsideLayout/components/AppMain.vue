<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
    name: "AppMain"
};
</script>

<style lang="scss" scoped>
.app-main {
    // background: rgba(255, 255, 255, 1);
    // box-shadow: 4px 10px 20px 0px rgba(43, 131, 255, 0.08);
    // border-radius: 10px;
    margin-top: 25px;
    // padding: 25px 30px;
}
</style>