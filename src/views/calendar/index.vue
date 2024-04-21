<script setup>
import { dateTimeFormate } from '@/utils/datetime'
import { ref } from 'vue';
const now = dateTimeFormate(new Date(), 'set')
const calendarObj = ref({
  year: now.year,
  month: now.month
})
const monthDays = ref([0, 0, 0])
const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const days = ref()
const form = ref({
  name: '',
  startDate: '',
  endDate: '',
  remark: '',
  id: ''
})

const taskList = ref([])
/**
 * @description: 获取月份有多少天
 * @param {*} year 
 * @param {*} month 
 */
function getDays(year, month) {
  return new Date(year, month, 0).getDate()
}
/**
 * @description：获取某月某号是周几
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 */
function getWeekDay(year, month, day = 1) {
  return new Date(year, month - 1, day).getDay()
}
/**
 * @description: 更新上月、本月、下月总天数
 */
function updateMonthDays() {
  monthDays.value[0] = getDays(calendarObj.value.year, calendarObj.value.month - 1)
  monthDays.value[1] = getDays(calendarObj.value.year, calendarObj.value.month)
  monthDays.value[2] = getDays(calendarObj.value.year, calendarObj.value.month + 1)
}
/**
 * @description: 获取年月日集合
 */
function getDayInfo(year, month, day) {
  return dateTimeFormate(new Date(year, month - 1, day), 'set')
}
/**
 * @description：创建日历列表
 */
function createDaysList() {
  const first = getWeekDay(calendarObj.value.year, calendarObj.value.month)
  const last = getWeekDay(calendarObj.value.year, calendarObj.value.month, monthDays.value[1])
  const calendarDays = monthDays.value[1] + first + (7 - last)
  const weekNum = Math.floor(calendarDays / 7)
  let week = []
  taskList.value = []
  for (let i = 0; i < weekNum; i++) {
    week.push([])
    taskList.value.push([])
  }
  for (let i = 0; i < calendarDays - 1; i++) {
    const index = Math.floor(i / 7)
    if (i < first) {
      week[index][i % 7] = {
        ...getDayInfo(calendarObj.value.year, calendarObj.value.month, (i - first + 1)),
        weekday: weekdays[i % 7],
        week: index,
        weekNum: i % 7
      }
    } else if (i > monthDays.value[1] + first) {
      week[index][i % 7] = {
        ...getDayInfo(calendarObj.value.year, calendarObj.value.month + 1, (i - monthDays.value[1])),
        weekday: weekdays[i % 7],
        week: index,
        weekNum: i % 7
      }
    } else {
      week[index][i % 7] = {
        ...getDayInfo(calendarObj.value.year, calendarObj.value.month, (i - first + 1)),
        weekday: weekdays[i % 7],
        week: index,
        weekNum: i % 7
      }
    }
  }
  days.value = week
  console.log(days)
}
/**
 * @description: 判断是否是今天，标红
 */
function isToday(item, now) {
  if (item.day === now.day && item.month === now.month) {
    return 'today'
  } else {
    return ''
  }
}
/**
 * @description: 获取上月、本月、下月日历信息
 */
function getMonth(type) {
  switch (type) {
    case 'last':
      if (calendarObj.value.month === 1) {
        calendarObj.value.year--
        calendarObj.value.month = 12
      } else {
        calendarObj.value.month--
      }
      break
    case 'next':
      if (calendarObj.value.month === 12) {
        calendarObj.value.year++
        calendarObj.value.month = 1
      } else {
        calendarObj.value.month++
      }
      break
    case 'today':
      calendarObj.value.year = now.year
      calendarObj.value.month = now.month
      break
    default:
      break
  }
  updateMonthDays()
  createDaysList()
}
/**
 * @description: 新增任务
 */
