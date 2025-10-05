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
        
        li.textContent = task.text;  // li mei task dalre hai

        // Step3. Adding deleting button and functionality into a list
        const deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash';

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);

            showTask();
        })

        // Done Task.

        const doneBtn = document.createElement('i');
        doneBtn.className = 'fas fa-check';
        doneBtn.style.marginRight = '10px';

        doneBtn.addEventListener('click', () => {

            tasks[index].done = !tasks[index].done;

            li.style.textDecoration = tasks[index].done ? 'line-through' : 'none';
        })

        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    })
}