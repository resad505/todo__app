const color = document.querySelector("#color");
const html = document.documentElement
const body = document.querySelector("body")
const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")
let savedTheme = localStorage.getItem("theme")
let todos = []
document.addEventListener("DOMContentLoaded", () => {
    if (savedTheme === "dark" || !savedTheme) {
        html.classList.add("dark")
    } else { html.classList.remove("dark") }
})
color.addEventListener("click", changeColor)
function changeColor() {
    html.classList.toggle("dark")
    const isDark = html.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const taskText = input.value.trim()
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            filter: "all"
        }
        todos.push(newTask)
        input.value = ""
        renderTodos()
    } else {
        return
    }
})
function renderTodos() {
    ul.innerHTML = ""
    todos.forEach(todo => {
        const li = document.createElement("li")
        li.className = "w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-purple-800"
        li.dataset.id = todo.id
        const leftDiv = document.createElement("div")
        leftDiv.className = "flex items-center gap-4"
        const checkBtn = document.createElement("button")
        checkBtn.className = "w-6 h-6 rounded-full border border-gray-300 dark:border-purple-800 flex items-center justify-center"
        checkBtn.addEventListener("click", () => {
            if (todo.completed == true) {
                todo.completed = false
                checkBtn.classList.remove("bg-gradient-to-br", "from-purple-500", "to-blue-500")
                span.classList.remove("line-through")
                checkBtn.innerHTML = ``

            } else {
                todo.completed = true
                checkBtn.innerHTML = `<img class="w-2.5" src="images/icon-check.svg"></img>`
                checkBtn.classList.add("bg-gradient-to-br", "from-purple-500", "to-blue-500")
                span.classList.add("line-through")
            }
            updateItems()
        })
        const span = document.createElement("span")
        span.textContent = todo.text
        if (todo.completed === true) {
            checkBtn.innerHTML = `<img class="w-2.5" src="images/icon-check.svg"></img>`
            checkBtn.classList.add("bg-gradient-to-br", "from-purple-500", "to-blue-500")
            span.classList.add("line-through")
        }
        leftDiv.appendChild(checkBtn)
        leftDiv.appendChild(span)
        const deleteIcon = document.createElement("img")
        deleteIcon.src = "images/icon-cross.svg"
        deleteIcon.alt = "delete todo"
        deleteIcon.className = "cursor-pointer w-4 h-4"
        deleteIcon.addEventListener("click", () => {
            li.remove()
            todos = todos.filter(task => task.id !== todo.id)
            updateItems()
        })

        li.appendChild(leftDiv)
        li.appendChild(deleteIcon)
        ul.appendChild(li)
    })
    updateItems()
}
function updateItems() {
    const itemsLeft = document.querySelector("#items__left")
    let count = todos.filter((item) => item.completed === false).length
    itemsLeft.textContent = count + " "
}
const allFilter = document.querySelector("#all")
const activeFilter = document.querySelector("#activeTasks")
const completedFilter = document.querySelector("#completedTasks")
allFilter.addEventListener("click", () => {
    filter = "all"
    renderTodos()
})
activeFilter.addEventListener("click", () => {
    filter = "active"
    renderTodos()
})
completedFilter.addEventListener("click", () => {
    filter = "completed"
    renderTodos()
})
