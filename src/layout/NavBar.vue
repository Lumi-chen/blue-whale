<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const searchKeyWord = ref('')
</script>

<template>
  <div class="nav-bar">
    <el-breadcrumb separator="/" class="bar-left">
      <el-breadcrumb-item :to="{ path: '/'}">BlueWhale</el-breadcrumb-item>
      <el-breadcrumb-item v-if="route.path !== '/'" :to="{ path: route.path}">{{ route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bar-right">
      <el-input v-model="searchKeyWord" placeholder="search" />
      <el-button text circle><el-icon><Setting /></el-icon></el-button>
      <el-button text circle><el-icon><Bell /></el-icon></el-button>
      <el-button text circle><el-icon><User /></el-icon></el-button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  .bar-left {
    line-height: 40px;
    display: inline-flex;
    margin-right: 16px;
  }
  .bar-right {
    display: flex;
    align-items: center;
  }
  ::v-deep {
    .el-button.is-text:not(.is-disabled):hover {
      background-color: transparent;
    }
    .el-button + .el-button {
      margin: 0;
    }
  }
}
</style>