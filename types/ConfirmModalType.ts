export interface ConfirmModalOptions {
  modalTitle?: string
  content?: string
  customIcon?: string
  customIconColor?: string
  cancelBtnText?: string
  okBtnText?: string
  isDanger?: boolean
  confirmLoading?: boolean
  onOk?: () => void
}
