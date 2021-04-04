import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid} from "@material-ui/core";
import {
    addTodoListAC,
    removeTodoListAC,
    TodolistType,
    updateTodoListFilterAC,
    updateTodoListTitleAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)


    function addTodolist(todoListTitle:string){
        const action = addTodoListAC(todoListTitle)
        dispatch(action);
    }
    function removeTodoList(tlId:string) {
        dispatch(removeTodoListAC(tlId));
    }
    function changeTodoListTitle(tlId:string,title:string) {
        dispatch(updateTodoListTitleAC(tlId, title))
    }
    function changeFilter(value: FilterValuesType, tlId: string) {
        const action = updateTodoListFilterAC(tlId, value)
        dispatch(action)
    }


    return (
        <Container fixed>
            <Grid container spacing={6} style={{margin: "20px 0"}}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={6}>
            {
                todolists.map((tl) => {

                    return <Todolist
                        id={tl.id}
                        title={tl.title}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                })
            }
            </Grid>
        </Container>
    );
}

export default AppWithRedux;
