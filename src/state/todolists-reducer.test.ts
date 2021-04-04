import {
    addTodoListAC,
    removeTodoListAC,
    todoListReducer,
    TodolistType, updateTodoListFilterAC,
    updateTodoListTitleAC
} from "./todolists-reducer";
import {v1} from "uuid";

test('correct todolist should be removed', ()=>{
    let todolist1 = v1(),
        todolist2 = v1()

    const startState: Array<TodolistType> =[
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})

test('correct todolist should be added', ()=>{
    let todolist1 = v1(),
        todolist2 = v1()

    const startState: Array<TodolistType> =[
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]


    const endState = todoListReducer(startState, addTodoListAC("kutak"))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("kutak")
})

test('title of correct todolist should be updated', ()=>{
    let todolist1 = v1(),
        todolist2 = v1()

    const startState: Array<TodolistType> =[
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]


    const endState = todoListReducer(startState, updateTodoListTitleAC(todolist2, "ura rabotaet update title"))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("ura rabotaet update title")
})

test('filter of correct todolist should be updated', ()=>{
    let todolist1 = v1(),
        todolist2 = v1()

    const startState: Array<TodolistType> =[
        {id: todolist1, title: "What to learn", filter: "all"},
        {id: todolist2, title: "What to buy", filter: "all"}
    ]


    const endState = todoListReducer(startState, updateTodoListFilterAC(todolist2, "active"))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe("active")
})
