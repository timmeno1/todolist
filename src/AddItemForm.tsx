import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={newTaskTitle}
                   onChange={setNewTaskTitleHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={setTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}