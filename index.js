// Step1: take elements and stored them in variable.
const input = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const taskList = document.querySelector('.ul-container');

// Step10: Modal
const help = document.getElementById('help');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName('close')[0];

// Step14: Tabs
const tabContent = document.querySelector('.tab-content');
const updateBtn = document.querySelector('.update-tablink');
let isTabLinksDoneVisible = false;  // variable for toggling content box will be visible or hidden.

// Step2: make an empty array, who can store the input values
let tasks = [];

// Step 8: saved task in the list even after reloading page

function savedTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));  // stores data in the browser's local storage.
}

const saveTask = localStorage.getItem('tasks'); // retrieves the saved tasks
if (saveTask) {
    // if value in localstorage is not valid, then json gives an error.
    // to fix this kinda errors we need to wrap the below code in try/catch block.
    try {

        const parsed = JSON.parse(saveTask); // Parse the string back into an array/object.
        // Always ensures tasks is an array.
        // if parsed value is actually an array(using Array.isArray(parsed))
        if (Array.isArray(parsed)) {
            tasks = parsed;
        }
    } catch (e) {
        console.log('Error parsing tasks from localStorage', e);
        tasks = [];
    }
    showTask()
}

// Step2: after making empty array, click on add button
addBtn.addEventListener('click', () => {
    // Step3. Taking input text , and checking value is valid or not and input field is empty
    const taskText = input.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, done: false });
        input.value = '';
    }

    showTask();
})

// Step4 : render values into ui
function showTask() {
    taskList.innerHTML = '';    // clear old list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        li.textContent = task.text;  // inserting task to the list
        // step9: after saving the task to localStorage (includes: done:true )
        li.style.textDecoration = task.done ? 'line-through' : 'none';

        // Step5. Adding deleting button and functionality into a list
        const deleteBtn = document.createElement('i');
        deleteBtn.className = 'fas fa-trash';

        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);

            savedTask();
            showTask();
        })

        // Step6: Done Task.

        const doneBtn = document.createElement('i');
        doneBtn.className = 'fas fa-check';
        doneBtn.style.marginLeft = '-15px';

        doneBtn.addEventListener('click', () => {

            tasks[index].done = !tasks[index].done;


            li.style.textDecoration = tasks[index].done ? 'line-through' : 'none';
            savedTask();
        })

        // Step7: Edit Task

        const editTask = document.createElement('i');
        editTask.className = 'fas fa-pen';
        editTask.style.marginLeft = '-40px';

        editTask.addEventListener('click', () => {
            // Prompt user for new task text.
            const newText = prompt('Enter new Text here: ', task.text);

            // If the new task text is not null and not an empty string, then update task to the list. 
            if (newText !== null && newText.trim() !== '') {
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

//Step11: Modal

//Step11: When user click on help button, modal box will be appeared.
help.addEventListener('click', () => {
    modal.style.display = 'block';
})

//Step12: Cross button
span.onclick = function () {
    modal.style.display = "none";
}

//Step13: If user click anywhere on the window the box will disapper.
window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}


// Step15: Tabs

// Step15: click on update button
updateBtn.addEventListener('click', () => {

    //toggle: when the value of content tab is true - tabList will be appeared otherwise it will be hidden.
    isTabLinksDoneVisible = !isTabLinksDoneVisible;

    //visible or hidden.
    tabContent.style.display = isTabLinksDoneVisible ? 'block' : 'none';

    //take all the headings from tabContent div
    const headings = tabContent.querySelectorAll('h3');

    //Assuming few colors of our choice.
    const possibleColors = ['blue', 'green', 'brown', 'orange', 'red'];

    //loop through on all the headings of h3 tags.
    headings.forEach(h => {
        // convert all the text into lowercase of h3 tag.
        const text = h.textContent.toLowerCase();

        // searching that if our h3 text color includes the possibleColor value then stored it in a variable.
        const matchedColors = possibleColors.find(color => text.includes(color));

        // if matched
        if (matchedColors) {
            h.style.color = matchedColors;
            if (!h.dataset.listenerAdded) {
                // when we click on heading text color, the background color of body will be changed.
            h.addEventListener('click', () => {
              document.body.style.backgroundColor = matchedColors;
              document.body.style.backgroundImage = 'none';
            });

            h.dataset.listenerAdded = 'true';
          }

        } else {
          h.style.color = 'black';
        }


    })
})


// ✅ PURPOSE:
// Hum kisi HTML element par event listener (jaise click listener) lagate hain.
// Lekin agar accidentally woh listener bar-bar add ho jaye,
// toh same event multiple times trigger hota hai (jo galat behavior hai).

// 🛡️ SOLUTION:
// Hum ek custom 'data-*' attribute (data-listener-added) use karte hain
// taake pata chal sake ki event listener pehle se add ho chuka hai ya nahi.

// 'h' ek DOM element hai jismein hum listener lagana chahte hain.
// Jaise: const h = document.getElementById("myDiv");

// if (!h.dataset.listenerAdded) {
    // Agar data-listener-added attribute nahi laga hai,
    // to iska matlab hai ke abhi tak listener add nahi hua.

    // h.addEventListener("click", () => {
    //     console.log("Element clicked!");
    // });

    // Ab hum 'data-listener-added' ko true set kar dete hain.
    // Taake future mein yeh block dobara na chale, aur listener repeat na ho.
    // h.dataset.listenerAdded = 'true';
// }