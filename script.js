const color = document.querySelector("#color");
const html = document.documentElement
const body = document.querySelector("body")
const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")
const allFilter = document.querySelector("#all")
const activeFilter = document.querySelector("#activeTasks")
const completedFilter = document.querySelector("#completedTasks")
let savedTheme = localStorage.getItem("theme")
let currentFilter = "all"
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
    let filteredTodos = todos
    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed)
    }
    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed)
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li")
        li.className = "w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-purple-800 group"
        li.dataset.id = todo.id
        const leftDiv = document.createElement("div")
        leftDiv.className = "flex items-center gap-4"
        const checkBtn = document.createElement("button")
        checkBtn.className = "w-6 h-6 rounded-full border border-gray-300 dark:border-purple-800 flex items-center justify-center"
        checkBtn.dataset.action = "toggle"

        const span = document.createElement("span")
        span.textContent = todo.text
        if (todo.completed === true) {
            checkBtn.innerHTML = `<img class="w-2.5" src="images/icon-check.svg"></img>`
            checkBtn.classList.add("bg-gradient-to-br", "from-purple-500", "to-blue-500")
            span.classList.add("line-through", "text-gray-300", "dark:text-purple-600")
        }
        leftDiv.appendChild(checkBtn)
        leftDiv.appendChild(span)
        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("aria-label", "Delete todo")
        deleteBtn.className = "cursor-pointer opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
        deleteBtn.innerHTML = `<img class="w-4 h-4" src="images/icon-cross.svg">`
        deleteBtn.dataset.action = "delete"
        li.appendChild(leftDiv)
        li.appendChild(deleteBtn)
        ul.appendChild(li)
    })
    updateItems()
    hoverChange()
}
const itemsText = document.querySelector("#items__text")
ul.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]")
    if (!actionBtn) return
    const li = actionBtn.closest("li")
    const id = Number(li.dataset.id)
    const todosFind = todos.find(item => item.id === id)
    if (actionBtn.dataset.action === "toggle") {
        if (todosFind) {
            todosFind.completed = !todosFind.completed
        }
        renderTodos()
    }
    if (actionBtn.dataset.action === "delete") {
        todos = todos.filter(item => item.id !== id)
        renderTodos()
    }
})
function hoverChange() {
    activeFilter.classList.remove("text-blue-500")
    allFilter.classList.remove("text-blue-500")
    completedFilter.classList.remove("text-blue-500")
    if (currentFilter === "all") {
        allFilter.classList.add("text-blue-500")
    }
    if (currentFilter === "active") {
        activeFilter.classList.add("text-blue-500")
    }
    if (currentFilter === "completed") {
        completedFilter.classList.add("text-blue-500")
    }
}
function updateItems() {
    const itemsLeft = document.querySelector("#items__left")
    let count = todos.filter((item) => item.completed === false).length
    itemsLeft.textContent = count + " "
    itemsText.textContent = count === 1 ? "item left" : "items left"
}
clearComplatedBtn = document.querySelector("#clearCompletedBtn")
clearComplatedBtn.addEventListener("click", (e) => {
    todos = todos.filter((item) => item.completed === false)
    renderTodos()

})
allFilter.addEventListener("click", () => {
    currentFilter = "all"
    renderTodos()
})
activeFilter.addEventListener("click", () => {
    currentFilter = "active"
    renderTodos()
})
completedFilter.addEventListener("click", () => {
    currentFilter = "completed"
    renderTodos()
})
