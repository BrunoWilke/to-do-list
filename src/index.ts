import {v4 as uuidV4} from "uuid"

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#input-form")

type Task = {
    id:string
    title:string
    completed:boolean
    createdAt: Date
}
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e=>{
   e.preventDefault()
   
   if (input?.value == "" || input?.value == null) return

    const  newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    
    tasks.push(newTask)
    saveTasks()
    addListItem(newTask)
    input.value = ""

})

function addListItem(task: Task){
    const item = document.createElement("li");
    const label =  document.createElement("label");
    const checkbox =  document.createElement("input")
    checkbox.type= "checkbox"
    checkbox.checked = task.completed

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        console.log(tasks)
    })
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}

function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(){
    const taskJSON = localStorage.getItem("TASKS");
    if(taskJSON == null) return []
    return JSON.parse(taskJSON);
}