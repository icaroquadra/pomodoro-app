import React, { useContext } from 'react'
import { FormContainer, TaskInput, MinutesInput } from './newCycleForm.styles'
import { CyclesContext } from '../Home.tsx'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm(): JSX.Element {
  const { activeTimeCycleData } = useContext(CyclesContext)
  const isCycleInProgress = activeTimeCycleData?.status === 'inProgress'
  const { register } = useFormContext()

  return (
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
  )
}
