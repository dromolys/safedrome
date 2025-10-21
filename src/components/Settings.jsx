import { useState } from 'react'

function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSync: true,
    encryption: true,
    twoFactor: false
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
    // Add your save logic here
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10 p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Settings</h1>
        <p className="text-xl opacity-90">Customize your SafeDrome experience</p>
      </div>
      
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="space-y-10">
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 pb-3 border-b-2 border-blue-500">Appearance</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor="theme" className="text-sm font-medium text-slate-700">Theme:</label>
                <select
                  id="theme"
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="language" className="text-sm font-medium text-slate-700">Language:</label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-32"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 pb-3 border-b-2 border-blue-500">Notifications</h2>
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="mr-3 w-5 h-5 cursor-pointer"
                />
                Enable notifications
              </label>
            </div>
          </div>
          
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 pb-3 border-b-2 border-blue-500">Security</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={settings.encryption}
                    onChange={(e) => handleSettingChange('encryption', e.target.checked)}
                    className="mr-3 w-5 h-5 cursor-pointer"
                  />
                  Enable file encryption
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={(e) => handleSettingChange('twoFactor', e.target.checked)}
                    className="mr-3 w-5 h-5 cursor-pointer"
                  />
                  Enable two-factor authentication
                </label>
              </div>
            </div>
          </div>
          
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 pb-3 border-b-2 border-blue-500">Sync</h2>
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={settings.autoSync}
                  onChange={(e) => handleSettingChange('autoSync', e.target.checked)}
                  className="mr-3 w-5 h-5 cursor-pointer"
                />
                Auto-sync files
              </label>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center pt-8 border-t-2 border-gray-200">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300" onClick={handleSave}>
              💾 Save Settings
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
              🔄 Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
