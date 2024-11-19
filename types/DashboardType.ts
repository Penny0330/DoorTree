export interface DashboardItem {
  id: string
  link: string
  title: string
  avatar: string
  updateTime: number
}

export interface DashboardData {
  dashboardList: DashboardItem[]
}

export interface CheckLinkTransform {
  [key: string]: {
    icon: () => VNode
    text: string
  }
}
