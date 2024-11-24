export interface DashboardItem {
  id?: string
  link?: string
  title?: string
  avatar?: string
  updateTime?: string
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
