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
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    TaskType,
    updateTaskTitleAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


type PropsType = {
    id:string
    title:string
    changeFilter: (value: FilterValuesType, tlId:string) => void
    filter: FilterValuesType
    removeTodoList : (tlId: string) => void
    changeTodoListTitle : (tlId: string, title:string) => void
}

const Todolist = (props: PropsType) => {

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
        dispatch(addTaskAC(props.id, title))
    }

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
                        debugger
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(props.id, t.id, newIsDoneValue))
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            dispatch(updateTaskTitleAC(props.id, t.id, newValue))
                        }

                        const removeTask = ()=> { dispatch(removeTaskAC(props.id,t.id)) }

                        return <ListItem key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                edge="start"
                                checked={t.isDone}
                                onChange={ onChangeStatusHandler }
                                tabIndex={-1}
                                disableRipple
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} className={t.isDone ? "is-done" : ""}/>
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