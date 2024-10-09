import { Emotion } from '../types'

export const negativeEmotions: Emotion[] = [
  { name: 'Sadness', question: 'What way of living was lost?', emoji: '😢', color: 'bg-blue-500' },
  { name: 'Shame', question: 'What way of living did you not live up to?', emoji: '😳', color: 'bg-red-400' },
  { name: 'Anger', question: 'What way of living is being blocked by what external force?', emoji: '😠', color: 'bg-red-500' },
  { name: 'Fear', question: 'What way of living is threatened?', emoji: '😨', color: 'bg-purple-500' },
  { name: 'Disgust', question: 'What way of living is being violated?', emoji: '🤢', color: 'bg-green-500' },
  { name: 'Regret', question: 'What way of living do you wish you had chosen?', emoji: '😔', color: 'bg-gray-500' },
  { name: 'Bitterness', question: 'What way of living feels unfairly denied to you?', emoji: '😤', color: 'bg-yellow-600' },
  { name: 'Humiliation', question: 'What way of living did you feel permanently incapable of?', emoji: '🙈', color: 'bg-pink-600' },
  { name: 'Loneliness', question: 'What type of connection was unavailable?', emoji: '🕸️', color: 'bg-blue-600' },
  { name: 'Confusion', question: 'What way of living was out of focus?', emoji: '🤔', color: 'bg-purple-400' },
]

export const positiveEmotions: Emotion[] = [
  { name: 'Joy', question: 'What way of living has opened up?', emoji: '😄', color: 'bg-yellow-400' },
  { name: 'Love', question: 'What way of living feels deeply fulfilling and connected?', emoji: '❤️', color: 'bg-pink-500' },
  { name: 'Gratitude', question: 'What way of living are you thankful for?', emoji: '🙏', color: 'bg-green-400' },
  { name: 'Hope', question: 'What way of living do you look forward to?', emoji: '🌟', color: 'bg-blue-400' },
  { name: 'Pride', question: 'What way of living reflects your achievements?', emoji: '🦚', color: 'bg-indigo-500' },
]