import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id : string,
    title : string,
    isDone : boolean
}
type PropsType = {
    title:string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title:string) => void
}

const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const setNewTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
        }
    }
    const setTask = () => {
        props.addTask(newTaskTitle)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompleteClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={ setNewTaskTitleHandler }
                       onKeyPress={ onKeyPressHandler }
                />
                <button onClick={setTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = ()=> { props.removeTask(t.id) }
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompleteClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;