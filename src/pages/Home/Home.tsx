import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import {
  ButtonCountdownStart,
  ButtonCountdownStop,
  FormContainer,
  HomeContainer,
  MinutesInput,
  SeparatorContainer,
  TaskInput,
  TimerContainer,
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

export function Home() {
  const [timeCycles, setTimeCycles] = useState<TimeCycle[]>([])
  const [activeTimeCycleId, setActiveTimeCycleId] = useState<string | null>(
    null,
  )
  const [amoutSecondsPassed, setAmountSecondsPassed] = useState(0)

  //  const timeCycles: TimeCycle[] = [
  //    {
  //      id: 1,
  //      task: 'Project 1',
  //      time: 25,
  //      status: 'inProgress',
  //      startTime: new Date(),
  //      endTime: new Date(),
  //    },
  //    {
  //      id: 2,
  //      task: 'Project 2',
  //      time: 25,
  //      status: 'finished',
  //      startTime: new Date(),
  //      endTime: new Date(),
  //    },
  //    {
  //      id: 3,
  //      task: 'Project 3',
  //      time: 25,
  //      status: 'interrupted',
  //      startTime: new Date(),
  //      endTime: new Date(),
  //    },
  //  ]

  // console.log(formState.errors) // this is useForm parameter to catch errors
  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormSchemaValidator),
    defaultValues: {
      task: '',
      time: 0,
    },
  })
  // console.log(register('task').)) // to check all the methods available

  const activeTimeCycleData = timeCycles.find(
    (timeCycle) => timeCycle.id === activeTimeCycleId,
  )

  const totalSeconds = activeTimeCycleData ? activeTimeCycleData.time * 60 : 0

  useEffect(() => {
    let intervalId: number

    if (activeTimeCycleData) {
      intervalId = setInterval(() => {
        const secondsDiference = differenceInSeconds(
          new Date(),
          activeTimeCycleData.startTime,
        )

        if (secondsDiference >= totalSeconds) {
          setTimeCycles((state) =>
            state.map((timeCycle: TimeCycle) => {
              if (timeCycle.id === activeTimeCycleData.id) {
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
          clearInterval(intervalId)
          setActiveTimeCycleId(null)
          setAmountSecondsPassed(totalSeconds)
          return
        } else {
          setAmountSecondsPassed(secondsDiference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [activeTimeCycleData])

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
    setAmountSecondsPassed(0)

    reset()
  }

  const currentSeconds = activeTimeCycleData
    ? totalSeconds - amoutSecondsPassed
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
  const isCycleInProgress = activeTimeCycleData?.status === 'inProgress'

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <FormContainer>
          <label> I will work with </label>

          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name for your Project"
            disabled={isCycleInProgress}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="task"> for </label>

          <MinutesInput
            type="number"
            id="time"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={isCycleInProgress}
            {...register('time', { required: true, valueAsNumber: true })}
          />

          <span> minutes. </span>
        </FormContainer>

        <TimerContainer>
          <span>{minutesLeft[0]}</span>
          <span>{minutesLeft[1]}</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>{secondsLeft[0]}</span>
          <span>{secondsLeft[1]}</span>
        </TimerContainer>

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
