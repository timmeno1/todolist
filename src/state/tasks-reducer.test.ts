import {v1} from "uuid";
import {
    ADD_TASK, addTaskAC,
    CHANGE_TASK_STATUS, changeTaskStatusAC,
    REMOVE_TASK, removeTaskAC,
    tasksReducer,
    TaskStateType,
    UPDATE_TASK_TITLE, updateTaskTitleAC
} from "./tasks-reducer";
import {addTodoListAC} from "./todolists-reducer";


test("correct task should be deleted", ()=>{

    let todolistID1 = v1(),
        todolistID2 = v1();

    let tasksObj:TaskStateType = {
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
    }
    let taskId = tasksObj[todolistID1][1].id

    let endState = tasksReducer(tasksObj, removeTaskAC(todolistID1, taskId))

    expect(endState[todolistID1].length).toBe(4)
})


test("correct task should be added", ()=>{

    let todolistID1 = v1(),
        todolistID2 = v1(),
        todolistID3 = v1();

    let tasksObj:TaskStateType = {
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
    }
    let newTasksTitle = "newTask"


    let endState = tasksReducer(tasksObj, addTaskAC(todolistID1,newTasksTitle))

    expect(endState[todolistID1][5].title).toBe(newTasksTitle)
    expect(endState[todolistID1].length).toBe(6)
})


test("correct task title should be updated", ()=>{

    let todolistID1 = v1(),
        todolistID2 = v1()

    let tasksObj:TaskStateType = {
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
    }
    let task = tasksObj[todolistID1][2],
        newTaskTitle = "newTask"



    let endState = tasksReducer(tasksObj, updateTaskTitleAC(todolistID1, task.id, newTaskTitle))

    expect(endState[todolistID1][2].title).toBe(newTaskTitle)
})


test("correct task isDone should be changed", ()=>{

    let todolistID1 = v1(),
        todolistID2 = v1()

    let tasksObj:TaskStateType = {
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
    }
    let task = tasksObj[todolistID1][2];

    let endState = tasksReducer(tasksObj, changeTaskStatusAC(todolistID1,task.id, false))

    expect(endState[todolistID1][2].isDone).toBe(false)
    expect(endState[todolistID1][2].title).toBe("ReactJS")
    expect(endState[todolistID1].length).toBe(5)
    expect(endState[todolistID2].length).toBe(3)
})


test("new array should be added when todolist is added", ()=>{

    let todolistID1 = v1(),
        todolistID2 = v1()

    let tasksObj:TaskStateType = {
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
    }

    let newTodolist = addTodoListAC("new todolist")
    let endState = tasksReducer(tasksObj, newTodolist)

    let keys = Object.keys(endState)
    let newKey = keys.find(k => k !== todolistID1 && k !== todolistID2)
    if(!newKey) throw Error(" new key should be added")



    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
