export interface Emotion {
  name: string
  question: string
  emoji: string
  color: string
}

export interface JournalEntry {
  emotion: string
  question: string
  answer: string
  timestamp: string
  intensity?: number
}