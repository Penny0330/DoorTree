export interface GlobalToastOptions {
  message: string | ''
  type: 'success' | 'error' | 'info' // default: 'info'
  time?: number // default: 2000
}
