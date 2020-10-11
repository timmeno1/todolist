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
    changeStatus : (id:string, isDone: boolean) => void
    filter: "all" | "active" | "completed"
}

const Todolist = (props: PropsType) => {
    let [error, setError] = useState<string | null>(null)

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const setNewTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setTask()
        }
    }

    const setTask = () => {
        if(newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle)
        } else {
            setError("Title is required!")
        }
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
                       className={error? "error" : ""}
                />
                <button onClick={setTask}>+</button>
                { error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id,newIsDoneValue)
                        }

                        const removeTask = ()=> { props.removeTask(t.id) }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" onChange={ onChangeHandler } checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompleteClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;