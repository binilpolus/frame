import { useState, useRef } from 'react'
import Frame from './components/Frame'
import ImageSelector from './components/ImageSelector'
import ExportButton from './components/ExportButton'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageScale, setImageScale] = useState(1)
  const frameRef = useRef(null)

  const handleImageSelect = (imageSrc) => {
    setSelectedImage(imageSrc)
    setImageScale(1)
  }

  const handleExport = () => {
    if (!frameRef.current || !selectedImage) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // WhatsApp profile pic is square, typically 640x640 or 1024x1024
    const size = 1024
    canvas.width = size
    canvas.height = size

    // Load frame image
    const frameImg = new Image()
    frameImg.crossOrigin = 'anonymous'
    frameImg.onload = () => {
      // Draw frame
      ctx.drawImage(frameImg, 0, 0, size, size)

      // Load user image
      const userImg = new Image()
      userImg.crossOrigin = 'anonymous'
      userImg.onload = () => {
        // Calculate frame opening area (circular, centered)
        // Adjust these values based on your frame design
        const centerX = size / 2
        const centerY = size / 2
        const openingRadius = size * 0.35 // 35% of canvas size (adjust as needed)
        
        // Calculate image dimensions to fit the opening
        const imgAspect = userImg.width / userImg.height
        let imgWidth = openingRadius * 2 * imageScale
        let imgHeight = openingRadius * 2 * imageScale

        if (imgAspect > 1) {
          imgHeight = imgWidth / imgAspect
        } else {
          imgWidth = imgHeight * imgAspect
        }

        // Center the image in the frame opening
        const x = centerX - (imgWidth / 2)
        const y = centerY - (imgHeight / 2)

        // Clip to circular frame opening area
        ctx.save()
        ctx.beginPath()
        ctx.arc(centerX, centerY, openingRadius, 0, Math.PI * 2)
        ctx.clip()

        // Draw user image
        ctx.drawImage(userImg, x, y, imgWidth, imgHeight)

        ctx.restore()

        // Convert to blob and download
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'whatsapp-profile-pic.png'
          link.click()
          URL.revokeObjectURL(url)
        }, 'image/png')
      }
      userImg.src = selectedImage
    }
    // Try SVG first, fallback to PNG
    frameImg.src = '/frame.svg'
    frameImg.onerror = () => {
      frameImg.src = '/frame.png'
    }
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>📸 Photo Frame</h1>
        <p>Create your perfect WhatsApp profile picture</p>
      </div>
      
      <div className="app-content">
        <div className="frame-container">
          <Frame
            ref={frameRef}
            selectedImage={selectedImage}
            imageScale={imageScale}
          />
        </div>

        <div className="controls">
          <ImageSelector onImageSelect={handleImageSelect} />
          
          {selectedImage && (
            <>
              <div className="control-group">
                <label>Zoom: {(imageScale * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value={imageScale}
                  onChange={(e) => setImageScale(parseFloat(e.target.value))}
                />
              </div>

              <ExportButton onExport={handleExport} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

