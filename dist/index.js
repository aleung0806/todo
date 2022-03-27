// import { compareAsc, format } from 'date-fns'

const taskFactory = (input) => {
    console.log(`${input} created`);
    let name = input;
    let desc = '';
    let date = '';
    let priority = '';
    let done = false;

    const getName = () => name;
    const setName = (input) => name = input;

    const getDesc = () => desc;
    const setDesc = (input) => desc = input;

    const getDate = () => date;
    const setDate = (input) => date = input;

    const getPriority = () => priority;
    const setPriority = (input) => priority = input;

    return {getName, setName, getDesc, setDesc, getDate, setDate, getPriority, setPriority};
};

const projectFactory = (input) => {
    let name = input;
    let tasks = [];

    const getName = () => name;
    const setName = (input) => name = input;

    const addTask = (task) => tasks.push(task);
    const removeTask = (name) => {
        const index = tasks.findIndex(task => task.getName() === name);
        tasks.splice(index, 1);
    };

    const getTask = (input) => tasks.find(task => task.getName() === input);
    const getAllTasks = () => tasks;

    return {getName, setName, removeTask, addTask, getTask, getAllTasks};
};

const startPage = (() => {
    let projects = [];
    let doneProject;
    
    const addProject = project => projects.push(project); 
    const removeProject = name => {
        const index = projects.findIndex(project => project.getName() === name);
        projects.splice(index, 1);
    };
    const initPage = () => {
        let defaultProject = projectFactory('my project');
        doneProject = projectFactory('finished');
        projects.push(defaultProject);
        displayProjectTab(defaultProject);
        displayProject(defaultProject);
    };

    const getProject = (name) => projects.find(project => project.getName() === name);
    const getAllProjects = (input) => projects;   
    const addDone = (task) => doneProject.addTask(task);

    return {addProject, removeProject, initPage, getProject, getAllProjects, addDone};
});

function addAddListeners(page) {
    document.getElementById('add-project-button').addEventListener('click', () => {
        let form = document.getElementById('new-project-form');
        form.style.display = 'block';
        if (form.value){
            let project = projectFactory(form.value);
            page.addProject(project);
            displayProjectTab(project);
            form.value = '';
            form.style.display = 'none';
        }
    });

    document.getElementById('add-task-button').addEventListener('click', (e) => {
        let form = document.getElementById('new-task-form');
        form.style.display = 'block';
        if (form.value){
            let task = taskFactory(form.value);
            let displayedProject = document.getElementById('displayed-project').innerText;
            page.getProject(displayedProject).addTask(task);
            displayTask(task);
            form.value = '';
            form.style.display = 'none';
        }

    });
}

function displayTask(task){
    let div = document.createElement('div');
    let taskId = task.getName().replace(/\s/g, '-');
    div.innerHTML = 
    `<div class="task" id=${taskId}>
        <i class="far fa-circle" id="task-button"></i>
        <h5>${task.getName()}</h5> 
    </div>`;
    document.querySelector('#task-list').appendChild(div);

    document.getElementById(taskId).addEventListener('click', (e) => {
        let displayedProject = document.getElementById('displayed-project').innerText;
        let done = page.getProject(displayedProject).getTask(task.getName());
        page.getProject(displayedProject).removeTask(task.getName());
        page.addDone(done);
        displayDone(done);
        document.getElementById(`${taskId}`).remove();
        ding.play();

    });
}

function displayProjectTab(project){
    let div = document.createElement('div');
    let projectId = project.getName().replace(/\s/g, '-');

    div.innerHTML = `<button class="project-button" id="${projectId}">${project.getName()}</button>`;
    document.querySelector('#project-list').appendChild(div);
    
    document.getElementById(projectId).addEventListener('click', (e) => {
        displayProject(project);
    })
}


function displayProject(project){
    let selectedProject = document.querySelector(".project-button[value='selected']");
    if (selectedProject){
        selectedProject.value = 'unselected';    
    }

    let projectId = project.getName().replace(/\s/g, '-');
    document.querySelector(`#project-list #${projectId}`).value = 'selected';

    document.querySelector('#task-list').innerHTML = '';
    document.getElementById('displayed-project').innerText = project.getName();

    let tasks = project.getAllTasks();
    tasks.forEach(displayTask);
}

function displayDone(task){
    let div = document.createElement('div');
    div.innerHTML = 
    `<h5 class="done">${task.getName()}</h5>`;
    document.querySelector('#done-list').appendChild(div);
}

const ding = new Audio("/home/aleung/odin/todo/dist/ding.mp3");
const page = startPage();
page.initPage();
console.log(page.getProject('my project').getName());
let t1 = taskFactory('make bed');
let t2 = taskFactory('wash dishes');
let t3 = taskFactory('do laundry');

page.getProject('my project').addTask(t1);
page.getProject('my project').addTask(t2);
page.getProject('my project').addTask(t3);
page.getProject('my project').getTask('make bed');

displayProject(page.getProject('my project'));



addAddListeners(page);



