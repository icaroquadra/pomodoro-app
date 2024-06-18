import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { NewCycleForm } from './NewCycleForm/newCycleForm'
import { Countdown } from './Countdown/countdown'
import {
  ButtonCountdownStart,
  ButtonCountdownStop,
  HomeContainer,
} from './Home.styles'

type NewTaskFormData = zod.infer<typeof newTaskFormSchemaValidator>
// zod can infer the type of the schema. This is the same as:
//  interface NewTaskFormData {
//    task: string
//    time: number
//  }

const newTaskFormSchemaValidator = zod.object({
  task: zod.string().min(3, 'Task name must have at least 3 characters'),
  time: zod
    .number()
    .min(5, 'Time must be at least 5 minutes')
    .max(60, 'Time must be at most 60 minutes'),
})

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
  markCurrentCycleAsFinished: () => void
  setActiveCycleId: (id: string | null) => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as TimeCyclesContextData)

export function Home() {
  const [aboutSecondsPassed, setAboutSecondsPassed] = useState(0)
  const [timeCycles, setTimeCycles] = useState<TimeCycle[]>([])
  const [activeTimeCycleId, setActiveTimeCycleId] = useState<string | null>(
    null,
  )

  // console.log(formState.errors) // this is useForm parameter to catch errors
  // console.log(register('task').)) // to check all the methods available on zod register method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newCycleForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormSchemaValidator),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  function setActiveCycleId(id: string | null) {
    setActiveTimeCycleId(id)
  }

  function setSecondsPassed(seconds: number) {
    setAboutSecondsPassed(seconds)
  }

  const { handleSubmit, watch, reset } = newCycleForm

  const activeTimeCycleData = timeCycles.find(
    (timeCycle) => timeCycle.id === activeTimeCycleId,
  )

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

  function handleCreateNewTask(data: NewTaskFormData) {
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

    reset()
  }

  function handlePauseTimeCycle() {
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

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <CyclesContext.Provider
          value={{
            setActiveCycleId,
            setSecondsPassed,
            activeTimeCycleData,
            activeTimeCycleId,
            markCurrentCycleAsFinished,
            aboutSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeTimeCycleData?.status === 'inProgress' ? (
          <ButtonCountdownStop type="button" onClick={handlePauseTimeCycle}>
            <FontAwesomeIcon icon={faStop} />
            Pause
          </ButtonCountdownStop>
        ) : (
          <ButtonCountdownStart disabled={isSubmitDisabled} type="submit">
            <FontAwesomeIcon icon={faPlay} />
            Start
          </ButtonCountdownStart>
        )}
      </form>
    </HomeContainer>
  )
}
