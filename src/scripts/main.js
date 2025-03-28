const todoName = document.querySelector('.js-todo-name-input');
const todoDiscription = document.querySelector('.js-todo-dis-input');
const todoAddBtn = document.querySelector('.js-todo-add-btn');

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];


function renderer(){
  let todoTasksHTML ='';
  
  todoList.forEach((task,i) => {
    todoTasksHTML+=
    `
    <div class="task-section">
      <input type="checkbox" class="todo-checkbox js-todo-checkbox" >
      <div>
        <p class="todo-task-name js-todo-task-name">${task.name}</p>
        <p class="todo-task-dis js-todo-task-dis" hidden>${task.discription}</p>
      </div>
      <button class="todo-delete-btn js-todo-delete-btn" data-task-id=${i}>Delete</button>
    </div>
    `

  })
  
  const eachTask = document.querySelector('.each-task')
  eachTask.innerHTML = todoTasksHTML


  // Task Delete Button
  
  document.querySelectorAll('.js-todo-delete-btn')
  .forEach(button=>{

    const taskId = button.dataset.taskId
    button.addEventListener('click',()=>{
      todoList.forEach((task,i) => {
        if(i === parseInt(taskId)){
          todoList.splice(i,1)
        }
      })
      localStorage.setItem('todoList',JSON.stringify(todoList))
      renderer()
    })
  })

  // Expands Discription of Tasks

  document.querySelectorAll('.todo-task-name')
  .forEach(task=>{
    task.addEventListener('click',()=>{
      task.nextElementSibling.toggleAttribute('hidden')
    })
  })

}
renderer()
// Add Task to todoList Array

todoAddBtn.addEventListener('click', () => {

  if(!todoName.value){
    return
  }else{
    todoList.push({
      name : todoName.value,
      discription : todoDiscription.value,
      state: false
    });
    todoName.value = "";
    todoDiscription.value ="";
  }

  localStorage.setItem('todoList',JSON.stringify(todoList))
  renderer()
})