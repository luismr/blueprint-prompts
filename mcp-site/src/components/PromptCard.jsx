import { useState } from 'react'
import PromptViewer from './PromptViewer'

const PromptCard = ({ prompt }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPrompt = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(prompt.rawContent || prompt.path)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="portfolio-card h-full flex flex-col">
        <div className="portfolio-card-title">
          <span>{prompt.categoryInfo.icon}</span>
          <span className="flex-1 truncate">
            {prompt.title || prompt.filename.replace('.md', '').replace(/-/g, ' ')}
          </span>
        </div>
        
        <p className="portfolio-card-description line-clamp-3 mb-4 flex-1">
          {prompt.description}
        </p>

        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {prompt.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tech-badge">{tag}</span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="tech-badge">+{prompt.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-auto">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="btn-primary flex-1 text-sm py-2"
          >
            View Prompt
          </button>
          <button 
            onClick={handleCopyPrompt}
            className="btn-secondary px-3 py-2 text-sm"
            title="Copy prompt"
          >
            {copied ? '✅' : '📋'}
          </button>
        </div>
      </div>

      <PromptViewer
        prompt={prompt}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  )
}

export default PromptCard