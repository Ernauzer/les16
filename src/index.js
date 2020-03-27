const input = document.querySelector('input');
const form = document.querySelector('form');
const noteList = document.querySelector('ul');
let value = '';


function renderTask(taskObject) {
    // Создание елементов \\
    const taskItem = document.createElement('li');
    const taskItemContent = document.createElement('span');
    const taskItemBtnComplete = document.createElement('button');
    const taskItemBtnRemove = document.createElement('button');
    const taskItemBtnEdit = document.createElement('button');
    // Добавили класс \\
    taskItem.classList.add('note-list__item');
    taskItemContent.classList.add('notes');
    taskItemBtnComplete.classList.add('complete');
    taskItemBtnRemove.classList.add('remove');
    taskItemBtnEdit.classList.add('edit');
    // Добавили текст \\
    taskItemContent.innerText = taskObject.value;
    // Добавили к родителю \\
    taskItem.prepend(taskItemContent);
    taskItem.append(taskItemBtnComplete);
    taskItem.append(taskItemBtnRemove);
    taskItem.append(taskItemBtnEdit);
    // Добавили атрибут taskItem(li) \\
    taskItem.setAttribute('data-id',taskObject.id);
    // Проверка \\
    if (taskObject.completed) {
        taskItem.classList.add('note-list__item--completed');
    }
    return taskItem;
}
function editTask(editTaskObject) {
    const taskItem = document.querySelector('.note-list__item');
    const taskItemEditSave = document.createElement('button');
    const taskItemEditCancel = document.createElement('button');
    taskItem.innerHTML = '<input type = text  class = text_edit >';
    const textEdit = document.querySelector('.text_edit');
    taskItem.classList.add('note-list__item');
    taskItemEditSave.classList.add('save');
    taskItemEditCancel.classList.add('cancel');

    // Добавили текст \\
    // taskItemContent.innerText = editTaskObject.value;
    taskItemEditCancel.innerText = 'Cancel';
    taskItemEditSave.innerText = 'Save';
    // Добавили к родителю \\
    taskItem.append(taskItemEditSave);
    taskItem.append(taskItemEditCancel);
    //\\
    textEdit.value = value;
    // Ф-кция удаления потомков при нажатии на Edit \\
    function delChild (child) {
        for (let i = 0; i < child.length; i++) {

            switch (child[i].className) {
            case 'complete':
                child[i].style.display = 'none';
                break;
            case 'remove':
                child[i].style.display = 'none';
                break;
            case 'edit':
                child[i].style.display = 'none';
                break;
            case 'notes':
                child[i].style.display = 'none';
                break;
            }
        }
    }
    delChild(taskItem.children);
    return taskItem;
}

// Массив обьектов списка дел \\
let taskList = [];
// Событие клик на форму \\
form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value.trim()) {
        const task = {
            value: input.value,
            completed: false,
            id: String(new Date).slice(16,24).replace(/:/g,''),
        };
        // Добавили обьект(ы) в массив \\
        taskList.unshift(task);
        // Добавили ul вызов функции с агрументом обьекта \\
        noteList.prepend(renderTask(task));
        input.value = '';
    }
});

// Событие клик на кнопки \\
noteList.addEventListener('click', e => {
    const element = e.target;
    const targetClassName = e.target.className;
    let currentId;
    let inpEdit = noteList.querySelector('.text_edit');
    
    // let editValue = target.parent;
    if (targetClassName === 'remove' || targetClassName === 'complete'|| targetClassName === 'edit' || targetClassName === 'save') {
        currentId = element.closest('.note-list__item').getAttribute('data-id');
    }
    switch (targetClassName) {
    case 'remove':
        noteList.innerHTML = '';
        //Перезаписали масив = останутся те что не совпадают currentId \\
        taskList = taskList.filter(task => task.id !== currentId);
        // Добавили вызов ф-кции с обьектом заметки \\
        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });
        break;

    case 'complete':
        // Если id совпадает то completed = true (выполнено) \\
        taskList.find(task => task.id === currentId).completed = true;

        noteList.innerHTML = '';

        // Добавили вызов ф-кции с обьектом заметки \\
        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });
        break;

    case 'edit':
        taskList.forEach(task => {
            
            value = taskList.find(task => task.id === currentId).value;

            noteList.prepend(editTask(task)); 
            console.log(task);

        });
        
        break;
    case 'save':
        taskList.forEach(task => {
                
            if (task.id === currentId) {
                noteList.innerHTML = '';
                task.value = inpEdit.value;
                noteList.append(renderTask(task));
                
            }
            
        }
    )}
});