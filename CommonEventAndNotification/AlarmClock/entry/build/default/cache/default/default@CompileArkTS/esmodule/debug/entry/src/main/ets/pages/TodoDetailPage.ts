if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TodoDetailPage_Params {
    dataStore?: TodoDataStore;
    todoId?: number;
    todoItem?: TodoItem | undefined;
}
import router from "@ohos:router";
import { TodoDataStore } from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/TodoDataStore";
import type { TodoItem } from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/TodoDataStore";
class TodoDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dataStore = TodoDataStore.getInstance();
        this.todoId = 0;
        this.__todoItem = new ObservedPropertyObjectPU(undefined, this, "todoItem");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodoDetailPage_Params) {
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
        }
        if (params.todoId !== undefined) {
            this.todoId = params.todoId;
        }
        if (params.todoItem !== undefined) {
            this.todoItem = params.todoItem;
        }
    }
    updateStateVars(params: TodoDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__todoItem.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__todoItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dataStore: TodoDataStore;
    private todoId: number;
    private __todoItem: ObservedPropertyObjectPU<TodoItem | undefined>;
    get todoItem() {
        return this.__todoItem.get();
    }
    set todoItem(newValue: TodoItem | undefined) {
        this.__todoItem.set(newValue);
    }
    aboutToAppear(): void {
        let params = router.getParams() as Record<string, number>;
        if (params && params['todoId'] !== undefined) {
            this.todoId = params['todoId'];
            this.todoItem = this.dataStore.getTodoById(this.todoId);
        }
    }
    /**
     * Format timestamp to readable time string.
     */
    private formatTime(timestamp: number): string {
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hour = date.getHours().toString().padStart(2, '0');
        let minute = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title bar with back button
            Row.create();
            // Title bar with back button
            Row.width('100%');
            // Title bar with back button
            Row.height(56);
            // Title bar with back button
            Row.padding({ left: 12, right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor('#007DFF');
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待办详情');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#182431');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        // Title bar with back button
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.todoItem) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.borderRadius(16);
                        Column.backgroundColor('#FFFFFF');
                        Column.margin({ top: 16, left: 16, right: 16 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Title section
                        Column.create();
                        // Title section
                        Column.width('100%');
                        // Title section
                        Column.padding(16);
                        // Title section
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.todoItem.title);
                        Text.fontSize(20);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#182431');
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('创建时间：');
                        Text.fontSize(13);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.formatTime(this.todoItem.createTime));
                        Text.fontSize(13);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    // Title section
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.strokeWidth(1);
                        Divider.color('#E5E7EB');
                    }, Divider);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Content section
                        Column.create();
                        // Content section
                        Column.width('100%');
                        // Content section
                        Column.padding(16);
                        // Content section
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('内容');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.width('100%');
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.todoItem.content && this.todoItem.content.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.todoItem.content);
                                    Text.fontSize(15);
                                    Text.fontColor('#182431');
                                    Text.lineHeight(24);
                                    Text.width('100%');
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('暂无内容');
                                    Text.fontSize(15);
                                    Text.fontColor('#CCCCCC');
                                    Text.fontStyle(FontStyle.Italic);
                                    Text.width('100%');
                                }, Text);
                                Text.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    // Content section
                    Column.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('待办事项不存在');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 60 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TodoDetailPage";
    }
}
registerNamedRoute(() => new TodoDetailPage(undefined, {}), "", { bundleName: "com.huawei.alarmclock", moduleName: "entry", pagePath: "pages/TodoDetailPage", pageFullPath: "entry/src/main/ets/pages/TodoDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
