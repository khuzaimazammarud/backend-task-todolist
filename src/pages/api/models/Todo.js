// models/Todo.js
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a todo'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
export default Todo;


