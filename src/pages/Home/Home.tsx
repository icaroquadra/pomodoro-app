import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  TimerContainer,
  SeparatorContainer,
  ButtonCountdownStart,
  FormContainer,
  TaskInput,
  MinutesInput,
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
  // console.log(formState.errors) // this is useForm parameter to catch errors
  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormSchemaValidator),
    defaultValues: {
      task: '',
      time: 25,
    },
  })
  // console.log(register('task').)) // to check all the methods available

  function createNewTask(data: NewTaskFormData) {
    // eslint-disable-next-line no-console
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewTask)} action="">
        <FormContainer>
          <label> I will work with </label>

          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name for your Project"
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
            {...register('time', { required: true, valueAsNumber: true })}
          />

          <span> minutes. </span>
        </FormContainer>

        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </TimerContainer>

        <ButtonCountdownStart disabled={isSubmitDisabled} type="submit">
          <FontAwesomeIcon icon={faPlay} />
          Start
        </ButtonCountdownStart>
      </form>
    </HomeContainer>
  )
}
