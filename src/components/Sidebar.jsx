import React from 'react'

function Sidebar({ activeComponent, setActiveComponent, setShowPopup }) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'open', label: 'Open', icon: '📂' },
    { id: 'saveas', label: 'Save As', icon: '💾' },
    { id: 'filemanager', label: 'File Manager', icon: '📁' },
    { id: 'subscription', label: 'Subscription', icon: '💳' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  const handleMenuItemClick = (itemId) => {
    if (itemId === 'open' || itemId === 'saveas') {
      setShowPopup(true)
    } else {
      setActiveComponent(itemId)
    }
  }

  return (
    <aside className="w-64 h-screen bg-slate-700 text-white fixed left-0 top-0 z-50 overflow-y-auto md:block hidden">
      <div className="p-5 border-b border-slate-600">
        <h2 className="text-xl font-bold text-slate-100">SafeDrome</h2>
      </div>
      <nav className="p-5">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full p-4 text-left rounded-lg transition-all duration-300 flex items-center ${
                  activeComponent === item.id 
                    ? 'bg-blue-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-600 hover:text-white'
                }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <span className="mr-4 text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
