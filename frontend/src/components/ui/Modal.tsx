import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnOverlayClick?: boolean
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-[90vw] max-h-[90vh]',
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={`bg-surface border border-border rounded-xl shadow-xl w-full ${sizeClasses[size]} flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 id="modal-title" className="text-lg font-semibold text-text">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-white/5"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {footer ? (
          <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 justify-end">{children}</div>
}

Modal.CloseButton = function ModalCloseButton({ onClose }: { onClose: () => void }) {
  return <Button variant="ghost" onClick={onClose}>Cancel</Button>
}
