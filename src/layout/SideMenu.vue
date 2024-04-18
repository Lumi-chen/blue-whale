<script setup>
import { useRouter, useRoute } from 'vue-router'
import { routes } from '../router/index'
import { setting } from '@/setting'
const router = useRouter()
const route = useRoute()
function handleMenuClick(item) {
  console.log(item)
  router.push({
    name: item.name
  })
}
console.log(route)
</script>

<template>
  <div class="menu">
    <div class="title">{{ $t(`${setting.title}`) }}</div>
    <div class="line" />
    <div class="list">
      <el-row v-for="item in routes" :key="item.name" type="flex" align="middle" class="list-row"
        :class="route.name === item.name ? 'active-menu' : ''" @click="handleMenuClick(item)">
        <el-icon>
          <Menu />
        </el-icon>
        <span class="menu-title">{{ $t(`menu.${item.name}`) }}</span>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  height: 100%;
  background: var(--mode-menu-color); // #323236;
  padding: 16px;
  border-radius: 8px;

  .title {
    font-size: 18px;
    text-align: center;
    color: #fff;
  }

  .line {
    background: radial-gradient(#fff, transparent);
    height: 1px;
    margin: 8px;
  }

  .list {
    padding: 16px 8px;

    .list-row {
      color: #fff;
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 8px;

      .menu-title {
        margin-left: 16px;
        font-weight: 200;
      }

      &:hover {
        background-color: $primary-color;
        cursor: pointer;
      }
    }

    .active-menu {
      background-color: $primary-color;
    }
  }
}
</style>