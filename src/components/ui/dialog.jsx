import { createContext, useContext, useState, cloneElement, useEffect } from 'react'
import { createPortal } from 'react-dom'

const DialogContext = createContext()

export function Dialog({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({ children, asChild }) {
  const { setIsOpen } = useContext(DialogContext)
  
  const handleClick = (e) => {
    e.stopPropagation()
    setIsOpen(true)
  }
  
  if (asChild) {
    return cloneElement(children, {
      onClick: handleClick
    })
  }
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

export function DialogContent({ children, className = '', style = {} }) {
  const { isOpen, setIsOpen } = useContext(DialogContext)
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black transition-opacity"
        style={{ opacity: 0.5 }}
      />
      
      {/* Dialog */}
      <div 
        className={`relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}
        style={{ ...style, zIndex: 10000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity z-10"
        >
          <span className="text-2xl font-light text-gray-500 hover:text-gray-700">×</span>
        </button>
        {children}
      </div>
    </div>,
    document.body
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

