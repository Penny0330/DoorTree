import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import type { Auth } from 'firebase/auth'

export function useAuth() {
  const $auth = useNuxtApp().$auth as Auth
  const store = useStore()
  const { initDashboardData } = useDashboard()
  const showGlobalToast = useShowGlobalToast()

  const email = ref<string>('test@test.com')
  const password = ref<any>('testtest')
  const isLoading = ref<boolean>(false)

  const handleAuthSuccess = (uid: string) => {
    store.setUid(uid)
    showGlobalToast({ message: 'Login successfully!', type: 'success' })
    navigateTo('/Dashboard')
  }

  const handleSignup = async () => {
    isLoading.value = true
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
        email.value,
        password.value,
      )
      await initDashboardData(userCredential.user.uid)
      handleAuthSuccess(userCredential.user.uid)
    } catch (error) {
      showGlobalToast({
        message: `Signup failed! ${error}`,
        type: 'error',
        time: 5000,
      })
      console.error('Error signing in:', error)
    } finally {
      isLoading.value = false
    }
  }

  const handleLogin = async () => {
    isLoading.value = true
    try {
      const userInfo = await signInWithEmailAndPassword(
        $auth,
        email.value,
        password.value,
      )
      handleAuthSuccess(userInfo.user.uid)
    } catch (error) {
      showGlobalToast({
        message: 'Email or password is incorrect!',
        type: 'error',
      })
      console.error('Error login:', error)
    } finally {
      isLoading.value = false
    }
  }

  const handleLogout = async () => {
    isLoading.value = true
    try {
      await signOut($auth)
      store.setUid(null)
      navigateTo('/')
      showGlobalToast({ message: 'Logged out successfully!', type: 'success' })
    } catch (error) {
      showGlobalToast({ message: 'Logout failed!', type: 'error' })
      console.error('Error logging out:', error)
    } finally {
      isLoading.value = false
    }
  }

  const handleLoginUseGoogle = async () => {
    console.log(process.env.NODE_ENV)
    isLoading.value = true
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup($auth, provider)
      const user = result.user
      await initDashboardData(user.uid)
      handleAuthSuccess(user.uid)
    } catch (error) {
      console.log('error', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    email,
    password,
    isLoading,
    handleSignup,
    handleLogin,
    handleLogout,
    handleLoginUseGoogle,
  }
}
