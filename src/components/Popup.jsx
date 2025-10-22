import React from 'react'

function Popup({ onClose, setActiveComponent }) {
  const handleAction = (action) => {
    setActiveComponent(action)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-80 overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-slate-700">Choose Action</h2>
          <button 
            className="text-gray-500 hover:text-red-500 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">What would you like to do?</p>
          <div className="flex flex-col gap-3">
            <button 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 text-center"
              onClick={() => handleAction('open')}
            >
              📂 Open File
            </button>
            <button 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 text-center"
              onClick={() => handleAction('saveas')}
            >
              💾 Save As
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
