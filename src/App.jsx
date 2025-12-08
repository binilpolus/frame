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
        // Opening is 70% of canvas (35% radius), matching CSS preview
        const centerX = size / 2
        const centerY = size / 2
        const openingDiameter = size * 0.70 // 70% of canvas size (matches CSS)
        const openingRadius = size * 0.35 // 35% radius
        const baseSize = openingDiameter * imageScale // Base size scaled by zoom
        
        // Get actual image dimensions (accounting for any EXIF orientation)
        const imgWidth_actual = userImg.width
        const imgHeight_actual = userImg.height
        const imgAspect = imgWidth_actual / imgHeight_actual
        
        // Calculate image dimensions to cover the circular opening
        // For a circle, we need to ensure the image covers the full diameter
        let imgWidth, imgHeight
        
        // Size image to cover the circle - ensure the smaller dimension covers the diameter
        // This way the image will fully cover the circle without gaps
        if (imgAspect > 1) {
          // Landscape: width is larger, so ensure height covers the diameter
          imgHeight = baseSize
          imgWidth = baseSize * imgAspect
        } else {
          // Portrait or square: height is larger or equal, so ensure width covers the diameter
          imgWidth = baseSize
          imgHeight = baseSize / imgAspect
        }

        // Center the image in the frame opening
        const x = centerX - (imgWidth / 2)
        const y = centerY - (imgHeight / 2)

        // Clip to circular frame opening area
        ctx.save()
        ctx.beginPath()
        ctx.arc(centerX, centerY, openingRadius, 0, Math.PI * 2)
        ctx.clip()

        // Draw user image - ensure it's drawn from top-left corner
        ctx.drawImage(
          userImg,
          0, 0, imgWidth_actual, imgHeight_actual, // Source rectangle
          x, y, imgWidth, imgHeight // Destination rectangle
        )

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
              {/* Zoom control hidden for now */}
              {/* <div className="control-group">
                <label>Zoom: {(imageScale * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value={imageScale}
                  onChange={(e) => setImageScale(parseFloat(e.target.value))}
                />
              </div> */}

              <ExportButton onExport={handleExport} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

