import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { useDashboard } from '@/composables/useInitData'

export const useStore = defineStore(
  'useStore',
  () => {
    const nuxtApp = useNuxtApp()
    const { initDashboardData } = useDashboard()

    // state
    const uid = ref<string | null>(null)

    // getters
    const isLogin = computed(() => !!uid.value)

    // actions
    const setUid = (newUid: string | null) => {
      uid.value = newUid
    }

    const navigateToHomeOrAdmin = () => {
      navigateTo(isLogin.value ? '/Dashboard' : '/')
    }

    const handleAuthSuccess = (uid: string) => {
      console.log('User:', uid)
      setUid(uid)
      navigateToHomeOrAdmin()
    }

    const onSignup = async (email: string | null, password: string) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          nuxtApp.$auth,
          email,
          password,
        )
        // console.log('User signed in:', userCredential.user)
        handleAuthSuccess(userCredential.user.uid)
        initDashboardData(userCredential.user.uid)
      } catch (error) {
        console.error('Error signing in:', error)
      }
    }

    const onLogin = async (email: string | null, password: string) => {
      try {
        const userInfo = await signInWithEmailAndPassword(
          nuxtApp.$auth,
          email,
          password,
        )
        handleAuthSuccess(userInfo.user.uid)
        // console.log('User login:', userInfo.user)
      } catch (error) {
        console.error('Error login:', error)
      }
    }

    const onLogout = async () => {
      try {
        await signOut(nuxtApp.$auth)
        setUid(null)
        navigateToHomeOrAdmin()
      } catch (error) {
        console.log('error', error)
      }
    }

    const onLoginUseGoogle = async () => {
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(nuxtApp.$auth, provider)
        const user = result.user
        handleAuthSuccess(user.uid)
        // console.log('google user: ', user)
      } catch (error) {
        console.log('error', error)
      }
    }

    // const handleAuthStatusChanged = () => {
    //   onAuthStateChanged(nuxtApp.$auth, (user) => {
    //     if (user) {
    //       handleAuthSuccess(user.uid)
    //     } else {
    //       navigateTo('/')
    //     }
    //   })
    // }

    return {
      uid,
      isLogin,
      setUid,
      onSignup,
      onLogin,
      onLogout,
      onLoginUseGoogle,
      // handleAuthStatusChanged,
    }
  },
  {
    persist: true,
  },
)
