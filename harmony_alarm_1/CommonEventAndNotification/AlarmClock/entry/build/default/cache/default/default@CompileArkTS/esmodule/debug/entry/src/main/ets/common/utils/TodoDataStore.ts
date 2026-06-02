/**
 * Todo item data model.
 */
export interface TodoItem {
    id: number;
    title: string;
    content: string;
    isCompleted: boolean;
    createTime: number;
}
/**
 * Shared data store for Todo items.
 * Allows TodoPage, TodoAddPage and TodoDetailPage to share the same todo list.
 */
export class TodoDataStore {
    private static instance: TodoDataStore;
    public todoList: TodoItem[] = [];
    private nextId: number = 1;
    private constructor() {
    }
    public static getInstance(): TodoDataStore {
        if (!TodoDataStore.instance) {
            TodoDataStore.instance = new TodoDataStore();
        }
        return TodoDataStore.instance;
    }
    /**
     * Add a new todo item.
     */
    addTodo(title: string, content: string): void {
        let newItem: TodoItem = {
            id: this.nextId++,
            title: title,
            content: content,
            isCompleted: false,
            createTime: Date.now()
        };
        this.todoList = [...this.todoList, newItem];
    }
    /**
     * Get a todo item by id.
     */
    getTodoById(id: number): TodoItem | undefined {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id === id) {
                return this.todoList[i];
            }
        }
        return undefined;
    }
    /**
     * Toggle todo completion status.
     */
    toggleTodo(id: number): void {
        let newList: TodoItem[] = [];
        for (let i = 0; i < this.todoList.length; i++) {
            let item = this.todoList[i];
            if (item.id === id) {
                newList.push({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    isCompleted: !item.isCompleted,
                    createTime: item.createTime
                });
            }
            else {
                newList.push(item);
            }
        }
        this.todoList = newList;
    }
    /**
     * Delete a todo item.
     */
    deleteTodo(id: number): void {
        this.todoList = this.todoList.filter((item: TodoItem) => item.id !== id);
    }
}
