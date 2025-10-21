import { useState } from 'react'

function Open() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleOpen = () => {
    if (selectedFile) {
      alert(`Opening file: ${selectedFile.name}`)
      // Add your file opening logic here
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10 p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Open File</h1>
        <p className="text-xl opacity-90">Select a file to open</p>
      </div>
      
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="mb-8">
          <input
            type="file"
            id="file-input"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label 
            htmlFor="file-input" 
            className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg cursor-pointer font-medium text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            📁 Choose File
          </label>
        </div>
        
        {selectedFile && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Selected File:</h3>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-700">{selectedFile.name}</span>
              <span className="text-gray-600 text-sm">{(selectedFile.size / 1024).toFixed(2)} KB</span>
            </div>
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <button 
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleOpen}
            disabled={!selectedFile}
          >
            Open File
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Open
