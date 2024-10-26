export default defineNuxtRouteMiddleware((to) => {
  const store = useStore()
  if (!store.isLogin && to?.path !== '/') {
    return navigateTo('/')
  }
  if (store.isLogin && to?.path === '/') {
    return navigateTo('/Dashboard')
  }
})
