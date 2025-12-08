import { useRef } from 'react'
import './ImageSelector.css'

function ImageSelector({ onImageSelect }) {
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onImageSelect(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const handleCameraClick = () => {
    cameraInputRef.current?.click()
  }

  return (
    <div className="image-selector">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <button onClick={handleGalleryClick} className="selector-button gallery-button">
        <span className="button-icon">🖼️</span>
        <span>Choose from Gallery</span>
      </button>
      
      <button onClick={handleCameraClick} className="selector-button camera-button">
        <span className="button-icon">📷</span>
        <span>Take Photo</span>
      </button>
    </div>
  )
}

export default ImageSelector

