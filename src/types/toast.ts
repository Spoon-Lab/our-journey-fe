export type ToastMessage = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  duration: number;
  id: number;
  message: string;
  type: ToastMessage;
}
