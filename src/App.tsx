import React, { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import EmotionSelector from './components/EmotionSelector'
import QuestionDisplay from './components/QuestionDisplay'
import JournalDisplay from './components/JournalDisplay'
import { Emotion, JournalEntry } from './types'
import { Heart, Frown, Book } from 'lucide-react'
import Timer from './components/Timer'
import { useTimer } from './hooks/useTimer'
import { negativeEmotions, positiveEmotions } from './data/emotions'

function App() {
  const [selectedEmotions, setSelectedEmotions] = useState<Record<string, number>>({})
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [activeTab, setActiveTab] = useState('emotions')
  const [isTyping, setIsTyping] = useState(false)

  const emotionsTimer = useTimer()
  const reflectionsTimer = useTimer()

  const toggleEmotion = (emotion: Emotion) => {
    setSelectedEmotions(prev => {
      const newEmotions = { ...prev }
      if (newEmotions[emotion.name]) {
        delete newEmotions[emotion.name]
      } else {
        newEmotions[emotion.name] = 1
      }
      return newEmotions
    })
    if (Object.keys(selectedEmotions).length === 0) {
      emotionsTimer.startTimer()
    }
  }

  const incrementEmotion = (emotion: Emotion) => {
    setSelectedEmotions(prev => ({
      ...prev,
      [emotion.name]: (prev[emotion.name] || 0) + 1
    }))
  }

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => [...prev, entry])
  }

  const sortedNegativeEmotions = useMemo(() => {
    return negativeEmotions.sort((a, b) => (selectedEmotions[b.name] || 0) - (selectedEmotions[a.name] || 0))
  }, [selectedEmotions])

  const sortedPositiveEmotions = useMemo(() => {
    return positiveEmotions.sort((a, b) => (selectedEmotions[b.name] || 0) - (selectedEmotions[a.name] || 0))
  }, [selectedEmotions])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === 'emotions') {
      reflectionsTimer.stopTimer()
      if (Object.keys(selectedEmotions).length > 0) {
        emotionsTimer.startTimer()
      }
    } else if (value === 'reflections') {
      emotionsTimer.stopTimer()
      if (isTyping) {
        reflectionsTimer.startTimer()
      }
    } else {
      emotionsTimer.stopTimer()
      reflectionsTimer.stopTimer()
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">EmotiTrack: Your Emotional Journey</h1>
      </header>
      <main className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="emotions" className="flex-1"><Heart className="mr-2" />Emotions</TabsTrigger>
            <TabsTrigger value="reflections" className="flex-1"><Frown className="mr-2" />Reflections</TabsTrigger>
            <TabsTrigger value="journal" className="flex-1"><Book className="mr-2" />Journal</TabsTrigger>
          </TabsList>
          <TabsContent value="emotions" className="p-4">
            <h2 className="text-2xl font-bold mb-4">How are you feeling?</h2>
            <Timer time={emotionsTimer.time} />
            <h3 className="text-xl font-semibold mt-4 mb-2">Negative Emotions</h3>
            <EmotionSelector
              emotions={sortedNegativeEmotions}
              selectedEmotions={selectedEmotions}
              toggleEmotion={toggleEmotion}
              incrementEmotion={incrementEmotion}
            />
            <h3 className="text-xl font-semibold mt-6 mb-2">Positive Emotions</h3>
            <EmotionSelector
              emotions={sortedPositiveEmotions}
              selectedEmotions={selectedEmotions}
              toggleEmotion={toggleEmotion}
              incrementEmotion={incrementEmotion}
            />
          </TabsContent>
          <TabsContent value="reflections" className="p-4">
            <h2 className="text-2xl font-bold mb-4">Reflect on your emotions</h2>
            <Timer time={reflectionsTimer.time} />
            <QuestionDisplay 
              selectedEmotions={[...sortedNegativeEmotions, ...sortedPositiveEmotions].filter(emotion => selectedEmotions[emotion.name])}
              addJournalEntry={addJournalEntry}
              setIsTyping={(isTyping) => {
                setIsTyping(isTyping)
                if (isTyping) {
                  reflectionsTimer.startTimer()
                } else {
                  reflectionsTimer.stopTimer()
                }
              }}
            />
          </TabsContent>
          <TabsContent value="journal" className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Emotional Journal</h2>
            <JournalDisplay journalEntries={journalEntries} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App