import { createContext, useContext, useState } from 'react'

const DialogContext = createContext()

export function Dialog({ children, open, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const actualOpen = open !== undefined ? open : isOpen
  const actualOnOpenChange = onOpenChange || setIsOpen

  return (
    <DialogContext.Provider value={{ open: actualOpen, onOpenChange: actualOnOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({ children, asChild }) {
  const { onOpenChange } = useContext(DialogContext)
  
  if (asChild) {
    const child = children
    return (
      <div onClick={() => onOpenChange(true)}>
        {child}
      </div>
    )
  }
  
  return (
    <button onClick={() => onOpenChange(true)}>
      {children}
    </button>
  )
}

export function DialogContent({ children, className = '', style = {} }) {
  const { open, onOpenChange } = useContext(DialogContext)
  
  if (!open) return null
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={() => onOpenChange(false)}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" />
      
      {/* Dialog */}
      <div 
        className={`relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-2xl font-light text-gray-500 hover:text-gray-700">×</span>
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children, className = '' }) {
  return (
    <div className={`flex flex-col space-y-2 p-6 pb-4 ${className}`}>
      {children}
    </div>
  )
}

export function DialogTitle({ children, className = '' }) {
  return (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  )
}

export function DialogDescription({ children, className = '' }) {
  return (
    <p className={`text-sm ${className}`}>
      {children}
    </p>
  )
}

