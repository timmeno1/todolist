import React, {useReducer} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {Container, Grid} from "@material-ui/core";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./state/tasks-reducer";
import {
    addTodoListAC,
    removeTodoListAC,
    todoListReducer,
    updateTodoListFilterAC,
    updateTodoListTitleAC
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducers() {

    let todolistID1 = v1(),
        todolistID2 = v1();

    let [todolists, dispatchToTodolistsReducer]  = useReducer (todoListReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Apple", isDone: true},
            {id: v1(), title: "Wanderlust Lite", isDone: false}
        ]
    })

    function addTodolist(todoListTitle:string){
        const action = addTodoListAC(todoListTitle)
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }
    function removeTodoList(tlId:string) {
        dispatchToTodolistsReducer(removeTodoListAC(tlId));
    }
    function changeTodoListTitle(tlId:string,title:string) {
        dispatchToTodolistsReducer(updateTodoListTitleAC(tlId, title))
    }
    function changeFilter(value: FilterValuesType, tlId: string) {
        const action = updateTodoListFilterAC(tlId, value)
        dispatchToTodolistsReducer(action)
    }

    function removeTask(id: string, tlId: string) {
        dispatchToTasksReducer(removeTaskAC(tlId,id))
    }
    function addTask(title: string, tlId: string) {
        dispatchToTasksReducer(addTaskAC(tlId, title))
    }
    function changeStatus(id: string, isDone: boolean, tlId:string) {
        dispatchToTasksReducer(changeTaskStatusAC(tlId, id, isDone))
    }
    function changeTaskTitle(id: string, newValue: string, tlId:string) {
        dispatchToTasksReducer(updateTaskTitleAC(tlId, id, newValue))
    }


    return (
        <Container fixed>
            <Grid container spacing={6} style={{margin: "20px 0"}}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={6}>
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        id={tl.id}
                        title={tl.title}
                        // tasks={tasksForTodolist}
                        // removeTask={removeTask}
                        changeFilter={changeFilter}
                        // addTask={addTask}
                        // changeStatus={changeStatus}
                        // changeTaskTitle={changeTaskTitle}
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

export default AppWithReducers;