function addTask(date) {
  form.value.endDate = `${date.year}/${date.fullMonth}/${date.fullDay}`
  form.value.startDate = `${date.year}/${date.fullMonth}/${date.fullDay}`
  form.value.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
function handleFormSave() {
  if (form.value.name === '') form.value.name = '新建日程'
  const startWeek = getDayInWeek(form.value.startDate)
  const endWeek = getDayInWeek(form.value.endDate)
  console.log(startWeek.week === endWeek.week)
  if (startWeek.week === endWeek.week) {
    taskList.value[startWeek.week].push({
      ...form.value,
      startWeek: { ...startWeek },
      endWeek: { ...endWeek }
    })
  } else {
    for (let i = startWeek.week; i < endWeek.week + 1; i++) {
      taskList.value[i].push({
        ...form.value,
        startWeek: { ...startWeek },
        endWeek: { ...endWeek }
      })
    }
  }
  form.value = {
    name: '',
    startDate: '',
    endDate: '',
    remark: ''
  }
  console.log(taskList.value)
  document.body.click()

}
function getDayInWeek(value) {
  // const { year, month, day } = date.split('/')
  const year = Number(value.split('/')[0])
  const month = Number(value.split('/')[1])
  const day = Number(value.split('/')[2])
  const date = new Date(year, month - 1, day)
  let week = date.getDay()
  if (week === 0) {
    week = 7
  }
  if (year < calendarObj.value.year) {
    // 年份小于今年
    return {
      week: 0,
      weekday: 0
    }
  } else if (year > calendarObj.value.year) {
    // 年份大于今年
    return {
      week: days.value.length,
      weekdays: 6
    }
  } else {
    // 当前月份
    if (month === calendarObj.value.month) {
      console.log(Math.ceil((date.getDate() + 6 - week) / 7))
      return {
        week: week === 7 ? Math.ceil((date.getDate() + 6 - week) / 7) : Math.ceil((date.getDate() + 6 - week) / 7) - 1,
        weekday: week === 7 ? 0 : week
      }
    } else if (month < calendarObj.value.month) {
      if (date.getTime() <= days.value[0][0].time) {
        return {
          week: 0,
          weekday: 0
        }
      }
      return {
        week: 0,
        weekday: week === 7 ? 0 : week
      }
    } else if (month > calendarObj.value.month) {
      if (date.getTime() > days.value[days.value.length - 1][6].time) {
        return {
          week: days.length - 1,
          weekday: 6
        }
      }
      return {
        week: days.value.length - 1,
        weekday: week === 7 ? 0 : week
      }
    }
  }
}
function hansleTaskPosition(task, weekIndex) {
  const style = {}
  style.fontSize = '12px'
  style.left = task.startWeek.weekday === 0 ? 0 : `calc((100% / 7) * ${task.startWeek.weekday})`
  console.log(taskList.value[weekIndex])
  const list = taskList.value[weekIndex].filter(item => {
    if (item.startWeek.week !== weekIndex) {
      if (item.endWeek.week === weekIndex) {
        return item.endWeek.weekday >= task.startWeek.weekday
      } else {
        return true
      }
    } else {
      return item.startWeek.weekday <= task.startWeek.weekday && item.endWeek.weekday >= task.endWeek.weekday
    }
    // console.log((item.startWeek.weekday <= task.startWeek.weekday && item.endWeek.weekday >= task.endWeek.weekday) || item.startWeek.weekday === task.startWeek.weekday)
    // return (item.startWeek.weekday <= task.startWeek.weekday && item.endWeek.weekday >= task.endWeek.weekday) || item.startWeek.weekday === task.startWeek.weekday
  })
  const index = list.findIndex(item => { return item.id === task.id }) + 1
  if (index > 2) {
    style.display = 'none'
    return style
  }
  console.log(index, 'index', list, weekIndex)
  if (task.startDate === task.endDate) {
    style.width = 'calc((100% / 7) - 8px)'
    style.top = `${index * 30}px`
  } else if (task.startWeek.week === task.endWeek.week) {
    style.width = `calc(((100% / 7) * ${task.endWeek.weekday - task.startWeek.weekday + 1} - 8px))`
    style.top = `${index * 30}px`
    style.background = '#e91e63'
    style.color = '#fff'
  } else if (task.startWeek.week < task.endWeek.week) {
    if (weekIndex === task.endWeek.week) {
      style.width = `calc(((100% / 7 )* ${task.endWeek.weekday + 1} - 8px))`
      style.left = 0
    } else if (weekIndex === task.startWeek.week) {
      style.width = `calc(((100% / 7 )* ${7 - task.startWeek.weekday} - 8px))`

    } else if (weekIndex > task.startWeek.week && weekIndex < task.endWeek.week) {
      style.width = `calc((100% - 8px))`
      style.left = 0
    }
    style.top = `${index * 30}px`
    style.backgroundColor = '#e91e63'
    style.color = '#fff'

  }
  console.log(style)
  return style
}
function getCurrentDayTaskList(day) {
  const list = taskList.value[day.week].filter(item => {
    if (item.startWeek.week !== day.week) {
      if (item.endWeek.week === day.week) {
        return item.endWeek.weekday >= day.weekNum
      } else {
        return true
      }
    } else {
      return item.startWeek.weekday <= day.weekNum && item.endWeek.weekday >= day.weekNum
    }
    // return item.startWeek.weekday === day.weekNum || (item.startWeek.weekday < day.weekNum && item.endWeek.weekday > day.weekNum)
  })
  return list.length
}
updateMonthDays()
createDaysList()
</script>

<template>
  <h3 style="font-size: 20px;">📅 Imitate the Mac calendar component</h3>
  <div class="mode-box calender">
    <el-row type="flex" justify="space-between">
      <el-col :span="12" style="font-size: 20px;font-weight: 700;">{{ calendarObj.year }} 年 {{ calendarObj.month
        }} 月</el-col>
      <el-col :span="12" style="text-align: end;">
        <el-button icon="ArrowLeft" size="small" @click="getMonth('last')" />
        <el-button size="small" @click="getMonth('today')">今天</el-button>
        <el-button size="small" icon="ArrowRight" @click="getMonth('next')" />
      </el-col>
    </el-row>
    <el-row type="flex">
      <div class="weekday" v-for="(day, key) in weekdays" :key="key">{{ day }}</div>
    </el-row>
    <el-row v-for="(week, weekIndex) in days" :key="weekIndex" type="flex" class="week">
      <el-row type="flex">
        <div v-for="(item, index) in week" :key="index" class="weekday day"
          :class="index === 0 || index === 6 ? 'weekend' : ''">
          <el-popover trigger="click" placement="right" width="300" :teleported="false" @show="addTask(item)">
            <template #reference>
              <div style="height: 100%;">
                <el-row type="flex">
                  <el-col :span="12" style="text-align: start;"></el-col>
                  <el-col :span="12">
                    <span :class="isToday(item, now)">{{ item.day
                      }}</span>日
                  </el-col>
                </el-row>
                <el-row v-if="getCurrentDayTaskList(item) > 2" class="content">
                  <div>{{ getCurrentDayTaskList(item) - 2 }} more</div>
                </el-row>
              </div>
            </template>
            <template #default>
              <el-form class="form" label-suffix=":" size="small">
                <el-form-item>
                  <el-input placeholder="新建日程" />
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker v-model="form.startDate" :teleported="false" type="date" placeholder="Pick a day"
                    size="small" value-format="YYYY/MM/DD" format="YYYY/MM/DD" @focus.stop @blur.stop />
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="form.endDate" :teleported="false" type="date" value-format="YYYY/MM/DD"
                    format="YYYY/MM/DD" placeholder="Pick a day" size="small" @focus.stop @blur.stop />
                </el-form-item>
                <el-form-item>
                  <el-input v-model="form.remark" placeholder="添加备注" />
                </el-form-item>
                <el-button type="primary" @click="handleFormSave">save</el-button>
              </el-form>
            </template>
          </el-popover>
        </div>
      </el-row>
      <div class="tasklist">
        <div v-for="task in taskList[weekIndex]" class="task" :style="hansleTaskPosition(task, weekIndex)">
          {{ task.name }}
        </div>
      </div>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.calender {
  height: max-content;
  width: 100%;
  padding: 16px;
  font-weight: 200;

  .weekday {
    flex: 1;
    text-align: end;
    color: #898989;
    padding: 8px 0;
  }

  .week {
    position: relative;

    .tasklist {
      position: absolute;
      // height: calc(100% - 60px);
      width: 100%;
      display: flex;
      // margin: 30px 0;

      .task {
        position: absolute;
        height: 30px;
        line-height: 30px;
        // width: calc(100% / 7);
        padding: 0 16px;
        margin: 0 4px 4px;
        border-radius: 6px;
      }
    }
  }

  .weekend {
    background-color: #eee;
  }

  .day {
    border: 1px solid #e7e7e7;
    margin: 0px -1px -1px 0px;
    padding: 8px;
    height: 120px;

    .today {
      border-radius: 50%;
      background-color: red;
      display: inline-block;
      padding: 2px 4px;
      color: #fff;
    }

    .content {
      height: calc(100% - 20px);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      div {
        width: 100%;
        text-align: center;
      }
    }
  }

  .no-same-month {
    color: #898989 !important;
  }
}

.form {
  .form-time {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    margin: 4px 0;
  }

  ::v-deep {
    .el-input__wrapper {
      box-shadow: none !important;
      padding: 1px 0;
    }

    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>