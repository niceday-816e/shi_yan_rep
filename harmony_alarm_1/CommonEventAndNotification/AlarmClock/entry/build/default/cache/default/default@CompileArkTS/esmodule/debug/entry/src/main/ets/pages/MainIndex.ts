if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainIndex_Params {
    mainModel?: MainModel;
    alarmItems?: Array<AlarmItem>;
    isAuth?: boolean;
}
import router from "@ohos:router";
import { CommonConstants, MainConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../common/bean/AlarmItemBean';
import MainModel from "@bundle:com.huawei.alarmclock/entry/ets/viewmodel/MainViewModel";
import ClockArea from "@bundle:com.huawei.alarmclock/entry/ets/view/Main/ClockArea";
import AlarmList from "@bundle:com.huawei.alarmclock/entry/ets/view/Main/AlarmList";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
class MainIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.mainModel = MainModel.getInstant();
        this.__alarmItems = new ObservedPropertyObjectPU(new Array(), this, "alarmItems");
        this.__isAuth = new ObservedPropertySimplePU(false, this, "isAuth");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainIndex_Params) {
        if (params.mainModel !== undefined) {
            this.mainModel = params.mainModel;
        }
        if (params.alarmItems !== undefined) {
            this.alarmItems = params.alarmItems;
        }
        if (params.isAuth !== undefined) {
            this.isAuth = params.isAuth;
        }
    }
    updateStateVars(params: MainIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__alarmItems.purgeDependencyOnElmtId(rmElmtId);
        this.__isAuth.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__alarmItems.aboutToBeDeleted();
        this.__isAuth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private mainModel: MainModel;
    private __alarmItems: ObservedPropertyObjectPU<Array<AlarmItem>>;
    get alarmItems() {
        return this.__alarmItems.get();
    }
    set alarmItems(newValue: Array<AlarmItem>) {
        this.__alarmItems.set(newValue);
    }
    private __isAuth: ObservedPropertySimplePU<boolean>;
    get isAuth() {
        return this.__isAuth.get();
    }
    set isAuth(newValue: boolean) {
        this.__isAuth.set(newValue);
    }
    aboutToAppear(): void {
        this.mainModel.queryAlarmsTasker((alarms: Array<AlarmItem>) => {
            this.alarmItems = alarms;
        });
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_LENGTH);
            Column.height(CommonConstants.FULL_LENGTH);
            Column.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(MainConstant.DEFAULT_STRING_ALARM);
            Text.height(DimensionUtil.getVp({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Text.textAlign(TextAlign.Start);
            Text.fontSize(DimensionUtil.getFp({ "id": 16777292, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Text.width(CommonConstants.FULL_LENGTH);
            Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: DimensionUtil.getVp({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
            Text.padding({ left: DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ClockArea(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainIndex.ets", line: 49, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ClockArea" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AlarmList(this, { alarmItems: this.__alarmItems }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainIndex.ets", line: 51, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            alarmItems: this.alarmItems
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "AlarmList" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.backgroundColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Button.width(DimensionUtil.getVp({ "id": 16777276, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.height(DimensionUtil.getVp({ "id": 16777276, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.margin({
                bottom: DimensionUtil.getVp({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                top: DimensionUtil.getVp({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            Button.onClick(() => {
                router.pushUrl({ url: "pages/DetailIndex" });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777296, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Image.objectFit(ImageFit.Fill);
        }, Image);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainIndex";
    }
}
registerNamedRoute(() => new MainIndex(undefined, {}), "", { bundleName: "com.huawei.alarmclock", moduleName: "entry", pagePath: "pages/MainIndex", pageFullPath: "entry/src/main/ets/pages/MainIndex", integratedHsp: "false", moduleType: "followWithHap" });
