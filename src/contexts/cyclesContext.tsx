import { ReactNode, createContext, useReducer, useState } from 'react'
import { TimeCycle } from '../types/TimeCycle'

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

interface CyclesState {
  cycles: TimeCycle[]
  activeCycleId: string | null
}

type Action =
  | { type: 'CREATE'; payload: { newTimeCycle: TimeCycle } }
  | { type: 'PAUSE'; payload: { activeTimeCycleId: string | null } }
  | { type: 'FINISH'; payload: { activeTimeCycleId: string | null } }

export const CyclesContext = createContext({} as TimeCyclesContextData)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps): JSX.Element {
  const reducer = (state: CyclesState, action: Action): CyclesState => {
    switch (action.type) {
      case 'CREATE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newTimeCycle],
          activeCycleId: action.payload.newTimeCycle.id,
        }
      case 'PAUSE':
        return {
          ...state,
          cycles: state.cycles.map((timeCycle) =>
            timeCycle.id === action.payload.activeTimeCycleId
              ? { ...timeCycle, status: 'paused', pausedTime: new Date() }
              : timeCycle,
          ),
        }
      case 'FINISH':
        return {
          ...state,
          cycles: state.cycles.map((timeCycle) =>
            timeCycle.id === action.payload.activeTimeCycleId
              ? { ...timeCycle, status: 'finished', endTime: new Date() }
              : timeCycle,
          ),
        }
      default:
        return state
    }
  }

  const initialState: CyclesState = {
    cycles: [],
    activeCycleId: null,
  }
  const [timeCyclesState, dispatch] = useReducer(reducer, initialState)
  const [aboutSecondsPassed, setAboutSecondsPassed] = useState(0)
  const { cycles: timeCycles, activeCycleId: activeTimeCycleId } =
    timeCyclesState

  const activeTimeCycleData = timeCycles.find(
    (timeCycle) => timeCycle.id === activeTimeCycleId,
  )

  function setSecondsPassed(seconds: number) {
    setAboutSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'FINISH',
      payload: {
        activeTimeCycleId,
      },
    })
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

    dispatch({
      type: 'CREATE',
      payload: {
        newTimeCycle,
      },
    })

    setAboutSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'PAUSE',
      payload: {
        activeTimeCycleId,
      },
    })
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
