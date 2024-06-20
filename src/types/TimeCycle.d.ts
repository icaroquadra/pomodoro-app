export interface TimeCycle {
  id: string
  task: string
  time: number
  status: 'inProgress' | 'finished' | 'paused'
  startTime: Date
  endTime?: Date
  pausedTime?: Date
}
