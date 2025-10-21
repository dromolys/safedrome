import { useState } from 'react'

function FileManager() {
  const [files, setFiles] = useState([
    { id: 1, name: 'document.pdf', type: 'pdf', size: '2.5 MB', date: '2024-01-15' },
    { id: 2, name: 'spreadsheet.xlsx', type: 'xlsx', size: '1.8 MB', date: '2024-01-14' },
    { id: 3, name: 'presentation.pptx', type: 'pptx', size: '5.2 MB', date: '2024-01-13' },
    { id: 4, name: 'notes.txt', type: 'txt', size: '15 KB', date: '2024-01-12' }
  ])
  const [selectedFiles, setSelectedFiles] = useState([])

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const getFileIcon = (type) => {
    const icons = {
      pdf: '📄',
      xlsx: '📊',
      pptx: '📽️',
      txt: '📝',
      default: '📁'
    }
    return icons[type] || icons.default
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-slate-700">File Manager</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300">📁 New Folder</button>
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300">📤 Upload</button>
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300">🔄 Refresh</button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 gap-6 p-6 bg-gray-50 font-semibold text-slate-700 border-b border-gray-200">
            <div className="px-3">Name</div>
            <div className="px-3">Type</div>
            <div className="px-3">Size</div>
            <div className="px-3">Date</div>
            <div className="px-3">Actions</div>
          </div>
          
          {files.map(file => (
            <div 
              key={file.id} 
              className={`grid grid-cols-5 gap-6 p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                selectedFiles.includes(file.id) ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => toggleFileSelection(file.id)}
            >
              <div className="px-3 flex items-center font-medium">
                <span className="mr-3 text-xl">{getFileIcon(file.type)}</span>
                {file.name}
              </div>
              <div className="px-3 flex items-center">{file.type.toUpperCase()}</div>
              <div className="px-3 flex items-center">{file.size}</div>
              <div className="px-3 flex items-center">{file.date}</div>
              <div className="px-3 flex items-center gap-2 justify-end">
                <button className="p-2 rounded hover:bg-gray-200 transition-colors duration-200" title="Download">⬇️</button>
                <button className="p-2 rounded hover:bg-gray-200 transition-colors duration-200" title="Share">🔗</button>
                <button className="p-2 rounded hover:bg-gray-200 transition-colors duration-200" title="Delete">🗑️</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 text-center text-gray-600">
          {selectedFiles.length > 0 && (
            <p>{selectedFiles.length} file(s) selected</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileManager
