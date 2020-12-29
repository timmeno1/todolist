import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Grid, IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm = (props: addItemFormPropsType) => {

    let [error, setError] = useState<string | null>(null)
    let [newTaskTitle, setNewTaskTitle] = useState("")

    const setNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setTask()
        }
    }
    const setTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Title is required!")
        }
    }

    return (
        <div>
                <TextField
                    value={newTaskTitle}
                    label={"Enter Title"}
                    variant={"outlined"}
                    onChange={setNewTaskTitleHandler}
                    onKeyPress={onKeyPressHandler}
                    error={!!error}
                    helperText={error}
                > </TextField>
                <IconButton edge={"end"} onClick={setTask} aria-label={"delete"} color={"primary"} >
                    <AddCircleOutline />
                </IconButton>
        </div>
    )
}