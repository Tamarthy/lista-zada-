{
    const tasks = [];

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            });
        });
        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
            render();
        });
    });
    }



const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
                <li class="taskList__item">
                
                <button class="taskList__button js-done">${task.done ? "✓" : ""}</button>

                <span class="taskList__itemText${task.done ? " taskList__itemText--done" : ""}">${task.content}</span>

                <button class="taskList__button taskList__button--removed js-remove">🗑</button>
                </li>
                `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
};
render();

const init = () => {

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskInput = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            newTaskInput.focus();
            return;
        }
        tasks.push({
            content: newTaskContent,
            done: false,
        })
        newTaskInput.focus();
        newTaskInput.value = "";
        render();
    });
}
init();
}