import { forwardRef } from 'react'
import './Frame.css'

const Frame = forwardRef(({ selectedImage, imageScale }, ref) => {
  return (
    <div className="frame-wrapper" ref={ref}>
      <div className="frame-container-inner">
        <div className="frame-image-container">
          <img src="/frame.svg" alt="Frame" className="frame-image" onError={(e) => { e.target.src = '/frame.png' }} />
          
          {selectedImage && (
            <div 
              className="user-image-container"
              style={{
                transform: `translate(-50%, -50%) scale(${imageScale})`,
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

