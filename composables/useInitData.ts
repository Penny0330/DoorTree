import { useFirestore } from '@/composables/useFirestore'
import type { DashboardData } from '~/types/DashboardType'

const { setDocument } = useFirestore()

export const useDashboard = () => {
  const initDashboardData = async (uid: string): Promise<void> => {
    const initData: DashboardData = {
      dashboardList: [],
    }
    await setDocument('dashboard', uid, initData)
  }

  return { initDashboardData }
}
