import {v1} from "uuid";
import {AddTodolistActionType} from "./todolists-reducer";

export const REMOVE_TASK = "REMOVE-TASK"
export const ADD_TASK = "ADD-TASK"
export const UPDATE_TASK_TITLE = "UPDATE-TASK-TITLE"
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
const ADD_TODOLIST = "ADD-TODOLIST"

export type TaskType = {
    id : string,
    title : string,
    isDone : boolean
}

export type TaskStateType = {
    [key:string] : Array<TaskType>
}


export type RemoveTaskActionType = {
    type : "REMOVE-TASK",
    todolistId: string,
    taskId :string
}
export type AddTaskActionType = {
    type : "ADD-TASK",
    todolistId: string
    taskTitle :string
}
export type UpdateTaskTitleActionType = {
    type : "UPDATE-TASK-TITLE",
    todolistId: string,
    taskId :string,
    taskTitle :string
}
export type ChangeTaskStatusActionType = {
    type : "CHANGE-TASK-STATUS",
    todolistId: string,
    taskId :string,
    taskStatus :boolean
}


type ActionType = RemoveTaskActionType | AddTaskActionType | UpdateTaskTitleActionType | ChangeTaskStatusActionType |AddTodolistActionType

const initialState = {}

export const tasksReducer = (state:TaskStateType = initialState, action:ActionType):TaskStateType=>{
    switch(action.type) {
        case REMOVE_TASK:{
            let tasks = state[action.todolistId]
            let filteredTasks = tasks.filter(t => t.id !== action.taskId)
            state[action.todolistId] = filteredTasks
            return {...state}
        }

        case ADD_TASK: {
            let newTask = {
                id: v1(),
                title : action.taskTitle,
                isDone: false
            }
            return {...state,
                [action.todolistId] : [...state[action.todolistId], newTask]
            }
        }

        case UPDATE_TASK_TITLE: {
            
            let tasksCopy = state[action.todolistId].map(t => {
                if(t.id === action.taskId) {
                    return {...t, title : action.taskTitle}
                }
                return t
            })
            
            return {
                ...state,
                [action.todolistId] :[ ...tasksCopy ]
            }
        }

        case CHANGE_TASK_STATUS: {
            let tasksCopy = state[action.todolistId].map(t => {
                if(t.id === action.taskId) {
                    return {...t, isDone: action.taskStatus}
                }
                return t
            })
            
            return {
                ...state,
                [action.todolistId] :[ ...tasksCopy ]
            }
        }
        case ADD_TODOLIST: {
            const stateCopy = {...state}

            stateCopy[action.id] = []

            return stateCopy
        }

        default :
            return state
    }
}


export const removeTaskAC = (todolistId:string, taskId: string):RemoveTaskActionType => {
    return {type: REMOVE_TASK, todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (todolistId:string, newTasksTitle:string):AddTaskActionType => {
    return {type: ADD_TASK, todolistId: todolistId, taskTitle: newTasksTitle}
}

export const updateTaskTitleAC = (todolistId:string, taskId: string, title: string):UpdateTaskTitleActionType => {
    return {type: UPDATE_TASK_TITLE, todolistId: todolistId, taskId: taskId, taskTitle: title}
}

export const changeTaskStatusAC = (todolistId:string, taskId: string, isDone: boolean):ChangeTaskStatusActionType => {
    return {type: CHANGE_TASK_STATUS, todolistId: todolistId, taskId: taskId, taskStatus: isDone}
}