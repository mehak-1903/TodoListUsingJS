const input = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const taskList = document.querySelector('.ul-container');

let tasks = [];

addBtn.addEventListener('click', () => {
    // Step1. Taking input text , and checking value is valid or not and input field is empty
    const taskText = input.value.trim();

    if(taskText !== ''){
        tasks.push({text: taskText, done: false});
        input.value = '';
    }

    showTask();
})

// Step2 : render values into ui
function showTask(){
    taskList.innerHTML = '';    // clear old list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        li.textContent = task.text;  // inserting task to the list

        // Step3. Adding deleting button and functionality into a list
        const deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash';

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);

            showTask();
        })

        // Step4: Done Task.

        const doneBtn = document.createElement('i');
        doneBtn.className = 'fas fa-check';
        doneBtn.style.marginLeft = '-15px';

        doneBtn.addEventListener('click', () => {

            tasks[index].done = !tasks[index].done;

            li.style.textDecoration = tasks[index].done ? 'line-through' : 'none';
        })

        // Step5: Edit Task

        const editTask = document.createElement('i');
        editTask.className = 'fas fa-pen';
        editTask.style.marginLeft = '-40px';

        editTask.addEventListener('click', () => {
            // Prompt user for new task text.
            const newText = prompt('Enter new Text here: ', task.text);

            // Ifthe new task text is not null and not an empty string, then update task to the list. 
            if(newText !== null && newText.trim() != ''){
                tasks[index].text = newText.trim();
            }

            showTask()
        })

        li.appendChild(editTask);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    })
}