export const useStore = defineStore(
  'useStore',
  () => {
    // state
    const uid = ref<string | null>(null)

    // getters
    const isLogin = computed(() => !!uid.value)

    // actions
    const setUid = (newUid: string | null) => {
      uid.value = newUid
    }

    return {
      uid,
      isLogin,
      setUid,
    }
  },
  {
    persist: true,
  },
)
