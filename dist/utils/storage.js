const STORAGE_KEY = "tasks";
export const saveTasks = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
export const loadTasks = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data)
        return [];
    try {
        const tasks = JSON.parse(data);
        return tasks.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
        }));
    }
    catch {
        return [];
    }
};
