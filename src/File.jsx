import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Popup from './components/Popup'
import Open from './components/Open'
import SaveAs from './components/SaveAs'
import FileManager from './components/FileManager'
import Subscription from './components/Subscription'
import Settings from './components/Settings'

function File() {
  const [activeComponent, setActiveComponent] = useState('home')
  const [showPopup, setShowPopup] = useState(false)

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />
      case 'open':
        return <Open />
      case 'saveas':
        return <SaveAs />
      case 'filemanager':
        return <FileManager />
      case 'subscription':
        return <Subscription />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100" style={{ minHeight: '100vh' }}>
      <Sidebar 
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        setShowPopup={setShowPopup}
      />
      <main className="flex-1 p-5 overflow-y-auto bg-white ml-64 md:ml-64 sm:ml-0">
        {renderActiveComponent()}
      </main>
      {showPopup && (
        <Popup 
          onClose={() => setShowPopup(false)}
          setActiveComponent={setActiveComponent}
        />
      )}
    </div>
  )
}

export default File
