import { ReactNode, createContext, useState } from 'react'
interface TimeCycle {
  id: string
  task: string
  time: number
  status: 'inProgress' | 'finished' | 'paused'
  startTime: Date
  endTime: Date
  pausedTime?: Date
}

interface TimeCyclesContextData {
  activeTimeCycleData: TimeCycle | undefined
  activeTimeCycleId: string | null
  aboutSecondsPassed: number
  timeCycles: TimeCycle[]
  markCurrentCycleAsFinished: () => void
  setActiveCycleId: (id: string | null) => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: createCycleData) => void
  interruptCurrentCycle: () => void
}

interface createCycleData {
  task: string
  time: number
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as TimeCyclesContextData)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps): JSX.Element {
  const [aboutSecondsPassed, setAboutSecondsPassed] = useState(0)
  const [timeCycles, setTimeCycles] = useState<TimeCycle[]>([])
  const [activeTimeCycleId, setActiveTimeCycleId] = useState<string | null>(
    null,
  )

  const activeTimeCycleData = timeCycles.find(
    (timeCycle) => timeCycle.id === activeTimeCycleId,
  )

  function setActiveCycleId(id: string | null) {
    setActiveTimeCycleId(id)
  }

  function setSecondsPassed(seconds: number) {
    setAboutSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setTimeCycles((state) =>
      state.map((timeCycle: TimeCycle) => {
        if (timeCycle.id === activeTimeCycleId) {
          return {
            ...timeCycle,
            status: 'finished',
            endTime: new Date(),
          }
        } else {
          return timeCycle
        }
      }),
    )
  }

  function createNewCycle(data: createCycleData) {
    const id = String(new Date().getTime())

    const newTimeCicle: TimeCycle = {
      id,
      task: data.task,
      time: data.time,
      status: 'inProgress',
      startTime: new Date(),
      endTime: new Date(),
    }

    setTimeCycles((state) => [...state, newTimeCicle])
    setActiveTimeCycleId(id)
    setAboutSecondsPassed(0)

    // reset()
  }

  function interruptCurrentCycle() {
    setTimeCycles((state) =>
      state.map((timeCycle: TimeCycle) => {
        if (timeCycle.id === activeTimeCycleData?.id) {
          return { ...timeCycle, status: 'paused', pausedTime: new Date() }
        } else {
          return timeCycle
        }
      }),
    )

    setActiveTimeCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        setActiveCycleId,
        setSecondsPassed,
        activeTimeCycleData,
        activeTimeCycleId,
        markCurrentCycleAsFinished,
        aboutSecondsPassed,
        interruptCurrentCycle,
        timeCycles,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
