import { DefaultTask, DeadlineTask, ResponsibleTask, LocationTask } from './models/Task.js';
import { saveTasks, loadTasks } from './utils/storage.js';
class TaskManager {
    constructor() {
        this.tasks = loadTasks();
        this.tasksContainer = document.getElementById('tasks-container');
        this.renderTasks();
        this.initListeners();
    }
    addTask(task) {
        this.tasks.push(task);
        this.save();
        this.renderTasks();
    }
    editTask(id, updatedFields) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updatedFields);
            this.save();
            this.renderTasks();
        }
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.renderTasks();
    }
    filterTasks(status, type) {
        return this.tasks.filter(task => (status ? task.status === status : true) &&
            (type ? task.type === type : true));
    }
    save() {
        saveTasks(this.tasks);
    }
    renderTasks() {
        if (this.tasks.length === 0) {
            this.tasksContainer.innerHTML = '<p>Задач нет.</p>';
            return;
        }
        this.tasksContainer.innerHTML = '';
        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Дата создания:</strong> ${task.createdAt.toLocaleDateString()}</p>
        <p><strong>Статус:</strong> ${task.status}</p>
        <p><strong>Тип:</strong> ${task.type}</p>
        <div class="actions">
          <button data-id="${task.id}" class="edit-btn">Редактировать</button>
          <button data-id="${task.id}" class="delete-btn">Удалить</button>
        </div>
      `;
            this.tasksContainer.appendChild(taskElement);
        });
        this.attachActionListeners();
    }
    attachActionListeners() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const task = this.tasks.find(t => t.id === id);
                if (task) {
                    const newTitle = prompt('Введите новый заголовок', task.title);
                    if (newTitle) {
                        this.editTask(id, { title: newTitle });
                    }
                }
            });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
                    this.deleteTask(id);
                }
            });
        });
    }
    initListeners() {
        const form = document.getElementById('task-form');
        const typeSelect = document.getElementById('task-type');
        const deadlineInput = document.getElementById('task-deadline');
        const responsibleInput = document.getElementById('task-responsible');
        const locationInput = document.getElementById('task-location');
        typeSelect.addEventListener('change', () => {
            const type = typeSelect.value;
            deadlineInput.style.display = type === 'deadline' ? 'block' : 'none';
            responsibleInput.style.display = type === 'responsible' ? 'block' : 'none';
            locationInput.style.display = type === 'location' ? 'block' : 'none';
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('task-title').value;
            const description = document.getElementById('task-description').value;
            const type = typeSelect.value;
            let task;
            if (type === 'deadline') {
                const deadline = new Date(deadlineInput.value);
                task = new DeadlineTask(title, description, deadline);
            }
            else if (type === 'responsible') {
                const responsible = responsibleInput.value;
                task = new ResponsibleTask(title, description, responsible);
            }
            else if (type === 'location') {
                const location = locationInput.value;
                task = new LocationTask(title, description, location);
            }
            else {
                task = new DefaultTask(title, description);
            }
            this.addTask(task);
            form.reset();
        });
        const statusFilter = document.getElementById('filter-status');
        const typeFilter = document.getElementById('filter-type');
        statusFilter.addEventListener('change', () => {
            const status = statusFilter.value || undefined;
            const type = typeFilter.value || undefined;
            const filteredTasks = this.filterTasks(status, type);
            this.renderFilteredTasks(filteredTasks);
        });
        typeFilter.addEventListener('change', () => {
            const status = statusFilter.value || undefined;
            const type = typeFilter.value || undefined;
            const filteredTasks = this.filterTasks(status, type);
            this.renderFilteredTasks(filteredTasks);
        });
    }
    renderFilteredTasks(tasks) {
        this.tasksContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Дата создания:</strong> ${task.createdAt.toLocaleDateString()}</p>
        <p><strong>Статус:</strong> ${task.status}</p>
        <p><strong>Тип:</strong> ${task.type}</p>
      `;
            this.tasksContainer.appendChild(taskElement);
        });
    }
}
new TaskManager();
