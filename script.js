const color = document.querySelector("#color");
const html = document.documentElement
const body = document.querySelector("body")
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

