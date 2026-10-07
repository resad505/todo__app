const color = document.querySelector("#color");
const html = document.documentElement
const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")
const allFilter = document.querySelector("#all")
const activeFilter = document.querySelector("#activeTasks")
const completedFilter = document.querySelector("#completedTasks")
const clearCompletedBtn = document.querySelector("#clearCompletedBtn")
const itemsText = document.querySelector("#items__text")
const itemsLeft = document.querySelector("#items__left")
const todoTemplate = document.querySelector("#todo-template")
let savedTheme = localStorage.getItem("theme")
let currentFilter = "all"
let todos = []
let draggedId = null
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("todos")
    if (saved) {
        todos = JSON.parse(saved)
        renderTodos()
    }
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
        saveTodos()
        renderTodos()
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
        const clone = todoTemplate.content.cloneNode(true)
        const li = clone.querySelector("li")
        li.dataset.id = todo.id
        const checkBtn = clone.querySelector('[data-action="toggle"]')
        checkBtn.ariaLabel = todo.completed ? "Mark as incomplete" : "Mark as complete"
        const span = clone.querySelector(".todo-text")
        checkBtn.ariaChecked = todo.completed ? "true" : "false"
        span.textContent = todo.text
        if (todo.completed) {
            checkBtn.innerHTML = `<img class="w-2.5" src="images/icon-check.svg"></img>`
            checkBtn.classList.add("bg-gradient-to-br", "from-purple-500", "to-blue-500")
            span.classList.add("line-through", "text-gray-300", "dark:text-purple-600")
        }
        ul.appendChild(clone)
    })
    updateItems()
    updateActiveFilter()
}
ul.addEventListener("dragstart", (e) => {
    const li = e.target.closest("li")
    if (!li) return
    draggedId = Number(li.dataset.id)
    li.classList.add("opacity-50")
})
ul.addEventListener("dragover", (e) => {
    e.preventDefault()
})
ul.addEventListener("dragend", (e) => {
    const li = e.target.closest("li")
    li?.classList.remove("opacity-50")
    draggedId = null
})
ul.addEventListener("drop", (e) => {
    e.preventDefault()
    const targetLi = e.target.closest("li")
    if (!targetLi) return
    const targetId = Number(targetLi.dataset.id)
    if (draggedId === targetId) return

    const fromIndex = todos.findIndex(item => item.id === draggedId)
    const toIndex = todos.findIndex(item => item.id === targetId)
    if (fromIndex !== -1 && toIndex !== -1) {
        const [movedItem] = todos.splice(fromIndex, 1)
        todos.splice(toIndex, 0, movedItem)
        saveTodos()
        renderTodos()
    }

})
ul.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]")
    if (!actionBtn) return
    const li = actionBtn.closest("li")
    const id = Number(li.dataset.id)
    const targetTodo = todos.find(item => item.id === id)
    if (actionBtn.dataset.action === "toggle") {
        if (targetTodo) {
            targetTodo.completed = !targetTodo.completed
        }
        saveTodos()
        renderTodos()
    }
    if (actionBtn.dataset.action === "delete") {
        const nextLi = li.nextElementSibling || li.previousElementSibling
        const targetId = nextLi ? Number(nextLi.dataset.id) : null
        todos = todos.filter(item => item.id !== id)
        saveTodos()
        renderTodos()
        if (targetId) {
            const newTargetLi = ul.querySelector(`li[data-id="${targetId}"]`)
            const nextDeleteBtn = newTargetLi?.querySelector('[data-action="delete"]')
            nextDeleteBtn?.focus()
        } else {
            input.focus()
        }
    }
})
function updateActiveFilter() {
    activeFilter.classList.remove("text-blue-500")
    allFilter.classList.remove("text-blue-500")
    completedFilter.classList.remove("text-blue-500")
    if (currentFilter === "all") {
        allFilter.classList.add("text-blue-500")
    } else if (currentFilter === "active") {
        activeFilter.classList.add("text-blue-500")
    } else if (currentFilter === "completed") {
        completedFilter.classList.add("text-blue-500")
    }
}
function updateItems() {
    let count = todos.filter((item) => item.completed === false).length
    itemsLeft.textContent = count
    itemsText.textContent = count === 1 ? " item left" : " items left"
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
}
clearCompletedBtn.addEventListener("click", (e) => {
    todos = todos.filter((item) => item.completed === false)
    saveTodos()
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
