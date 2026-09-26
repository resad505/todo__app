# Todo App - Feature-Driven Roadmap

This project is organized using a **Feature-Driven** workflow and **Conventional Commits** standards to build and ship in clean, incremental milestones.

---

## 1. Feature: Project Setup & Semantic Skeleton ✅
Set up base HTML skeleton and design tokens (fonts, colors, reset).

- [x] Configure "Josefin Sans" font and palette colors from `style-guide.md` in Tailwind theme.
- [x] Build complete semantic HTML structure (`<header>`, `<main>`, `<form>`, `<input>`, `<ul>` todo list container, filter panel, `<footer>`).
- [x] Ensure mobile & desktop responsive containers are set up.

---

## 2. Feature: Theme Switcher (Dark / Light Mode) ✅
Header section, theme toggle button, and visual theme transition logic.

- [x] Complete header layout (title and theme toggle button).
- [x] Configure theme-specific background images (`bg-desktop-dark`, `bg-desktop-light`, etc.).
- [x] Implement JavaScript theme toggle logic (`class` or `data-theme` switch).
- [x] Persist user theme preference in `localStorage`.

---

## 3. Feature: Create New Todo Item ✅
Allow users to type a new task and add it to the list.

- [x] Style the todo input card (circular checkbox placeholder, text input, hover states).
- [x] Initialize `todos` state array in JavaScript (`[{ id, text, completed }]`).
- [x] Handle form submission (Enter key) to append a new todo item.
- [x] Validate empty input entries (`trim()` check).
- [x] Render the updated list dynamically.

---

## 4. Feature: Toggle Completion & Delete Items
Mark todos as complete or remove them from the list.

- [ ] Style todo item rows (`<li>`) (strike-through text, gradient check icon, hover cross button).
- [ ] Toggle `completed` status (`true` / `false`) on item click.
- [ ] Delete item on cross ('X') button click (`filter` by id).
- [ ] Dynamically update the active items counter ("X items left").

---

## 5. Feature: Filtering & Clear Completed
Filter todos by active/completed status and clear completed items in batch.

- [ ] Implement filters for "All", "Active", and "Completed".
- [ ] Highlight the active filter button state.
- [ ] Implement "Clear Completed" button action.
- [ ] Adapt layout for mobile & desktop (separate mobile filter card).

---

## 6. Feature: Local Storage Persistence
Persist todo items across browser reloads.

- [ ] Sync the `todos` array with `localStorage` on any state update (`add`, `toggle`, `delete`, `clear`).
- [ ] Load and render saved todos on initial page load.

---

## 7. Feature (Bonus): Drag & Drop and Accessibility
Enhanced user experience and keyboard support.

- [ ] Implement drag and drop reordering with the HTML5 Drag and Drop API.
- [ ] Add accessible keyboard navigation (Tab order, focus rings, ARIA labels).
