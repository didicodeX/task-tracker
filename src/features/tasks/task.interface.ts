import {z} from 'zod'

// export default interface Task {
//   _id: string
//   title: string
//   completed: boolean
// }

export const TaskSchema = z.object({
  _id: z.string(),
  title: z.string().min(1),
  completed: z.boolean(),
})

export const NewTaskSchema= z.object({
  title: z.string().min(1,"Le titre est requis")
})

export type NewTask = z.infer<typeof NewTaskSchema>

export const TaskListSchema = z.array(TaskSchema)

export type Task = z.infer<typeof TaskSchema>