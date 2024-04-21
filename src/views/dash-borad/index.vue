<template>
  <h3 class="mode-title">🎉 {{ $t('home.welcomBack') }}, {{ userInfo.nickName }} 👋🏼</h3>
  <el-row type="flex" class="flex-top">
    <el-col class="user mode-box ">
      <el-row style="height: max-content;" type="flex">
        <el-row type="flex" justify="space-between">
          <div style="display: flex;">
            <el-avatar :size="50" style="margin-right: 16px;"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <div class="user-info">
              <span class="mode-title" style="font-size: 20px;">{{ userInfo.nickName }}</span>
              <span>You have joined the team for <i>{{ joinTime }}</i> days</span>
            </div>
          </div>
          <div style="display: flex;">
            <div class="user-info weather">
              <span class="mode-title" style="font-size: 20px;">{{ weatherInfo.temperature }}℃</span>
              <span>{{ weatherInfo.weather }}</span>
            </div>
            <svg-icon :name="weatherInfo.icon" :size="50" />
          </div>
        </el-row>
        <el-row style="line-height: 26px;" type="flex" justify="space-between">
          <div style="display: flex;">
            <el-popover placement="top-start" title="Change Mood" :width="200" trigger="hover">
              <template #reference>
                <svg-icon :name="mood" :size="26" />
              </template>
              <template #default>
                <svg-icon v-for="icon in icons" :key="icon.key" :name="icon.name" style="cursor: pointer;"
                  :title="icon.title" @click="changeMood(icon.name)" />
              </template>
            </el-popover>
            <span>Travel in the Mailang River 🌾</span>
          </div>
          <div style="display: flex;">
            <svg-icon name="position" :size="26" />
            <span>{{ address }}</span>
          </div>
        </el-row>
      </el-row>
    </el-col>
    <el-col class="mode-box quick-box">
      <el-row class="mode-title" style="font-size: 16px;">Quick Entrance</el-row>
      <el-row type="flex" justify="space-around">
        <div v-for="menu in menuList" :key="menu.code" :title="menu.title" style="cursor: pointer;"
          @click="goPages(menu.code)">
          <div class="quick-item">
            <Menu style="width: 1em; height: 1em;color: #fff;" />
          </div>
          <span style="font-weight: 200;">{{ menu.code }}</span>
        </div>
      </el-row>
    </el-col>
  </el-row>
  <el-row type=" flex" class="flex-middle">
    <el-col>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-col>
    <el-col class="list">
      <el-row class="task mode-title"><span>Task</span></el-row>
      <div v-for="task in taskList" :key="task.id"></div>
      <el-button text icon="Plus">New Task</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
import { gaodeGetAddress, getWeatherInfo } from '@/api/dashboard'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { getWeatherIcon } from '@/utils/weather'
import { useRouter } from 'vue-router'
const mood = ref('bot')
const { userInfo, joinTime } = storeToRefs(useUserStore())
const icons = [
  { key: 'bot', name: 'bot', title: 'bot' },
  { key: 'bricks', name: 'bricks', title: '搬砖' },
  { key: 'daydream', name: 'daydream', title: '白日梦' },
  { key: 'happy', name: 'happy', title: '活力满满' },
  { key: 'moyu', name: 'moyu', title: '摸鱼' },
]
const menuList = [
  { code: 'Calendar', title: 'Go to Calendar' }
]
const taskList = []
function changeMood(value) {
  console.log(value)
  mood.value = value
}
const key = 'bda9004f564ece28e663d2cd56070bb8'
const address = ref('')
const adcode = ref('')
async function getAddreeInfo() {
  const res = await gaodeGetAddress({ key: key })
  address.value = res.city
  adcode.value = res.adcode
}
const weatherInfo = ref({})
async function getWeather() {
  const res = await getWeatherInfo({
    key: key,
    city: adcode.value,
    extensions: 'base'
  })
  weatherInfo.value = res.lives[0]
  weatherInfo.value.icon = getWeatherIcon(weatherInfo.value.weather)
  console.log(weatherInfo.value)
}
const router = useRouter()
function goPages(menu) {
  console.log(menu)
  router.push({
    name: menu,
    params: {}
  })
}
await getAddreeInfo()
await getWeather()
</script>

<style lang="scss" scoped>
.flex-top {
  .el-col {
    border-radius: 8px;
    height: 120px;
    padding: 16px;
    flex: 1;
    display: flex;
  }

  .user {
    margin-right: 16px;
    flex: 2;

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

    }

    .weather {
      margin-right: 10px;
      text-align: center;
    }
  }

  .quick-box {
    display: flex;
    flex-direction: column;

    .quick-item {
      background-color: $primary-color;
      padding: 8px;
      border-radius: 4px;
      height: 30px;
      width: 30px;
      margin: 0 auto 4px;
    }
  }
}

.flex-middle {
  height: calc(100% - 120px);

  .el-col {
    border-radius: 8px;
    flex: 2;
  }

  .list {
    flex: 1;

    .task {
      background-color: #fddcc5;
      width: max-content;
      padding: 4px 8px;
      border-radius: 4px;

      span::before {
        content: '';
        color: #de8652;
        background-color: #de8652;
        display: inline-block;
        margin-right: 6px;
        height: 12px;
        width: 12px;
        border-radius: 50%;
      }
    }
  }
}

.el-row+.el-row {
  margin-top: 16px;
}
</style>