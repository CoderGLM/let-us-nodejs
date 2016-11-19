/*
 *
 *  nodejs如何使用mongoose：http://mongoosejs.com/docs/
 *
 */
import mongoose from 'mongoose'

let db = mongoose.connect('mongodb://localhost/tasks')
const Schema = mongoose.Schema
const Tasks = new Schema({
  project: String,
  description: String
})
mongoose.model('Task', Tasks)

const Task = mongoose.model('Task')
let task = new Task()
task.project = 'Bikeshed'
task.description = 'Paint the bikeshed red.'
task.save(err => {
  if (err) throw err
  console.log('Task saved.')

  Task.find({project: 'Bikeshed'}, (err, tasks) => {
    console.dir(tasks[0].description)
    mongoose.disconnect()
  })
})
