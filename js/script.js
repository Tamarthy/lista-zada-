{
    let tasks = [];
    let hideDoneTasks = false;

    // dlaczego ten render musi być cały czas tyle razy wywoływany?

    const renderUpButtons = () => {
        let htmlString = "";

        if (tasks.length > 0) {
            htmlString += `
         <button class="section__buttonStyle js-hideDoneButton">
         ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
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
        // nie rozumiem skąd tu tyle nawiasów i dla task i dalej dla mapowania ???
        // odp: do task w map nie trzeba wyjątkowo drugiego nawiasu, bo jest tylko jeden parantetr. ale za arrow już trzeba żeby powstał dalej obiekt
    };

    const bindUpButtonsEvents = () => {
        const allTasksDoneButton = document.querySelector(".js-allTasksDoneButton");
        if (allTasksDoneButton) {
            allTasksDoneButton.addEventListener("click",
                markAllTasksDone);
        }


        const hideDoneButton = document.querySelector(".js-hideDoneButton");
        if (hideDoneButton) {
            hideDoneButton.addEventListener("click",
                toggleHideDoneTasks);
        }

    }; // usunięte tu render();, chociaż przy jednym zostawionym na końcu tej funkcji dlaej działa
    // usunięcie All z document.querySelector - ale nie rozumiem czemu to ma aż taki wpływ na działanie tych przycisków ???



    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];
        render();
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
        // nie wiem czy render potrzebny ???
        // odp: potrzebny. bo następuje tu zamiana i trzeba kod wygenerować na nowo
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
                 <li class="taskList__item${task.done && hideDoneTasks ? "taskList__item--hidden" : ""}">
                
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
        bindUpButtonsEvents();
        // czy ta kolejność ma znaczenie? 
        // odp: ma.
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