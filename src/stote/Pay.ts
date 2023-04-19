import { defineStore, createPinia } from 'pinia'
import { ref } from 'vue'

export const PayStore = defineStore('PayStore', () => {
  const payBool = ref(false)

  const changePayBool = (b: boolean) => {
    payBool.value = b
  }
  return {
    payBool,
    changePayBool
  }
})

