import { createContext } from 'react';

import type { ToastMessage } from '@/types/toast';

export interface ToastContextType {
  addToast: (message: string, type: ToastMessage, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
