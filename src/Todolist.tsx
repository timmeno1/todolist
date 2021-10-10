import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {
    Button,
    Grid,
    IconButton,
    List,
    Typography
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {
    addTaskAC,
    TaskType
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import { Task } from "./Task";


type PropsType = {
    id:string
    title:string
    changeFilter: (value: FilterValuesType, tlId:string) => void
    filter: FilterValuesType
    removeTodoList : (tlId: string) => void
    changeTodoListTitle : (tlId: string, title:string) => void
}

const Todolist = React.memo((props: PropsType) => {


    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    let filterTasks = (filter:FilterValuesType) =>{
        switch (filter) {

            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks
        }
    }

    const onAllClickHandler = useCallback(
        () => {
            props.changeFilter("all",props.id)
        },
        [props]
    )

    const onActiveClickHandler = useCallback(
        () => {
            props.changeFilter("active",props.id)
        },
        [props]
    )
    const onCompleteClickHandler = useCallback(
        () => {
            props.changeFilter("completed",props.id)
        },
        [props]
    )

    const removeTodoList = useCallback(
        () => {
            props.removeTodoList(props.id)
        },
        [props]
    )

    const changeTodoListTitle = useCallback(
        (title:string) => {
            props.changeTodoListTitle(props.id,title)
        },
        [props.id, props.changeTodoListTitle]
    )

    const addTask = useCallback(
        (title:string) => {
            dispatch(addTaskAC(props.id, title))
        },
        [dispatch, props.id]
    )

    return (
        <Grid item xs={4}>
            <Typography variant={"h5"}>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} className={""}/>
                <IconButton color={"default"} onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}  />

            <List>
                {
                    filterTasks(props.filter).map(t => {

                        return <Task todolistId={props.id} id={t.id} title={t.title} isDone={t.isDone} />
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
})




export default Todolist;