
import {
    tasksReducer,
    TaskStateType,
} from "./tasks-reducer";
import {addTodoListAC, todoListReducer, TodolistType} from "./todolists-reducer";


test("ids should be equal", ()=>{

    let startTaskState:TaskStateType = {}
    let startTodolistState:Array<TodolistType> = []

    let newTitle = " noviy suka todolist"
    let action = addTodoListAC(newTitle)

    let endTaskState = tasksReducer(startTaskState, action)
    let endTodolistState = todoListReducer(startTodolistState, action)
    let keys = Object.keys(endTaskState)
    let idFromTask = keys[0]
    let idFromTodolist = endTodolistState[0].id


    expect(idFromTask).toEqual(idFromTodolist)
    expect(endTaskState[idFromTask]).toEqual([])
})

