import React from 'react'

function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10 p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Welcome to SafeDrome</h1>
        <p className="text-xl opacity-90">Your secure file management solution</p>
      </div>
      
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <div className="text-5xl mb-5">🔒</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">Secure Storage</h3>
            <p className="text-slate-600 leading-relaxed">Keep your files safe with advanced encryption</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <div className="text-5xl mb-5">📁</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">File Management</h3>
            <p className="text-slate-600 leading-relaxed">Organize and manage your files efficiently</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <div className="text-5xl mb-5">☁️</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">Cloud Sync</h3>
            <p className="text-slate-600 leading-relaxed">Access your files from anywhere, anytime</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl">
            <div className="text-5xl mb-5">🔄</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">Auto Backup</h3>
            <p className="text-slate-600 leading-relaxed">Never lose your important files again</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300">
              Upload File
            </button>
            <button className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300">
              Create Folder
            </button>
            <button className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300">
              Sync Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
