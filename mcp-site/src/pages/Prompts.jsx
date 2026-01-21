import { useState, useMemo } from 'react'
import PromptCard from '@/components/PromptCard'

const Prompts = ({ prompts, categories }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = searchTerm === '' || 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [prompts, searchTerm, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="hero-container">
        <p className="accent-text mb-3">Prompt Collection</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          Browse Prompts
        </h1>
        <p className="text-slate-400">
          {prompts.length} prompts across {categories.length} categories
        </p>
      </section>

      {/* Filters */}
      <section className="section pt-0">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedCategory === 'all'
                ? 'bg-green-500 text-black font-medium'
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            All ({prompts.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
                selectedCategory === category.key
                  ? 'bg-green-500 text-black font-medium'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name} ({category.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="section pt-0">
        <p className="text-slate-500 text-sm mb-6">
          Showing {filteredPrompts.length} of {prompts.length} prompts
          {searchTerm && <span> for "{searchTerm}"</span>}
          {selectedCategory !== 'all' && (
            <span> in {categories.find(c => c.key === selectedCategory)?.name}</span>
          )}
        </p>

        {filteredPrompts.length > 0 ? (
          <div className="grid-2">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="portfolio-card text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2 text-white">No prompts found</h3>
            <p className="text-slate-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all') }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Prompts