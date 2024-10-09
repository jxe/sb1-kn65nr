import React, { useState } from 'react'
import { JournalEntry } from '../types'
import { Share2, Download } from 'lucide-react'
import { Button } from './ui/button'

interface JournalDisplayProps {
  journalEntries: JournalEntry[]
}

const JournalDisplay: React.FC<JournalDisplayProps> = ({ journalEntries }) => {
  const [isOpen, setIsOpen] = useState(false)

  const generateMarkdown = () => {
    return journalEntries.map(entry => `
# ${entry.emotion} - ${new Date(entry.timestamp).toLocaleString()}

**Question:** ${entry.question}

**Reflection:** ${entry.answer}
`).join('\n\n---\n\n')
  }

  const handleShare = async () => {
    const markdown = generateMarkdown()
    const fileName = 'emotion_journal.md'

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Emotion Journal',
          text: markdown,
          files: [new File([markdown], fileName, { type: 'text/markdown' })],
        })
      } catch (error) {
        console.error('Error sharing:', error)
        downloadFile(markdown, fileName)
      }
    } else {
      downloadFile(markdown, fileName)
    }
  }

  const downloadFile = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (journalEntries.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Journal</h2>
        <Button onClick={handleShare} className="flex items-center">
          {navigator.share ? (
            <>
              <Share2 className="mr-2" size={18} />
              Share Journal
            </>
          ) : (
            <>
              <Download className="mr-2" size={18} />
              Download Journal
            </>
          )}
        </Button>
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="mb-4"
      >
        {isOpen ? 'Hide Journal' : 'Show Journal'}
      </Button>
      {isOpen && (
        <div className="bg-card p-6 rounded-lg shadow-md">
          {journalEntries.map((entry, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-xl font-medium mb-2 text-primary">{entry.emotion}</h3>
              <p className="text-sm text-muted-foreground mb-2">{new Date(entry.timestamp).toLocaleString()}</p>
              <p className="font-medium mb-2">{entry.question}</p>
              <p className="text-muted-foreground">{entry.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default JournalDisplay