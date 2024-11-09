export interface DashboardItem {
  id: string
  title: string
  link: string
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
