const input = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const taskList = document.querySelector('.ul-container');
const help = document.getElementById('help');

let tasks = [];

// Step 6: saved task in the list even after reloading page

function savedTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));  // stores data in the browser's local storage.
}

const saveTask = localStorage.getItem('tasks'); // retrieves the saved tasks
if(saveTask){
    // if value in localstorage is not valid, then json gives an error.
    // to fix this kinda errors we need to wrap the below code in try/catch block.
    try{

        const parsed = JSON.parse(saveTask); // Parse the string back into an array/object.
        // Always ensures tasks is an array.
        // if parsed value is actually an array(using Array.isArray(parsed))
        if(Array.isArray(parsed)){
            tasks = parsed;
        }
    }catch(e){
        console.log('Error parsing tasks from localStorage', e);
        tasks = [];
    }
    showTask()
}

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
        // step7: after saving the task to localStorage (includes: done:true )
        li.style.textDecoration = task.done ? 'line-through' : 'none';

        // Step3. Adding deleting button and functionality into a list
        const deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash';

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);

            savedTask();
            showTask();
        })

        // Step4: Done Task.

        const doneBtn = document.createElement('i');
        doneBtn.className = 'fas fa-check';
        doneBtn.style.marginLeft = '-15px';

        doneBtn.addEventListener('click', () => {

            tasks[index].done = !tasks[index].done;

            
            li.style.textDecoration = tasks[index].done ? 'line-through' : 'none';
            savedTask();
        })

        // Step5: Edit Task

        const editTask = document.createElement('i');
        editTask.className = 'fas fa-pen';
        editTask.style.marginLeft = '-40px';

        editTask.addEventListener('click', () => {
            // Prompt user for new task text.
            const newText = prompt('Enter new Text here: ', task.text);

            // If the new task text is not null and not an empty string, then update task to the list. 
            if(newText !== null && newText.trim() !== ''){
                tasks[index].text = newText.trim();
            }

            savedTask();
            showTask();
        })

        li.appendChild(editTask);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    })
}

// Modal

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
}

help.addEventListener('click', () => {
    modal.style.display = 'block';
})