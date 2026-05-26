if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlarmList_Params {
    alarmItems?: Array<AlarmItem>;
}
import router from "@ohos:router";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/CommonConstants";
import type AlarmItem from '../../common/bean/AlarmItemBean';
import AlarmListItem from "@bundle:com.huawei.alarmclock/entry/ets/view/Main/AlarmListItem";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
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
            List.create({ space: DimensionUtil.getVp({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
            List.padding({
                left: DimensionUtil.getVp({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            List.listDirection(Axis.Vertical);
            List.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
            List.margin({ top: DimensionUtil.getVp({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
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
                                    let componentCall = new AlarmListItem(this, { alarmItem: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Main/AlarmList.ets", line: 30, col: 11 });
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
