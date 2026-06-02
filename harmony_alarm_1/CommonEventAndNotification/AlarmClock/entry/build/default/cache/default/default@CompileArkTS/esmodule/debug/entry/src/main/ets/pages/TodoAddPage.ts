if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TodoAddPage_Params {
    dataStore?: TodoDataStore;
    inputTitle?: string;
    inputContent?: string;
    refreshTrigger?: number;
}
import router from "@ohos:router";
import { TodoDataStore } from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/TodoDataStore";
class TodoAddPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dataStore = TodoDataStore.getInstance();
        this.__inputTitle = new ObservedPropertySimplePU('', this, "inputTitle");
        this.__inputContent = new ObservedPropertySimplePU('', this, "inputContent");
        this.__refreshTrigger = this.createStorageLink('todoRefreshTrigger', 0, "refreshTrigger");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodoAddPage_Params) {
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
        }
        if (params.inputTitle !== undefined) {
            this.inputTitle = params.inputTitle;
        }
        if (params.inputContent !== undefined) {
            this.inputContent = params.inputContent;
        }
    }
    updateStateVars(params: TodoAddPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__inputContent.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshTrigger.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputTitle.aboutToBeDeleted();
        this.__inputContent.aboutToBeDeleted();
        this.__refreshTrigger.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dataStore: TodoDataStore;
    private __inputTitle: ObservedPropertySimplePU<string>;
    get inputTitle() {
        return this.__inputTitle.get();
    }
    set inputTitle(newValue: string) {
        this.__inputTitle.set(newValue);
    }
    private __inputContent: ObservedPropertySimplePU<string>;
    get inputContent() {
        return this.__inputContent.get();
    }
    set inputContent(newValue: string) {
        this.__inputContent.set(newValue);
    }
    private __refreshTrigger: ObservedPropertyAbstractPU<number>;
    get refreshTrigger() {
        return this.__refreshTrigger.get();
    }
    set refreshTrigger(newValue: number) {
        this.__refreshTrigger.set(newValue);
    }
    /**
     * Navigate back without saving.
     */
    private goBack(): void {
        router.back();
    }
    /**
     * Save the todo item and navigate back.
     */
    private saveTodo(): void {
        if (this.inputTitle.trim().length > 0) {
            this.dataStore.addTodo(this.inputTitle.trim(), this.inputContent.trim());
            AppStorage.set('todoRefreshTrigger', Date.now());
            router.back();
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
                this.goBack();
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
            Text.create('新建待办');
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
            // Input area
            Column.create();
            // Input area
            Column.width('100%');
            // Input area
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title input
            Text.create('待办标题');
            // Title input
            Text.fontSize(14);
            // Title input
            Text.fontColor('#666666');
            // Title input
            Text.width('100%');
            // Title input
            Text.margin({ bottom: 8 });
        }, Text);
        // Title input
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.inputTitle, placeholder: '请输入待办事项标题' });
            TextInput.width('100%');
            TextInput.height(48);
            TextInput.fontSize(16);
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(12);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.border({ width: 1, color: '#E5E7EB' });
            TextInput.onChange((value: string) => {
                this.inputTitle = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Divider
            Divider.create();
            // Divider
            Divider.strokeWidth(1);
            // Divider
            Divider.color('#E5E7EB');
            // Divider
            Divider.margin({ top: 20, bottom: 20 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Content input
            Text.create('内容');
            // Content input
            Text.fontSize(14);
            // Content input
            Text.fontColor('#666666');
            // Content input
            Text.width('100%');
            // Content input
            Text.margin({ bottom: 8 });
        }, Text);
        // Content input
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ text: this.inputContent, placeholder: '请输入待办事项的具体内容（选填）' });
            TextArea.width('100%');
            TextArea.height(160);
            TextArea.fontSize(15);
            TextArea.backgroundColor('#FFFFFF');
            TextArea.borderRadius(12);
            TextArea.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            TextArea.border({ width: 1, color: '#E5E7EB' });
            TextArea.onChange((value: string) => {
                this.inputContent = value;
            });
        }, TextArea);
        // Input area
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Bottom buttons
            Row.create();
            // Bottom buttons
            Row.width('100%');
            // Bottom buttons
            Row.padding({ left: 16, right: 16, bottom: 24 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize(16);
            Button.fontColor('#666666');
            Button.layoutWeight(1);
            Button.height(48);
            Button.backgroundColor('#F1F3F5');
            Button.borderRadius(12);
            Button.margin({ right: 8 });
            Button.onClick(() => {
                this.goBack();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('保存');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.layoutWeight(2);
            Button.height(48);
            Button.backgroundColor(this.inputTitle.trim().length > 0 ? '#007DFF' : '#B0C4DE');
            Button.borderRadius(12);
            Button.margin({ left: 8 });
            Button.enabled(this.inputTitle.trim().length > 0);
            Button.onClick(() => {
                this.saveTodo();
            });
        }, Button);
        Button.pop();
        // Bottom buttons
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TodoAddPage";
    }
}
registerNamedRoute(() => new TodoAddPage(undefined, {}), "", { bundleName: "com.huawei.alarmclock", moduleName: "entry", pagePath: "pages/TodoAddPage", pageFullPath: "entry/src/main/ets/pages/TodoAddPage", integratedHsp: "false", moduleType: "followWithHap" });
