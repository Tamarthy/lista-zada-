{
    let tasks = [];
    let hideDoneTasks = false;

    // dlaczego ten render musi być cały czas tyle razy wywoływany?

    const renderUpButtons = () => {
        let htmlString = "";

        if (tasks.length > 0) {
            htmlString += `
         <button class="section__buttonStyle js-hideDoneButton">
         ${hideDoneTasks === false ? "Ukryj ukończone" : "Pokaż ukończone"}
         </button>
         <button class="section__buttonStyle js-allTasksDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
         Ukończ wszystkie</button>
         `
        }
        document.querySelector(".js-upButtons").innerHTML = htmlString;
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
        // nie rozumiem skąd tu tyle nawiasów i dla task i dalej dla mapowania
    };

    const bindUpEvents = () => {
        const allTasksDoneButton = document.querySelectorAll(".js-allTasksDoneButton");
        if (allTasksDoneButton) {
            allTasksDoneButton.addEventListener("click",
                markAllTasksDone);
        }
        render();

        const hideDoneButton = document.querySelectorAll(".js-hideDoneButton");
        if (hideDoneButton) {
            hideDoneButton.addEventListener("click",
                toggleHideDoneTasks);
        }
        render();
    }; // tu cóś jest do porpawy



    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleDoneButtons = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];
        render();
        // nie wiem czy render potrzebny
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleDoneButtons(index);
            });
        });
    }


    const renderTaskList = () => {
        // dlaczego tu poniżej tasks nie jest w nawiasie? czemu to nie jest f strzałkowa?
        const taskToHTML = task => `
                 <li class="taskList__item${task.done && hideDoneTasks ? "taskList__item--hidden" : ""} js-tasks">
                
                <button class="taskList__button js-done">${task.done ? "✓" : ""}</button>

                <span class="taskList__itemText${task.done ? " taskList__itemText--done" : ""}">${task.content}</span>

                <button class="taskList__button taskList__button--removed js-remove ">🗑</button>
                </li>
                `;

        const taskElement = document.querySelector(".js-tasks");
        taskElement.innerHTML = tasks.map(taskToHTML).join(""); // nie rozumiem tego
    };

    const render = () => {
        renderTaskList();
        bindEvents();

        renderUpButtons();
        bindUpEvents();
        // czy ta kolejność ma znaczenie? 
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskInput = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            newTaskInput.focus();
            return;
        }
        addNewTask(newTaskContent);

        newTaskInput.focus();
        newTaskInput.value = "";

        render();

    };


    const init = () => {

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}