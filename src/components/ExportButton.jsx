import './ExportButton.css'

function ExportButton({ onExport }) {
  return (
    <button onClick={onExport} className="export-button">
      <span className="export-icon">💾</span>
      <span>Export as WhatsApp Profile Pic</span>
    </button>
  )
}

export default ExportButton

