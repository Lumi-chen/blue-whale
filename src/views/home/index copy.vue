<script setup>
import { gaodeGetAddress, getWeatherInfo, getScheduleList } from '@/api/home'
import { ref } from 'vue'
import { weekFormate } from '@/utils/datetime'
import barChart from '@/components/barChart.vue'
const address = ref({})
const weather = ref()
const scheduleList = ref([])
const key = 'bda9004f564ece28e663d2cd56070bb8'
async function getAddress() {
  address.value = await gaodeGetAddress({ key: key })
  getWeather(address.value.adcode)
}
async function getWeather(city) {
  const res = await getWeatherInfo({ key: key, city: city, extensions: 'all' })
  weather.value = res.forecasts[0]?.casts[0]
  console.log(weather.value)
}
function getSchedule() {
  scheduleList.value = getScheduleList().list
  console.log(scheduleList)
}
getAddress()
getSchedule()
</script>

<template>
  <el-row type="flex">
    <div class="weather">
      <div class="weather-left">
        <div class="address">{{ address?.province }}, {{ address?.city }}</div>
        <div class="weather-temp">温度：<span>{{ weather?.nighttemp }}</span>°C ~ <span>{{ weather?.daytemp }}</span>°C
        </div>
      </div>
      <div class="weather-middle">
        <div>{{ weather?.date }}</div>
        <div>{{ weather?.daywind }}风 {{ weather?.daypower }}级</div>
      </div>
      <div class="weather-right">
        <div>星期{{ weekFormate(weather?.week) }}</div>
        <div>{{ weather?.dayweather }}</div>
      </div>
    </div>
    <el-row class="user-box" type="flex" justify="space-between">
      <el-col :span="16" style="display: flex; justify-content: space-between; flex-direction: column;">
        <div class="blod-title">🎉 Welcome Back，Lumi</div>
        <el-row type="flex" justify="space-between" style="font-size: 16px;">
          <span class="blod-title">To Do</span>
          <span><span class="blod-title">7 </span>items</span>
        </el-row>
        <el-row type="flex" justify="space-between" style="font-size: 16px;">
          <span class="blod-title" style="line-height: 32px;">Message</span>
          <div>
            <el-avatar v-for="item in 5" :key="item" class="avatar" :size="32"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
        </el-row>
      </el-col>
      <el-col :span="8" class="right">
        <el-avatar :size="60" fit="cover" shape="square">
          <img src="../../assets/img/user-pic.jpg">
        </el-avatar>
        <span style="color: #898989;">Have a good!🌞</span>
      </el-col>
    </el-row>
  </el-row>
  <div class="plan">
    <div class="plan-list first">
      <div class="title">Daily Schedule</div>
      <div style="overflow: hidden scroll;height: calc(100% - 32px);">
        <el-row v-for="sc in scheduleList" :key="sc.key" class="schedule-row" type="flex" justify="space-between">
          <div class="blod-title time">{{ sc.time }}</div>
          <div class="content">
            <span class="blod-title theme">{{ sc.title }}</span>
            <span class="place">{{ sc.place }}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="plan-list">
      <div class="bar-chart">
        <barChart />
      </div>
      <div class="content">
        <div style="font-size: 18px;" class="blod-title">Bug Statistics</div>
        <div>Count the number of bugs in the past seven days</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  // background-color: #161211;
  flex: 1;
  background-color: $primaryColor;
  color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  padding: 16px;
  height: 120px;

  &-left,
  &-middle,
  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .address {
      font-weight: 200;
    }

    .weather-temp {
      font-weight: 200;

      span {
        font-size: 36px;
        font-weight: 600;
      }
    }
  }
}

.user-box {
  flex: 1;
  border-radius: 8px;
  background-color: #fff;
  margin-left: 16px;
  padding: 16px;

  .avatar+.avatar {
    margin-left: -1rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-around;
  }
}

.plan {
  display: flex;
  margin-top: 16px;

  .plan-list {
    overflow: hidden;
    flex: 2;
    border-radius: 8px;
    background-color: #fff;
    max-height: 330px;
    margin-right: 16px;

    &:first-child {
      flex: 0.8;
      padding: 16px;

      .title {
        font-size: 16px;
        margin-bottom: 8px;
      }

      .schedule-row {
        border-bottom: 1px solid #e7e7e7;
        padding-bottom: 8px;
        margin-bottom: 8px;

        .time {
          width: 80px;
          margin: auto;
          font-size: 18px;
          text-align: center;
        }

        .content {
          width: calc(100% - 80px);
          overflow: hidden;

          .theme {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            width: 100%;
          }

          .place {
            color: #898989;
          }
        }
      }
    }

    &:last-child {
      margin: 0;
      padding: 0;

      .bar-chart {
        background-color: $secondColor;
        height: calc(100% - 80px);
      }

      .content {
        padding: 16px;
        height: 80px;

      }
    }


  }
}
</style>