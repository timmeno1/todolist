import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange : (title:string)=>void
    className : string
}



export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    console.log('editable span')
    const [editMode,setEditMode] = useState(false)
    const [value, setValue] = useState("")

    const activateEditMode = useCallback(() => {
        setEditMode(true)
        setValue(props.title)
    }, [props.title])
    const activateViewMode = useCallback(() => {
        setEditMode(false)
        props.onChange(value)
    }, [props.onChange, value])

    const onChangeTitleHandler =  (e:ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)




    if(editMode) {
        return <TextField variant={"standard"} value={value} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
    } else {
        return <span onDoubleClick={activateEditMode}>{props.title}</span>
    }
})