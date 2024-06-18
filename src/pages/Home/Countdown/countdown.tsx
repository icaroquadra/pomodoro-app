import { SeparatorContainer, TimerContainer } from './countdown.styles'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../Home.tsx'
import { differenceInSeconds } from 'date-fns'

export function Countdown(): JSX.Element {
  const {
    activeTimeCycleData,
    markCurrentCycleAsFinished,
    setActiveCycleId,
    setSecondsPassed,
    aboutSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeTimeCycleData ? activeTimeCycleData.time * 60 : 0

  const currentSeconds = activeTimeCycleData
    ? totalSeconds - aboutSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const remainingSeconds = currentSeconds % 60

  const minutesLeft = String(minutesAmount).padStart(2, '0')
  const secondsLeft = String(remainingSeconds).padStart(2, '0')

  useEffect(() => {
    if (activeTimeCycleData?.status === 'inProgress') {
      document.title = `${minutesLeft}:${secondsLeft} - ${activeTimeCycleData.task}`
    }
  }, [minutesLeft, secondsLeft, activeTimeCycleData])

  useEffect(() => {
    let intervalId: number

    if (activeTimeCycleData) {
      intervalId = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeTimeCycleData.startTime,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(intervalId)
          setActiveCycleId(null)
          setSecondsPassed(totalSeconds)
          return
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    activeTimeCycleData,
    totalSeconds,
    markCurrentCycleAsFinished,
    setActiveCycleId,
    setSecondsPassed,
  ])

  return (
    <TimerContainer>
      <span>{minutesLeft[0]}</span>
      <span>{minutesLeft[1]}</span>
      <SeparatorContainer>:</SeparatorContainer>
      <span>{secondsLeft[0]}</span>
      <span>{secondsLeft[1]}</span>
    </TimerContainer>
  )
}
