import { useState, useEffect } from 'react'

interface TimerState {
  amount: number
  startTime: number | null
  isRunning: boolean
}

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    amount: 0,
    startTime: null,
    isRunning: false,
  })

  useEffect(() => {
    let interval: number | null = null

    if (timerState.isRunning) {
      interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setTimerState(prevState => ({
            ...prevState,
            amount: prevState.amount + (Date.now() - (prevState.startTime || Date.now())),
            startTime: Date.now(),
          }))
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerState.isRunning])

  const startTimer = () => {
    setTimerState(prevState => ({
      ...prevState,
      startTime: Date.now(),
      isRunning: true,
    }))
  }

  const stopTimer = () => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: false,
    }))
  }

  const resetTimer = () => {
    setTimerState({
      amount: 0,
      startTime: null,
      isRunning: false,
    })
  }

  return {
    time: timerState.amount,
    isRunning: timerState.isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  }
}