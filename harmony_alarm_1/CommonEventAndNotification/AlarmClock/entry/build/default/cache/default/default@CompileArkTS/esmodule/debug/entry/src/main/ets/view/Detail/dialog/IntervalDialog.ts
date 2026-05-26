if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IntervalDialog_Params {
    alarmItem?: AlarmItem;
    intervalMinuteSelect?: number;
    intervalTimesSelect?: number;
    controller?: CustomDialogController;
}
import { CommonConstants, DetailConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../../../common/bean/AlarmItemBean';
import CommonDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/CommonDialog";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class IntervalDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__alarmItem = this.initializeConsume(DetailConstant.DEFAULT_PROVIDER_KEY, "alarmItem");
        this.__intervalMinuteSelect = new ObservedPropertySimplePU(0, this, "intervalMinuteSelect");
        this.__intervalTimesSelect = new ObservedPropertySimplePU(0, this, "intervalTimesSelect");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IntervalDialog_Params) {
        if (params.intervalMinuteSelect !== undefined) {
            this.intervalMinuteSelect = params.intervalMinuteSelect;
        }
        if (params.intervalTimesSelect !== undefined) {
            this.intervalTimesSelect = params.intervalTimesSelect;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: IntervalDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__alarmItem.purgeDependencyOnElmtId(rmElmtId);
        this.__intervalMinuteSelect.purgeDependencyOnElmtId(rmElmtId);
        this.__intervalTimesSelect.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__alarmItem.aboutToBeDeleted();
        this.__intervalMinuteSelect.aboutToBeDeleted();
        this.__intervalTimesSelect.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __alarmItem: ObservedPropertyAbstractPU<AlarmItem>;
    get alarmItem() {
        return this.__alarmItem.get();
    }
    set alarmItem(newValue: AlarmItem) {
        this.__alarmItem.set(newValue);
    }
    private __intervalMinuteSelect: ObservedPropertySimplePU<number>;
    get intervalMinuteSelect() {
        return this.__intervalMinuteSelect.get();
    }
    set intervalMinuteSelect(newValue: number) {
        this.__intervalMinuteSelect.set(newValue);
    }
    private __intervalTimesSelect: ObservedPropertySimplePU<number>;
    get intervalTimesSelect() {
        return this.__intervalTimesSelect.get();
    }
    set intervalTimesSelect(newValue: number) {
        this.__intervalTimesSelect.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    aboutToAppear(): void {
        this.intervalMinuteSelect = this.alarmItem.intervalMinute;
        this.intervalTimesSelect = this.alarmItem.intervalTimes;
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create();
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((this.intervalTimesSelect | this.intervalMinuteSelect) > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CommonDialog(this, {
                                    title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                                    controller: this.controller,
                                    onConfirm: () => {
                                        this.alarmItem.intervalMinute = Number(this.intervalMinuteSelect.toFixed(0));
                                        this.alarmItem.intervalTimes = Number(this.intervalTimesSelect.toFixed(0));
                                    },
                                    closer: () => {
                                        this.IntervalItem.bind(this)({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }, 0);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Divider.create();
                                            Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Divider.lineCap(LineCapStyle.Round);
                                        }, Divider);
                                        this.IntervalItem.bind(this)({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }, CommonConstants.DEFAULT_SINGLE);
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Detail/dialog/IntervalDialog.ets", line: 36, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                                        controller: this.controller,
                                        onConfirm: () => {
                                            this.alarmItem.intervalMinute = Number(this.intervalMinuteSelect.toFixed(0));
                                            this.alarmItem.intervalTimes = Number(this.intervalTimesSelect.toFixed(0));
                                        },
                                        closer: () => {
                                            this.IntervalItem.bind(this)({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }, 0);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Divider.create();
                                                Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                                Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                                Divider.lineCap(LineCapStyle.Round);
                                            }, Divider);
                                            this.IntervalItem.bind(this)({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }, CommonConstants.DEFAULT_SINGLE);
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CommonDialog" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Flex.pop();
    }
    IntervalItem(title: string | Resource, intervalType: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(DimensionUtil.getFp({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Text.width(CommonConstants.FULL_LENGTH);
            Text.textAlign(TextAlign.Start);
            Text.margin({
                top: DimensionUtil.getVp({ "id": 16777274, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(CommonConstants.FULL_LENGTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: (intervalType === 0 ? this.intervalMinuteSelect : this.intervalTimesSelect),
                min: (intervalType === 0 ? CommonConstants.DEFAULT_INTERVAL_STEP : 0),
                max: (intervalType === 0
                    ? CommonConstants.DEFAULT_INTERVAL_MINUTE_MAX
                    : CommonConstants.DEFAULT_INTERVAL_TIME_MAX),
                step: (intervalType === 0 ? CommonConstants.DEFAULT_INTERVAL_STEP : CommonConstants.DEFAULT_DOUBLE),
                style: SliderStyle.OutSet
            });
            Slider.blockColor(Color.Blue);
            Slider.trackColor(Color.Gray);
            Slider.selectedColor(Color.Blue);
            Slider.showSteps(true);
            Slider.showTips(false);
            Slider.onChange((value: number) => {
                if (intervalType === 0) {
                    this.intervalMinuteSelect = value;
                }
                else {
                    this.intervalTimesSelect = value;
                }
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create((intervalType === 0 ? this.intervalMinuteSelect : this.intervalTimesSelect).toFixed(0));
            Text.fontSize(DimensionUtil.getFp({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
