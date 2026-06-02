if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MemoPage_Params {
    memoList?: MemoItem[];
    nextId?: number;
    showInput?: boolean;
    inputTitle?: string;
    inputContent?: string;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Memo item data model.
 */
interface MemoItem {
    id: number;
    title: string;
    content: string;
    createTime: number;
}
export class MemoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__memoList = new ObservedPropertyObjectPU([], this, "memoList");
        this.nextId = 1;
        this.__showInput = new ObservedPropertySimplePU(false, this, "showInput");
        this.__inputTitle = new ObservedPropertySimplePU('', this, "inputTitle");
        this.__inputContent = new ObservedPropertySimplePU('', this, "inputContent");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MemoPage_Params) {
        if (params.memoList !== undefined) {
            this.memoList = params.memoList;
        }
        if (params.nextId !== undefined) {
            this.nextId = params.nextId;
        }
        if (params.showInput !== undefined) {
            this.showInput = params.showInput;
        }
        if (params.inputTitle !== undefined) {
            this.inputTitle = params.inputTitle;
        }
        if (params.inputContent !== undefined) {
            this.inputContent = params.inputContent;
        }
    }
    updateStateVars(params: MemoPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__memoList.purgeDependencyOnElmtId(rmElmtId);
        this.__showInput.purgeDependencyOnElmtId(rmElmtId);
        this.__inputTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__inputContent.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__memoList.aboutToBeDeleted();
        this.__showInput.aboutToBeDeleted();
        this.__inputTitle.aboutToBeDeleted();
        this.__inputContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __memoList: ObservedPropertyObjectPU<MemoItem[]>;
    get memoList() {
        return this.__memoList.get();
    }
    set memoList(newValue: MemoItem[]) {
        this.__memoList.set(newValue);
    }
    private nextId: number;
    private __showInput: ObservedPropertySimplePU<boolean>;
    get showInput() {
        return this.__showInput.get();
    }
    set showInput(newValue: boolean) {
        this.__showInput.set(newValue);
    }
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
    aboutToAppear(): void {
        // Initialize with empty list
        this.memoList = [];
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
            Text.create('备忘录');
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
            // Input area (conditionally shown)
            if (this.showInput) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 12, right: 12, top: 12, bottom: 12 });
                        Column.backgroundColor('#FFFFFF');
                        Column.margin({ left: 12, right: 12, top: 8 });
                        Column.borderRadius(12);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.inputTitle, placeholder: '请输入标题' });
                        TextInput.width('100%');
                        TextInput.height(40);
                        TextInput.fontSize(15);
                        TextInput.backgroundColor('#FFFFFF');
                        TextInput.borderRadius(8);
                        TextInput.padding({ left: 12, right: 12 });
                        TextInput.margin({ bottom: 8 });
                        TextInput.onChange((value: string) => {
                            this.inputTitle = value;
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextArea.create({ text: this.inputContent, placeholder: '请输入内容' });
                        TextArea.width('100%');
                        TextArea.height(100);
                        TextArea.fontSize(14);
                        TextArea.backgroundColor('#FFFFFF');
                        TextArea.borderRadius(8);
                        TextArea.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                        TextArea.onChange((value: string) => {
                            this.inputContent = value;
                        });
                    }, TextArea);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.fontSize(14);
                        Button.height(36);
                        Button.layoutWeight(1);
                        Button.backgroundColor('#999999');
                        Button.borderRadius(8);
                        Button.margin({ right: 8 });
                        Button.onClick(() => {
                            this.inputTitle = '';
                            this.inputContent = '';
                            this.showInput = false;
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('保存');
                        Button.fontSize(14);
                        Button.height(36);
                        Button.layoutWeight(1);
                        Button.backgroundColor('#007DFF');
                        Button.borderRadius(8);
                        Button.margin({ left: 8 });
                        Button.onClick(() => {
                            if (this.inputTitle.trim().length > 0) {
                                this.addMemo(this.inputTitle.trim(), this.inputContent.trim());
                                this.inputTitle = '';
                                this.inputContent = '';
                                this.showInput = false;
                            }
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            // Memo list
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Memo list
            if (this.memoList.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无备忘录');
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
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.width('100%');
                                        Column.padding({ left: 12, right: 12, top: 12, bottom: 12 });
                                        Column.backgroundColor('#FFFFFF');
                                        Column.borderRadius(12);
                                        Column.alignItems(HorizontalAlign.Start);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // Title row
                                        Row.create();
                                        // Title row
                                        Row.width('100%');
                                        // Title row
                                        Row.alignItems(VerticalAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.title);
                                        Text.fontSize(16);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.fontColor('#182431');
                                        Text.maxLines(1);
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                        Text.layoutWeight(1);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithLabel('删除');
                                        Button.fontSize(11);
                                        Button.height(28);
                                        Button.backgroundColor('#FA2A2D');
                                        Button.borderRadius(6);
                                        Button.padding({ left: 8, right: 8 });
                                        Button.onClick(() => {
                                            this.deleteMemo(item.id);
                                        });
                                    }, Button);
                                    Button.pop();
                                    // Title row
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        // Content preview
                                        if (item.content.length > 0) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(item.content);
                                                    Text.fontSize(13);
                                                    Text.fontColor('#666666');
                                                    Text.maxLines(2);
                                                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                                    Text.width('100%');
                                                    Text.margin({ top: 6 });
                                                }, Text);
                                                Text.pop();
                                            });
                                        }
                                        // Create time
                                        else {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // Create time
                                        Text.create(this.formatTime(item.createTime));
                                        // Create time
                                        Text.fontSize(11);
                                        // Create time
                                        Text.fontColor('#999999');
                                        // Create time
                                        Text.width('100%');
                                        // Create time
                                        Text.margin({ top: 8 });
                                    }, Text);
                                    // Create time
                                    Text.pop();
                                    Column.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.memoList, forEachItemGenFunction, (item: MemoItem) => item.id.toString(), false, false);
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
                this.showInput = true;
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
            Text.create('新建备忘录');
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Row.pop();
        // Bottom add button
        Button.pop();
        Column.pop();
    }
    /**
     * Add a new memo item.
     */
    addMemo(title: string, content: string): void {
        let newItem: MemoItem = {
            id: this.nextId++,
            title: title,
            content: content,
            createTime: Date.now()
        };
        this.memoList = [...this.memoList, newItem];
    }
    /**
     * Delete a memo item.
     */
    deleteMemo(id: number): void {
        this.memoList = this.memoList.filter((item: MemoItem) => item.id !== id);
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
    rerender() {
        this.updateDirtyElements();
    }
}
