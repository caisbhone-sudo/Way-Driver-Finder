import { ref } from 'vue'

const message = ref('')
const visible = ref(false)
const type = ref('success')
let timer = null

export function useToast() {
  function showToast(msg, msgType = 'success') {
    message.value = msg
    type.value = msgType
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, 3200)
  }

  return { message, visible, type, showToast }
}
