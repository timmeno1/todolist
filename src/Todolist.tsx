import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {
    Button,
    Checkbox,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    Typography
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
        <Grid item xs={4}>
            <Typography variant={"h5"}>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton color={"default"} onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}  />

            <List>
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
                        return <ListItem key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                edge="start"
                                checked={t.isDone}
                                onChange={ onChangeStatusHandler }
                                tabIndex={-1}
                                disableRipple
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <ListItemSecondaryAction>
                                <IconButton edge={"end"} color={"default"} onClick={removeTask}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })
                }
            </List>
            <div>
                <Button color={"default"} variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompleteClickHandler}>Completed</Button>
            </div>
        </Grid>
    )
}


export default Todolist;