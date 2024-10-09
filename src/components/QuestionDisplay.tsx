import React, { useState, useMemo } from 'react'
import { Emotion, JournalEntry } from '../types'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'

interface QuestionDisplayProps {
  selectedEmotions: Emotion[]
  addJournalEntry: (entry: JournalEntry) => void
  setIsTyping: (isTyping: boolean) => void
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ selectedEmotions, addJournalEntry, setIsTyping }) => {
  const [answer, setAnswer] = useState('')
  const [selectedEmotionsForQuestion, setSelectedEmotionsForQuestion] = useState<string[]>([])

  const sortedEmotions = useMemo(() => {
    return [...selectedEmotions].sort((a, b) => b.count - a.count)
  }, [selectedEmotions])

  const handleSubmit = () => {
    if (answer.trim() !== '' && selectedEmotionsForQuestion.length > 0) {
      selectedEmotionsForQuestion.forEach(emotionName => {
        const emotion = selectedEmotions.find(e => e.name === emotionName)
        if (emotion) {
          addJournalEntry({
            emotion: emotion.name,
            question: emotion.question,
            answer,
            timestamp: new Date().toISOString(),
          })
        }
      })
      setAnswer('')
      setSelectedEmotionsForQuestion([])
    }
  }

  const toggleEmotionForQuestion = (emotionName: string) => {
    setSelectedEmotionsForQuestion(prev => 
      prev.includes(emotionName)
        ? prev.filter(e => e !== emotionName)
        : [...prev, emotionName]
    )
  }

  if (selectedEmotions.length === 0) {
    return <p>Select emotions to reflect on them.</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reflect on your emotions</h2>
      <div className="space-y-4">
        {sortedEmotions.map((emotion, index) => (
          <div key={emotion.name} className="flex items-start space-x-3">
            <Checkbox
              id={`emotion-${index}`}
              checked={selectedEmotionsForQuestion.includes(emotion.name)}
              onCheckedChange={() => toggleEmotionForQuestion(emotion.name)}
              className="mt-1"
            />
            <div>
              <label
                htmlFor={`emotion-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {emotion.name} {emotion.emoji}
              </label>
              <p className="text-sm text-muted-foreground mt-1">{emotion.question}</p>
            </div>
          </div>
        ))}
      </div>
      <Textarea
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value)
          setIsTyping(e.target.value.length > 0)
        }}
        placeholder="Type your reflection here..."
        className="w-full min-h-[150px]"
      />
      <Button 
        onClick={handleSubmit} 
        disabled={answer.trim() === '' || selectedEmotionsForQuestion.length === 0}
        className="w-full"
      >
        Submit Reflection
      </Button>
    </div>
  )
}

export default QuestionDisplay