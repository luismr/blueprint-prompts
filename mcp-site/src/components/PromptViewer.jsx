import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PromptViewer = ({ prompt, isOpen, onClose }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen && prompt) {
      fetchPromptContent()
    }
  }, [isOpen, prompt])

  const fetchPromptContent = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // For the static site, we can't fetch the original files directly
      // So we'll always use the fallback content with enhanced information
      console.log('Loading prompt:', prompt.filename)
      
      // Try to fetch if it's a test file in public folder
      if (prompt.path.startsWith('/')) {
        const response = await fetch(prompt.path)
        if (response.ok) {
          const text = await response.text()
          setContent(text)
          return
        }
      }
      
      // For all other prompts, use enhanced fallback content
      throw new Error('Using fallback content for static deployment')
      
    } catch (err) {
      console.log('Using fallback content for:', prompt.filename)
      
      // Create enhanced fallback content
      const fallbackContent = createEnhancedFallbackContent(prompt)
      setContent(fallbackContent)
    } finally {
      setLoading(false)
    }
  }

  const createEnhancedFallbackContent = (prompt) => {
    return `# ${prompt.title || prompt.filename.replace('.md', '').replace(/-/g, ' ')}

## Description

${prompt.description}

${prompt.promptPreview ? `
## Prompt Preview

${prompt.promptPreview}

` : ''}

${prompt.examples && prompt.examples.length > 0 ? `
## Example Usage

${prompt.examples.map(example => `- ${example}`).join('\n')}
` : ''}

${prompt.useCases && prompt.useCases.length > 0 ? `
## Use Cases

${prompt.useCases.map(useCase => `- ${useCase}`).join('\n')}
` : ''}

${prompt.tags && prompt.tags.length > 0 ? `
## Technologies & Keywords

${prompt.tags.map(tag => `- ${tag}`).join('\n')}
` : ''}

## File Information

- **Category**: ${prompt.categoryInfo.name}
- **Filename**: ${prompt.filename}
- **Word Count**: ${prompt.wordCount}
- **Last Modified**: ${new Date(prompt.lastModified).toLocaleDateString()}

---

## 🚀 How to Use This Prompt

### Option 1: Hosted MCP Server (Easiest) ⭐
Use the hosted MCP server - no setup required!

\`\`\`
Tool Name: ${prompt.category}_${prompt.filename.replace('.md', '').replace(/[^a-zA-Z0-9]/g, '_')}
\`\`\`

**Quick Setup:**
1. Install in Cursor: \`npx mcp-install https://prompts.luismachadoreis.dev/sse\`
2. Use the tool directly in your AI assistant - that's it!

### Option 2: Local Docker Server
For local development or offline use:

**Setup Steps:**
1. Run the MCP server: \`docker run -d -p 9000:9000 luismachadoreis/the-pudim-blueprint-prompts\`
2. Install in Cursor: \`npx mcp-install http://localhost:9000/sse\`
3. Use the tool directly in your AI assistant

### Option 3: Direct Repository Access
Visit the full prompt in the repository:
- **File**: \`${prompt.category}/${prompt.filename}\`
- **Repository**: [blueprint-prompts](https://github.com/luismr/blueprint-prompts/tree/main/${prompt.category})

### Option 4: Manual Usage
Copy the prompt structure and adapt it to your needs based on the description and examples above.

---

*This preview is generated from extracted metadata. The MCP server provides the complete prompt with all formatting and detailed instructions.*

💡 **Tip:** The hosted option (Option 1) is the fastest way to get started!`
  }

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content)
  }

  const handleCopyMCPCommand = () => {
    const setupCommand = `npx mcp-install https://prompts.luismachadoreis.dev/sse`
    navigator.clipboard.writeText(setupCommand)
  }

  if (!prompt) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-slate-900 border-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{prompt.categoryInfo.icon}</span>
              <Badge className={`${prompt.categoryInfo.color} text-white`}>
                {prompt.categoryInfo.name}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyMCPCommand}
                className="text-xs"
                title="Copy hosted MCP setup command"
              >
                ⭐ Setup
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyContent}
                disabled={loading}
              >
                📄 Copy
              </Button>
            </div>
          </div>
          <DialogTitle className="text-left">
            {prompt.title || prompt.filename.replace('.md', '').replace(/-/g, ' ')}
          </DialogTitle>
          <DialogDescription className="text-left text-slate-400">
            {prompt.filename} • {prompt.wordCount} words
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-slate-400">Loading prompt content...</div>
            </div>
          )}

          {error && (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
              <p className="text-yellow-200 text-sm">{error}</p>
            </div>
          )}

          {content && !loading && (
            <div className="prose prose-invert prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom styling for code blocks
                  code: ({ node, inline, className, children, ...props }) => {
                    return !inline ? (
                      <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto border border-slate-600">
                        <code className="text-green-400 text-sm" {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-slate-700 px-2 py-1 rounded text-sm text-blue-300" {...props}>
                        {children}
                      </code>
                    )
                  },
                  // Custom styling for headings
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4 gradient-text border-b border-slate-600 pb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mb-3 text-blue-300 mt-6">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mb-2 text-blue-400 mt-4">{children}</h3>
                  ),
                  // Custom styling for lists
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-4">{children}</ol>
                  ),
                  // Custom styling for paragraphs
                  p: ({ children }) => (
                    <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
                  ),
                  // Custom styling for blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4 bg-slate-800/50 py-2 rounded-r">
                      {children}
                    </blockquote>
                  ),
                  // Custom styling for links
                  a: ({ children, href }) => (
                    <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  // Custom styling for tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-slate-600 rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="bg-slate-700 border border-slate-600 px-4 py-2 text-left font-semibold text-slate-200">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="bg-slate-800 border border-slate-600 px-4 py-2 text-slate-300">
                      {children}
                    </td>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default PromptViewer