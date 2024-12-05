import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { useDashboard } from '@/composables/useInitData'
import { useShowGlobalToast } from '@/composables/useGlobalToast'

export function useAuth() {
  const { $auth } = useNuxtApp()
  const store = useStore()
  const { initDashboardData } = useDashboard()
  const showGlobalToast = useShowGlobalToast()

  const email = ref<string | null>(null)
  const password = ref<any>(null)
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
      handleAuthSuccess(userCredential.user.uid)
      initDashboardData(userCredential.user.uid)
    } catch (error) {
      showGlobalToast({ message: 'Signup failed!', type: 'error' })
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
    isLoading.value = true
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup($auth, provider)
      const user = result.user
      handleAuthSuccess(user.uid)
      initDashboardData(user.uid)
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
