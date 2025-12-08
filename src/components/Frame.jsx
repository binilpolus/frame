import { forwardRef } from 'react'
import './Frame.css'

const Frame = forwardRef(({ selectedImage, imagePosition, imageScale, onPositionChange, onScaleChange }, ref) => {
  const handleImageDrag = (e) => {
    if (!selectedImage) return
    
    const container = e.currentTarget.closest('.frame-wrapper')
    const rect = container.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100
    
    onPositionChange({ x, y })
  }

  return (
    <div className="frame-wrapper" ref={ref}>
      <div className="frame-container-inner">
        <div className="frame-image-container">
          <img src="/frame.svg" alt="Frame" className="frame-image" onError={(e) => { e.target.src = '/frame.png' }} />
          
          {selectedImage && (
            <div 
              className="user-image-container"
              style={{
                transform: `translate(${imagePosition.x}%, ${imagePosition.y}%) scale(${imageScale})`,
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                const startX = e.clientX
                const startY = e.clientY
                const startPos = { ...imagePosition }

                const handleMouseMove = (moveEvent) => {
                  const container = e.currentTarget.closest('.frame-wrapper')
                  const rect = container.getBoundingClientRect()
                  const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100
                  const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100
                  
                  onPositionChange({
                    x: startPos.x + deltaX,
                    y: startPos.y + deltaY,
                  })
                }

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove)
                  document.removeEventListener('mouseup', handleMouseUp)
                }

                document.addEventListener('mousemove', handleMouseMove)
                document.addEventListener('mouseup', handleMouseUp)
              }}
            >
              <img 
                src={selectedImage} 
                alt="Your photo" 
                className="user-image"
                draggable={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

Frame.displayName = 'Frame'

export default Frame

