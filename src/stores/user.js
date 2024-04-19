import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { dateTimeFormate } from '@/utils/datetime'
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    nickName: 'Lumi',
    joinDay: '2024-01-01 00:00:00',
  })
  const joinTime = computed(() => {
    const time = dateTimeFormate() - dateTimeFormate(new Date(userInfo.value.joinDay))
    console.log(dateTimeFormate())
    const days = Math.floor(time / (24 * 3600 * 1000 ))
    return days
  })
  return { userInfo, joinTime }
})
