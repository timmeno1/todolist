import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange : (title:string)=>void
    className : string
}



export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode,setEditMode] = useState(false)
    let [value, setValue] = useState("")

    let activateEditMode = () => {
        setEditMode(true)
        setValue(props.title)
    }
    let activateViewMode = () => {
        setEditMode(false)
        props.onChange(value)
    }
    let onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)




    if(editMode) {
        return <TextField variant={"standard"} value={value} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
    } else {
        return <span onDoubleClick={activateEditMode}>{props.title}</span>
    }
}