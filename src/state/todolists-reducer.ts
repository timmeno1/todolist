import {v1} from "uuid";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = "ADD-TODOLIST"
const UPDATE_TODOLIST_TITLE = "UPDATE-TODOLIST-TITLE"
const UPDATE_TODOLIST_FILTER = "UPDATE-TODOLIST-FILTER"

type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type RemoveTodolistActionType = {
    type : "REMOVE-TODOLIST"
    id :string
}
export type AddTodolistActionType = {
    type : "ADD-TODOLIST"
    title: string
    id: string
}
export type UpdateTodolistTitleActionType = {
    type : "UPDATE-TODOLIST-TITLE"
    id: string,
    title: string
}
export type UpdateTodolistFilterActionType = {
    type : "UPDATE-TODOLIST-FILTER"
    id: string,
    filter: FilterValuesType
}


type ActionType = RemoveTodolistActionType | AddTodolistActionType | UpdateTodolistTitleActionType | UpdateTodolistFilterActionType

const initialState: Array<TodolistType> = []

export const todoListReducer = (state:Array<TodolistType> = initialState, action:ActionType):Array<TodolistType>=>{
    switch(action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)

        case ADD_TODOLIST: {
                let todolist:TodolistType = {
                    id: action.id,
                    filter: "all",
                    title: action.title
                }
                return [
                    todolist,
                    ...state
                ]
        }

        case UPDATE_TODOLIST_TITLE: {
            let tl = state.find(tl => tl.id === action.id)
            if(tl) {
                tl.title = action.title
            }
            return [
                ...state
            ]
        }

        case UPDATE_TODOLIST_FILTER : {

            let stateCopy = state.map(tl => {
                if(tl.id === action.id){
                    tl.filter = action.filter
                }
                return tl
            })
            return [...stateCopy]

        }

        default :
            return state
    }
}

export const removeTodoListAC = (todolistId:string):RemoveTodolistActionType => {
    return {type: REMOVE_TODOLIST, id: todolistId}
}
export const addTodoListAC = (todolistTitle:string):AddTodolistActionType => {
    return {type: ADD_TODOLIST, title: todolistTitle, id: v1()}
}
export const updateTodoListTitleAC = (todolistId:string, title:string):UpdateTodolistTitleActionType => {
    return {type: UPDATE_TODOLIST_TITLE, id: todolistId, title: title}
}
export const updateTodoListFilterAC = (todolistId:string, filter: FilterValuesType):UpdateTodolistFilterActionType => {
    return {type: UPDATE_TODOLIST_FILTER, id: todolistId, filter: filter}
}