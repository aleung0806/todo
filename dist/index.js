// import { compareAsc, format } from 'date-fns'

const taskFactory = (input) => {
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

    const display = () => {
        tasks.forEach((task) => {
            console.log(`${task.getName()}`);
        });
    };

    return {getName, setName, removeTask, addTask, getTask, getAllTasks, display};
};

const startPage = (() => {
    let projects = [];
    let displayedProjectName = 'default project';
    
    const addProject = name => projects.push(projectFactory(name)); 
    const removeProject = name => {
        const index = projects.findIndex(project => project.getName() === name);
        projects.splice(index, 1);
    };
    const initPage = () => {
        let defaultProject = projectFactory('default project');

        projects.push(projectFactory('default project'));

    };
    const getProject = (name) => projects.find(project => project.getName() === name);
    const getAllProjects = (input) => projects;   
    const getDisplayedProject = () => projects.find(project => project.getName() === displayedProjectName);

    return {addProject, removeProject, initPage, getProject, getAllProjects, getDisplayedProject};
});

function addAddListeners(page) {
    document.querySelector('#add-project-button').addEventListener('click', () => {
        
    });

    document.querySelector('#add-task-button').addEventListener('click', () => {

    });
}

function addProjectListeners() {
    let projects = document.querySelectorAll('.project-button');
  
    projects.forEach(project => project.addEventListener('click', (e) => {
        document.querySelector('#selected').id = '';
        e.target.id = 'selected';
    }));
}



function addTaskListeners(page) {
    let tasks = document.querySelectorAll('#task-button');
  
    tasks.forEach(task => task.addEventListener('click', (e) => {
        console.log("clicked");
        page.getDisplayedProject().removeTask(e.target.id);

    }));
}

function displayTasks(project){
    let tasks = project.getAllTasks();
    tasks.forEach((task) => {
        let div = document.createElement('div');
        div.innerHTML = 
        `<div class="task">
            <i class="far fa-circle" id="task-button"></i>
            <h5>${task.getName()}</h5> 
        </div>`;
        document.querySelector('#tasks').appendChild(div);
    });
}

function displayProjects(page){
    let projects = page.getAllProjects();
    projects.forEach((project) => {
        let div = document.createElement('div');
        div.innerHTML = `<button class="project-button" id="">${project.getName()}</button>`;
        document.querySelector('#project-list').appendChild(div);
    });
}



const page = startPage();
page.initPage();
console.log(page.getProject('default project').getName());
page.getProject('default project').addTask(taskFactory('make bed'));
page.getProject('default project').addTask(taskFactory('wash dishes'));
page.getProject('default project').addTask(taskFactory('do laundry'));
page.getProject('default project').getTask('make bed').setName('make all the beds');


displayTasks(page.getProject('default project'));
displayProjects(page);
addProjectListeners();
addTaskListeners(page);
addAddListeners();



