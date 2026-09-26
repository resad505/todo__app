const color = document.querySelector("#color");
const html = document.documentElement
const body = document.querySelector("body")
const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")
let savedTheme = localStorage.getItem("theme")

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
let todos = []
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const taskText = input.value.trim()
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
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
        const span = document.createElement("span")
        span.textContent = todo.text
        leftDiv.appendChild(checkBtn)
        leftDiv.appendChild(span)
        const deleteIcon = document.createElement("img")
        deleteIcon.src = "images/icon-cross.svg"
        deleteIcon.alt = "delete todo"
        deleteIcon.className = "cursor-pointer w-4 h-4"
        li.appendChild(leftDiv)
        li.appendChild(deleteIcon)
        ul.appendChild(li)
    })

}