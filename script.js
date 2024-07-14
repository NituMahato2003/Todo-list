const input = document.querySelector('input');
const notCompletedList = document.querySelector('.notCompleted');
const completedList = document.querySelector('.completed');

const btn = document.querySelector('.addTask > button');

btn.addEventListener('click', addList);
input.addEventListener('keyup', (e)=>{
    (e.keyCode === 13 ? addList(e) : null);
})


const savedNotCompletedTasks = JSON.parse(localStorage.getItem('notCompletedTasks')) || [];
const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];


savedNotCompletedTasks.forEach(task => appendTask(task, notCompletedList));
savedCompletedTasks.forEach(task => appendTask(task, completedList, true));

function addList() {
    const newTask = input.value.trim();
    if (newTask !== '') {
        appendTask(newTask, notCompletedList);
        saveTasks();
        input.value = '';
    }
}

function appendTask(task, targetList, completed = false) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    checkBtn.style.color = "white";
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    delBtn.style.color = "white";

    newLi.textContent = task;
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);

    checkBtn.addEventListener('click', function() {
        newLi.remove();
        completedList.appendChild(newLi);
        checkBtn.style.display = 'none';
        saveTasks();
    });

    delBtn.addEventListener('click', function() {
        newLi.remove();
        saveTasks();
    });

    if (completed) {
        completedList.appendChild(newLi);
        checkBtn.style.display = 'none';
    } else {
        targetList.appendChild(newLi);
    }
}

function saveTasks() {
    const notCompletedTasks = Array.from(notCompletedList.children).map(li => li.textContent);
    const completedTasks = Array.from(completedList.children).map(li => li.textContent);

    localStorage.setItem('notCompletedTasks', JSON.stringify(notCompletedTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}
