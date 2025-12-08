# Photo Frame App - WhatsApp Profile Pic Maker

A React application that allows users to place their photos inside a decorative frame and export it as a WhatsApp profile picture.

## Features

- 🖼️ **Frame Display**: Beautiful frame to showcase your photos
- 📷 **Image Selection**: Choose images from gallery or take a photo with camera
- 🎯 **Position Control**: Drag and adjust image position within the frame
- 📏 **Scale Control**: Zoom in/out to fit your photo perfectly
- 💾 **Export**: Download your framed photo as a high-quality PNG (1024x1024) perfect for WhatsApp

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project folder:
```bash
cd frame
```

2. Install dependencies:
```bash
npm install
```

3. Add your frame image (optional):
   - A default decorative frame (`frame.svg`) is included in the `public` folder
   - You can replace it with your own frame image named `frame.svg` or `frame.png` in the `public` folder
   - The frame should be square (1:1 aspect ratio)
   - Recommended size: 1024x1024 pixels or higher
   - For best results, the frame should have a circular transparent or cutout center area (approximately 70% of frame size) where the photo will appear

4. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - **Important**: Set the Root Directory to `frame` in Vercel project settings
   - Vercel will automatically detect the Vite configuration

3. Deploy:
   - Vercel will automatically build and deploy your app
   - Your app will be live at `your-project.vercel.app`

## Usage

1. Click "Choose from Gallery" or "Take Photo" to select an image
2. Use the position sliders or drag the image to adjust its position
3. Use the scale slider to zoom in/out
4. Click "Export as WhatsApp Profile Pic" to download your framed photo
5. Use the downloaded image as your WhatsApp profile picture!

## Frame Image Requirements

Your `frame.png` should:
- Be a square image (1:1 aspect ratio)
- Have a transparent or cutout center area (circular or square) where the user's photo will appear
- Be at least 1024x1024 pixels for best quality
- The center opening should be approximately 70% of the frame size (adjustable in `Frame.css`)

## Technologies Used

- React 18
- Vite
- HTML5 Canvas (for export)
- CSS3 (for styling)

## License

MIT

