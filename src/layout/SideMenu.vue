<script setup>
import { useRouter, useRoute } from 'vue-router'
import { routes } from '../router/index'
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
    <div class="title">Blue Whale</div>
    <div class="line" />
    <div class="list">
      <el-row v-for="item in routes" :key="item.name" type="flex" align="middle" class="list-row"
        :class="route.name === item.name ? 'active-menu' : ''" @click="handleMenuClick(item)">
        <!-- <template v-if="item.children?.length">
          <div v-if="item.children?.length" class="bold-title">{{ item.name }}</div>
          <template v-else>
            <div v-for="menuItem in item">
              <el-icon><Menu /></el-icon>
              <span>{{ menuItem.name }}</span>
            </div>
          </template>
</template> -->
        <el-icon>
          <Menu />
        </el-icon>
        <span class="menu-title">{{ item.name }}</span>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  height: 100%;
  background: var(--theme-menu-color); // #323236;
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
        background-color: $primaryColor;
        cursor: pointer;
      }
    }

    .active-menu {
      background-color: $primaryColor;
    }
  }
}
</style>