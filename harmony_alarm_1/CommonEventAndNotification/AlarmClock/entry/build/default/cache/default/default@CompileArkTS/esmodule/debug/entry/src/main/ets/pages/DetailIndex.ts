if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DetailIndex_Params {
    alarmItem?: AlarmItem;
    repeatSettingArr?: Array<AlarmSettingBean>;
    alarmSettingInfoArr?: Array<AlarmSettingBean>;
    isNow?: boolean;
    viewModel?: DetailModel;
}
import router from "@ohos:router";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/CommonConstants";
import AlarmItem from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/AlarmItemBean";
import AlarmSettingBean from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/AlarmSettingBean";
import { AlarmSettingType } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/AlarmSettingType";
import { DetailConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/DetailConstant";
import BackContainer from "@bundle:com.huawei.alarmclock/entry/ets/view/BackContainer";
import DetailModel from "@bundle:com.huawei.alarmclock/entry/ets/viewmodel/DetailViewModel";
import DatePickArea from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/DatePickArea";
import SettingItem from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/SettingItem";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
interface DetailParams {
    alarmItem: AlarmItem;
}
class DetailIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__alarmItem = new ObservedPropertyObjectPU(new AlarmItem(), this, "alarmItem");
        this.addProvidedVar(DetailConstant.DEFAULT_PROVIDER_KEY, this.__alarmItem, false);
        this.addProvidedVar("alarmItem", this.__alarmItem, false);
        this.__repeatSettingArr = new ObservedPropertyObjectPU([], this, "repeatSettingArr");
        this.__alarmSettingInfoArr = new ObservedPropertyObjectPU([], this, "alarmSettingInfoArr");
        this.isNow = true;
        this.viewModel = DetailModel.getInstant();
        this.setInitiallyProvidedValue(params);
        this.declareWatch("alarmItem", this.onAlarmItemChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DetailIndex_Params) {
        if (params.alarmItem !== undefined) {
            this.alarmItem = params.alarmItem;
        }
        if (params.repeatSettingArr !== undefined) {
            this.repeatSettingArr = params.repeatSettingArr;
        }
        if (params.alarmSettingInfoArr !== undefined) {
            this.alarmSettingInfoArr = params.alarmSettingInfoArr;
        }
        if (params.isNow !== undefined) {
            this.isNow = params.isNow;
        }
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
    }
    updateStateVars(params: DetailIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__alarmItem.purgeDependencyOnElmtId(rmElmtId);
        this.__repeatSettingArr.purgeDependencyOnElmtId(rmElmtId);
        this.__alarmSettingInfoArr.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__alarmItem.aboutToBeDeleted();
        this.__repeatSettingArr.aboutToBeDeleted();
        this.__alarmSettingInfoArr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __alarmItem: ObservedPropertyObjectPU<AlarmItem>;
    get alarmItem() {
        return this.__alarmItem.get();
    }
    set alarmItem(newValue: AlarmItem) {
        this.__alarmItem.set(newValue);
    }
    private __repeatSettingArr: ObservedPropertyObjectPU<Array<AlarmSettingBean>>;
    get repeatSettingArr() {
        return this.__repeatSettingArr.get();
    }
    set repeatSettingArr(newValue: Array<AlarmSettingBean>) {
        this.__repeatSettingArr.set(newValue);
    }
    private __alarmSettingInfoArr: ObservedPropertyObjectPU<Array<AlarmSettingBean>>;
    get alarmSettingInfoArr() {
        return this.__alarmSettingInfoArr.get();
    }
    set alarmSettingInfoArr(newValue: Array<AlarmSettingBean>) {
        this.__alarmSettingInfoArr.set(newValue);
    }
    private isNow: boolean;
    private viewModel: DetailModel;
    aboutToAppear(): void {
        let params: DetailParams = router.getParams() as DetailParams;
        if (params != null && params.alarmItem != null) {
            this.isNow = false;
            this.alarmItem = params.alarmItem;
            this.viewModel.setAlarmDefaultTime(this.alarmItem);
        }
        else {
            this.viewModel.setAlarmDefaultTime();
        }
        this.initData();
    }
    onAlarmItemChange(): void {
        this.initData();
    }
    initData(): void {
        this.repeatSettingArr = [
            new AlarmSettingBean(DetailConstant.DEFAULT_STRING_REPEAT, this.alarmItem.isRepeat ? DetailConstant.DEFAULT_STRING_REPEAT
                : CommonConstants.DEFAULT_STRING_NO_REPEAT, AlarmSettingType.REPEAT)
        ];
        this.alarmSettingInfoArr = [
            new AlarmSettingBean(DetailConstant.DEFAULT_STRING_ALARM_NAME, this.alarmItem.name, AlarmSettingType.ALARM_NAME),
            new AlarmSettingBean(DetailConstant.DEFAULT_STRING_DURATION, this.alarmItem.duration + DetailConstant.DEFAULT_STRING_MINUTE, AlarmSettingType.RING_DURATION),
            new AlarmSettingBean(DetailConstant.DEFAULT_STRING_INTERVAL, this.alarmItem.intervalMinute
                + DetailConstant.DEFAULT_STRING_MINUTE + CommonConstants.DEFAULT_STRING_COMMA
                + this.alarmItem.intervalTimes + DetailConstant.DEFAULT_STRING_TIMES, AlarmSettingType.INTERVAL)
        ];
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Column.width(CommonConstants.FULL_LENGTH);
            Column.height(CommonConstants.FULL_LENGTH);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new BackContainer(this, {
                        header: this.isNow ? { "id": 16777226, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" } : { "id": 16777233, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                        backImgRes: { "id": 16777299, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                        closer: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithChild();
                                Button.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                Button.width(DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                Button.height(DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                Button.onClick(async () => {
                                    await this.viewModel.setAlarmRemind(ObservedObject.GetRawObject(this.alarmItem));
                                    router.back();
                                });
                            }, Button);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777301, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                Image.objectFit(ImageFit.Fill);
                            }, Image);
                            Button.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DetailIndex.ets", line: 75, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            header: this.isNow ? { "id": 16777226, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" } : { "id": 16777233, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                            backImgRes: { "id": 16777299, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                            closer: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithChild();
                                    Button.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                    Button.width(DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                    Button.height(DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                    Button.onClick(async () => {
                                        await this.viewModel.setAlarmRemind(ObservedObject.GetRawObject(this.alarmItem));
                                        router.back();
                                    });
                                }, Button);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777301, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                    Image.objectFit(ImageFit.Fill);
                                }, Image);
                                Button.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "BackContainer" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DatePickArea(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DetailIndex.ets", line: 91, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DatePickArea" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingItem(this, {
                        settingInfo: this.__repeatSettingArr
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DetailIndex.ets", line: 93, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            settingInfo: this.repeatSettingArr
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SettingItem" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingItem(this, {
                        settingInfo: this.__alarmSettingInfoArr
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DetailIndex.ets", line: 96, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            settingInfo: this.alarmSettingInfoArr
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SettingItem" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Button.visibility(this.isNow ? Visibility.None : Visibility.Visible);
            Button.width(DimensionUtil.getVp({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.height(DimensionUtil.getVp({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.fontSize(DimensionUtil.getFp({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Button.borderRadius(DimensionUtil.getVp({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.margin({
                bottom: DimensionUtil.getVp({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            Button.onClick(async () => {
                await this.viewModel.removeAlarmRemind(this.alarmItem.id);
                router.back();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DetailIndex";
    }
}
registerNamedRoute(() => new DetailIndex(undefined, {}), "", { bundleName: "com.huawei.alarmclock", moduleName: "entry", pagePath: "pages/DetailIndex", pageFullPath: "entry/src/main/ets/pages/DetailIndex", integratedHsp: "false", moduleType: "followWithHap" });
