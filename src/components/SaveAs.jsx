import { useState } from 'react'

function SaveAs() {
  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState('txt')
  const [location, setLocation] = useState('')

  const handleSave = () => {
    if (fileName && fileType) {
      alert(`Saving file: ${fileName}.${fileType}`)
      // Add your save logic here
    }
  }

  const fileTypes = [
    { value: 'txt', label: 'Text File (.txt)' },
    { value: 'pdf', label: 'PDF Document (.pdf)' },
    { value: 'docx', label: 'Word Document (.docx)' },
    { value: 'xlsx', label: 'Excel Spreadsheet (.xlsx)' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10 p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
        <h1 className="text-4xl font-bold mb-3">Save As</h1>
        <p className="text-xl opacity-90">Save your file with a new name or format</p>
      </div>
      
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="space-y-6 mb-8">
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-slate-700 mb-2">File Name:</label>
            <input
              type="text"
              id="filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="filetype" className="block text-sm font-medium text-slate-700 mb-2">File Type:</label>
            <select
              id="filetype"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fileTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">Save Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Choose save location"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={!fileName}
          >
            💾 Save File
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveAs
