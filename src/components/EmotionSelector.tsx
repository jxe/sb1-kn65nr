import React from 'react'
import { Emotion } from '../types'
import { Button } from './ui/button'
import { X } from 'lucide-react'

interface EmotionSelectorProps {
  emotions: Emotion[]
  selectedEmotions: Record<string, number>
  toggleEmotion: (emotion: Emotion) => void
  incrementEmotion: (emotion: Emotion) => void
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ 
  emotions, 
  selectedEmotions, 
  toggleEmotion, 
  incrementEmotion
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {emotions.map(emotion => {
        const isSelected = selectedEmotions[emotion.name] > 0
        return (
          <div key={emotion.name} className="relative">
            <Button
              onClick={() => isSelected ? incrementEmotion(emotion) : toggleEmotion(emotion)}
              variant={isSelected ? "default" : "outline"}
              className={`${isSelected ? emotion.color : ""} ${isSelected ? 'text-white' : ''} ${isSelected ? 'pr-8' : ''} text-lg py-6`}
            >
              <span className="mr-2 text-2xl">{emotion.emoji}</span>
              {emotion.name}
              {isSelected && (
                <span className="ml-2 bg-white text-black rounded-full px-2 py-1 text-sm">
                  {selectedEmotions[emotion.name]}
                </span>
              )}
            </Button>
            {isSelected && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 bottom-0 px-1 hover:bg-red-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleEmotion(emotion)
                }}
              >
                <X size={14} />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EmotionSelector