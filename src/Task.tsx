import { ListItem, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, {ChangeEvent, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import { EditableSpan } from './EditableSpan'
import { changeTaskStatusAC, removeTaskAC, TaskType, updateTaskTitleAC } from './state/tasks-reducer'




type TaskPropsType = {
    todolistId: string
    id: string
    title: string
    isDone: boolean
}


export const Task = React.memo( (props: TaskPropsType) => {
    
    console.log("task")

    const dispatch = useDispatch()

    const onChangeStatusHandler = useCallback( (e:ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.todolistId, props.id, newIsDoneValue))
        
    }, [dispatch, props.todolistId, props.id])

    const onChangeTitleHandler = useCallback( (newValue:string) => {
        dispatch(updateTaskTitleAC(props.todolistId, props.id, newValue))
    }, [dispatch, props.todolistId, props.id])

    const removeTask = useCallback( ()=> { dispatch(removeTaskAC(props.todolistId, props.id)) }, [dispatch, props.todolistId, props.id] )

    return ( <ListItem key={props.id} className={props.isDone ? "is-done" : ""}>
                <Checkbox
                    edge="start"    
                    checked={props.isDone}
                    onChange={ onChangeStatusHandler }
                    tabIndex={-1}
                    disableRipple
                />
                <EditableSpan title={props.title} onChange={onChangeTitleHandler} className={props.isDone ? "is-done" : ""}/>
                <ListItemSecondaryAction>
                    <IconButton edge={"end"} color={"default"} onClick={removeTask}>
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
    )
})