import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id : string,
    title : string,
    isDone : boolean
}
type PropsType = {
    id:string
    title:string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, tlId:string) => void
    changeFilter: (value: FilterValuesType, tlId:string) => void
    addTask: (title:string, tlId:string) => void
    changeStatus : (id:string, isDone: boolean, tlId:string) => void
    changeTaskTitle : (id:string, newValue: string, tlId:string) => void
    filter: FilterValuesType
    removeTodoList : (tlId: string) => void
    changeTodoListTitle : (tlId: string, title:string) => void
}

const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => {
        props.changeFilter("all",props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active",props.id)
    }
    const onCompleteClickHandler = () => {
        props.changeFilter("completed",props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(props.id,title)
    }
    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}  />
            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id,newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        const removeTask = ()=> { props.removeTask(t.id, props.id) }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" onChange={ onChangeStatusHandler } checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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