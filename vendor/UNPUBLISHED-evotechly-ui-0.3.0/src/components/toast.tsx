import { Toaster as Sonner, toast as sonnerToast } from 'sonner';
import type { ReactNode } from 'react';

export function ToastViewport() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'ev-toast',
        },
      }}
    />
  );
}

export const toast = {
  success: (message: string, action?: { label: string; onClick: () => void }) =>
    sonnerToast.success(message, action ? { action } : undefined),
  error: (message: string, action?: { label: string; onClick: () => void }) =>
    sonnerToast.error(message, action ? { action } : undefined),
  warning: (message: string, action?: { label: string; onClick: () => void }) =>
    sonnerToast.warning(message, action ? { action } : undefined),
  information: (message: string, action?: { label: string; onClick: () => void }) =>
    sonnerToast(message, action ? { action } : undefined),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};

export function toastMessage(node: ReactNode) {
  return sonnerToast(node);
}
