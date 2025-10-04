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

        taskList.appendChild(li);
    })
}