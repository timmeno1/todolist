import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskStateType = {
    [key:string] : Array<TaskType>
}

function App() {

    let todolistID1 = v1(),
        todolistID2 = v1();

    let [todolists, setTodolists]  = useState<Array<TodolistType>> ([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasksObj, setTasks] = useState<TaskStateType>({
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
        let todolist:TodolistType = {
            id: v1(),
            filter: "all",
            title: todoListTitle
        };
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    function removeTask(id: string, tlId: string) {
        let tasks = tasksObj[tlId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[tlId] = filteredTasks;
        setTasks({...tasksObj})
    }

    function addTask(title: string, tlId: string) {
        debugger;
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[tlId]
        let newTasks = [task, ...tasks]
        tasksObj[tlId] = newTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, tlId: string) {
        let todolist = todolists.find(tl => tl.id === tlId);
        if(todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(id: string, isDone: boolean, tlId:string) {
        let tasks = tasksObj[tlId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }
    function changeTaskTitle(id: string, newValue: string, tlId:string) {
        let tasks = tasksObj[tlId]
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.title = newValue
            setTasks({...tasksObj})
        }
    }

    function removeTodoList(tlId:string) {
        let filteredTL = todolists.filter( tl => tl.id !== tlId)
        setTodolists(filteredTL)

        delete tasksObj[tlId]
        setTasks({...tasksObj})
    }
    function changeTodoListTitle(tlId:string,title:string) {
        let todoList = todolists.find( tl => tl.id === tlId)
        if(todoList) {
            todoList.title = title;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
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
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
