if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlarmList_Params {
    alarmItems?: Array<AlarmItem>;
}
interface AlarmListItem_Params {
    mainModel?: MainModel;
    alarmItem?: AlarmItem;
}
import router from "@ohos:router";
import MainModel from "@bundle:com.huawei.alarmclock/entry/ets/viewmodel/MainViewModel";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import AlarmItem from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/AlarmItemBean";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
interface MarginOptions {
    left?: number;
    top?: number;
}
function __Text__CommonTextAttr(fontSize: number, fontWeight: number, margin?: MarginOptions, opacity?: Resource): void {
    Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
    Text.fontSize(fontSize);
    Text.fontWeight(fontWeight);
    Text.margin(margin);
    Text.opacity(opacity);
}
class AlarmListItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.mainModel = MainModel.getInstant();
        this.alarmItem = new AlarmItem();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AlarmListItem_Params) {
        if (params.mainModel !== undefined) {
            this.mainModel = params.mainModel;
        }
        if (params.alarmItem !== undefined) {
            this.alarmItem = params.alarmItem;
        }
    }
    updateStateVars(params: AlarmListItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private mainModel: MainModel;
    private alarmItem: AlarmItem;
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({
                left: DimensionUtil.getVp({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            Row.width(CommonConstants.FULL_LENGTH);
            Row.height(DimensionUtil.getVp({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Row.backgroundColor(Color.White);
            Row.borderRadius(DimensionUtil.getVp({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_LENGTH);
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mainModel.getNoonContent(this.alarmItem.hour));
            __Text__CommonTextAttr(DimensionUtil.getFp({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }), FontWeight.Regular);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mainModel.getTaskTimeContent(this.alarmItem.hour, this.alarmItem.minute));
            __Text__CommonTextAttr(DimensionUtil.getFp({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }), FontWeight.Regular, { left: DimensionUtil.getVp({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) } as MarginOptions);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mainModel.getDescContent(this.alarmItem));
            __Text__CommonTextAttr(DimensionUtil.getFp({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }), FontWeight.Normal, { top: DimensionUtil.getVp({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) } as MarginOptions, { "id": 16777244, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.alarmItem.isOpen });
            Toggle.onChange((isOn: boolean) => {
                this.mainModel.openAlarm(this.alarmItem.id, isOn);
            });
            Toggle.width(DimensionUtil.getVp({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Toggle.height(DimensionUtil.getVp({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
        }, Toggle);
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export default class AlarmList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__alarmItems = new SynchedPropertyObjectTwoWayPU(params.alarmItems, this, "alarmItems");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AlarmList_Params) {
    }
    updateStateVars(params: AlarmList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__alarmItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__alarmItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __alarmItems: SynchedPropertySimpleOneWayPU<Array<AlarmItem>>;
    get alarmItems() {
        return this.__alarmItems.get();
    }
    set alarmItems(newValue: Array<AlarmItem>) {
        this.__alarmItems.set(newValue);
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: DimensionUtil.getVp({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
            List.padding({
                left: DimensionUtil.getVp({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            List.listDirection(Axis.Vertical);
            List.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
            List.margin({ top: DimensionUtil.getVp({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
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
                            router.pushUrl({ url: "pages/DetailIndex", params: { alarmItem: item } });
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new AlarmListItem(this, { alarmItem: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Main/AlarmList.ets", line: 89, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            alarmItem: item
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "AlarmListItem" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.alarmItems, forEachItemGenFunction, (item: AlarmItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
