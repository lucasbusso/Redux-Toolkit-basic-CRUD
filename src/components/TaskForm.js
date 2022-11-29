import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import {v4 as uuid} from "uuid";
import { addTask, editTask } from "../features/task/taskSlice";

const TaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        description: ""
    })
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const tasks = useSelector(state => state.tasks);


    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(params.id){
            dispatch(editTask(task))
        } else {

            dispatch(addTask({
                ...task,
                id: uuid()
            }));
        }

        navigate('/');
    }

    useEffect(() => {
        if(params.id){
            setTask(tasks.find(task => task.id === params.id));
        }
    }, []);

    return (
        <form 
            onSubmit={handleSubmit}
        >
        <input 
            name="title"
            type="text" 
            placeholder="Task name" 
            onChange={handleChange} 
            value={task.title}
            />
        <textarea
            name="description"
            placeholder="Task description"
            onChange={handleChange}
            value={task.description}
        ></textarea>
        <button type="submit">Save</button>
        </form>
    );
}

export default TaskForm