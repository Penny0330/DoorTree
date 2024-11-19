export interface EditDetail {
  id: string
  link: string
  showQRCodeBtn: boolean
  showShareBtn: boolean
  profile: {
    title: string
    description: string
    avatar: string
  }
}

export interface EditModalParams {
  title: string
  type: string
  data: object
}
