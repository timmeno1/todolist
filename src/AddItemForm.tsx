import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm = React.memo((props: addItemFormPropsType) => {

    const [error, setError] = useState<string | null>(null)
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const setNewTaskTitleHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if(error !== null) {
                setError(null)
            }
            setNewTaskTitle(e.currentTarget.value)
        },
        [error]
    )

    const setTask = useCallback(
        () => {
            if (newTaskTitle.trim() !== "") {
                props.addItem(newTaskTitle)
                setNewTaskTitle("")
            } else {
                setError("Title is required!")
            }
        },
        [props, newTaskTitle]
    )

    const onKeyPressHandler = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.charCode === 13) {
                setTask()
            }
        },
        [setTask]
    )

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
})