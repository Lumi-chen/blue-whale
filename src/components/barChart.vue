<script setup>
import { getCurrentInstance, onMounted } from 'vue'

onMounted(() => {
  const chartDom = document.getElementById('bar')
  console.log(chartDom)
  const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts
  console.log(echarts, getCurrentInstance())
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }
  const myChart = echarts.init(chartDom)
  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
<template>
  <div id="bar" style="height: 100%;"></div>
</template>