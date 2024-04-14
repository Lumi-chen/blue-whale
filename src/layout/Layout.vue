<script setup>
import SideMenu from './SideMenu.vue'
import NavBar from './NavBar.vue'
</script>

<template>
  <el-container class="wrapper">
    <el-aside width="250px">
      <SideMenu />
    </el-aside>
    <div class="wrapper-right">
      <div class="header">
        <NavBar />
      </div>
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </el-container>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 16px;
  height: 100%;
  display: flex;

  &-right {
    width: calc(100% - 250px);
    padding-left: 16px;
  }
}

.header {
  height: 40px;
  display: flex;
}

.main {
  height: calc(100% - 40px);
  padding-top: 8px;
  overflow: hidden scroll;
}
</style>