if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TodoPage_Params {
    dataStore?: TodoDataStore;
    todoList?: TodoItem[];
    refreshTrigger?: number;
}
import router from "@ohos:router";
import { TodoDataStore } from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/TodoDataStore";
import type { TodoItem } from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/TodoDataStore";
export class TodoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dataStore = TodoDataStore.getInstance();
        this.__todoList = new ObservedPropertyObjectPU([], this, "todoList");
        this.__refreshTrigger = this.createStorageLink('todoRefreshTrigger', 0, "refreshTrigger");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("refreshTrigger", this.onTodoRefresh);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodoPage_Params) {
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
        }
        if (params.todoList !== undefined) {
            this.todoList = params.todoList;
        }
    }
    updateStateVars(params: TodoPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__todoList.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshTrigger.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__todoList.aboutToBeDeleted();
        this.__refreshTrigger.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dataStore: TodoDataStore;
    private __todoList: ObservedPropertyObjectPU<TodoItem[]>;
    get todoList() {
        return this.__todoList.get();
    }
    set todoList(newValue: TodoItem[]) {
        this.__todoList.set(newValue);
    }
    private __refreshTrigger: ObservedPropertyAbstractPU<number>;
    get refreshTrigger() {
        return this.__refreshTrigger.get();
    }
    set refreshTrigger(newValue: number) {
        this.__refreshTrigger.set(newValue);
    }
    aboutToAppear(): void {
        this.loadTodoList();
    }
    /**
     * Load todo list from shared data store.
     */
    private loadTodoList(): void {
        this.todoList = [...this.dataStore.todoList];
    }
    /**
     * Called when AppStorage refresh trigger changes (after adding from TodoAddPage).
     */
    onTodoRefresh(): void {
        if (this.refreshTrigger > 0) {
            this.loadTodoList();
        }
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title bar
            Row.create();
            // Title bar
            Row.width('100%');
            // Title bar
            Row.height(56);
            // Title bar
            Row.padding({ left: 24, right: 24 });
            // Title bar
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办事项');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#182431');
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        // Title bar
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Todo list
            if (this.todoList.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无待办事项');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 60 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 8 });
                        List.padding({ left: 12, right: 12, top: 8 });
                        List.layoutWeight(1);
                        List.listDirection(Axis.Vertical);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.onClick(() => {
                                        router.pushUrl({ url: 'pages/TodoDetailPage', params: { todoId: item.id } });
                                    });
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.height(56);
                                        Row.padding({ left: 12, right: 12 });
                                        Row.backgroundColor('#FFFFFF');
                                        Row.borderRadius(12);
                                        Row.alignItems(VerticalAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // Completion checkbox
                                        Checkbox.create({ name: 'todo_' + item.id, group: 'todoGroup' });
                                        // Completion checkbox
                                        Checkbox.select(item.isCompleted);
                                        // Completion checkbox
                                        Checkbox.selectedColor('#007DFF');
                                        // Completion checkbox
                                        Checkbox.width(24);
                                        // Completion checkbox
                                        Checkbox.height(24);
                                        // Completion checkbox
                                        Checkbox.onChange((value: boolean) => {
                                            this.dataStore.toggleTodo(item.id);
                                            this.loadTodoList();
                                        });
                                    }, Checkbox);
                                    // Completion checkbox
                                    Checkbox.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // Title (click to view detail)
                                        Text.create(item.title);
                                        // Title (click to view detail)
                                        Text.fontSize(15);
                                        // Title (click to view detail)
                                        Text.fontColor(item.isCompleted ? '#999999' : '#182431');
                                        // Title (click to view detail)
                                        Text.decoration({ type: item.isCompleted ? TextDecorationType.LineThrough : TextDecorationType.None });
                                        // Title (click to view detail)
                                        Text.maxLines(2);
                                        // Title (click to view detail)
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                        // Title (click to view detail)
                                        Text.layoutWeight(1);
                                        // Title (click to view detail)
                                        Text.margin({ left: 12, right: 12 });
                                    }, Text);
                                    // Title (click to view detail)
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // Right arrow indicator
                                        Text.create('›');
                                        // Right arrow indicator
                                        Text.fontSize(20);
                                        // Right arrow indicator
                                        Text.fontColor('#CCCCCC');
                                        // Right arrow indicator
                                        Text.margin({ right: 4 });
                                    }, Text);
                                    // Right arrow indicator
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // Delete button
                                        Button.createWithLabel('删除');
                                        // Delete button
                                        Button.fontSize(12);
                                        // Delete button
                                        Button.height(30);
                                        // Delete button
                                        Button.backgroundColor('#FA2A2D');
                                        // Delete button
                                        Button.borderRadius(8);
                                        // Delete button
                                        Button.onClick(() => {
                                            this.dataStore.deleteTodo(item.id);
                                            this.loadTodoList();
                                        });
                                    }, Button);
                                    // Delete button
                                    Button.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.todoList, forEachItemGenFunction, (item: TodoItem) => item.id.toString(), false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Bottom add button
            Button.createWithChild();
            // Bottom add button
            Button.width('100%');
            // Bottom add button
            Button.height(48);
            // Bottom add button
            Button.backgroundColor('#007DFF');
            // Bottom add button
            Button.borderRadius(12);
            // Bottom add button
            Button.margin({ left: 24, right: 24, bottom: 16, top: 8 });
            // Bottom add button
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/TodoAddPage' });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+');
            Text.fontSize(24);
            Text.fontColor('#FFFFFF');
            Text.margin({ right: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新建待办');
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        // Bottom add button
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
