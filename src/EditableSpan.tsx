import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange : (title:string)=>void
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



    return editMode
        ? <input value={value} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}