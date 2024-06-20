import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/cyclesContext'
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

export function Home() {
  const { activeTimeCycleData, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

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

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewTaskFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeTimeCycleData?.status === 'inProgress' ? (
          <ButtonCountdownStop type="button" onClick={interruptCurrentCycle}>
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
