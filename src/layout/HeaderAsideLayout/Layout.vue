<template>
  <div class="app-wrapper">
    <div class="app-content">
      <side-bar class="sidebar-container"></side-bar>
      <div class="main-container">
        <nav-bar></nav-bar>
        <app-title-view></app-title-view>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>


<script>
import { NavBar, SideBar, AppMain, AppTitleView } from "./components";

export default {
    name: "layout",
    components: {
        NavBar,
        SideBar,
        AppMain,
        AppTitleView
    }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    // display: flex;
    // flex-direction: column;
}

.main-container {
    min-height: 100vh;
    height: 100vh;
    overflow-y: auto;
    transition: margin-left 0.28s;
    padding: 0px 25px;
    flex-grow: 1;
}

.app-content {
  display: flex;
  flex-grow: 1;
}
</style>
