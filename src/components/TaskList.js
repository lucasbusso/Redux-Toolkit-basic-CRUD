import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/task/taskSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const stateTask = useSelector(state => state.tasks)  
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteTask(id))
  }

  return (
    <div>
        <h1>{stateTask.length} tasks</h1>
        <Link to="/create-task">Create task</Link>
        {stateTask.map(task => (
            <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <Link to={`/edit-task/${task.id}`}>Edit task</Link>
            </div>
        ))}        
    </div>
  )
}

export default TaskList