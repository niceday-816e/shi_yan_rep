if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RepeatDialog_Params {
    alarmItem?: AlarmItem;
    viewModel?: DetailModel;
    selects?: number[];
    controller?: CustomDialogController;
}
import { CommonConstants, DetailConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../../../common/bean/AlarmItemBean';
import DetailModel from "@bundle:com.huawei.alarmclock/entry/ets/viewmodel/DetailViewModel";
import CommonDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/CommonDialog";
import DataTypeUtils from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DataTypeUtils";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class RepeatDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__alarmItem = this.initializeConsume(DetailConstant.DEFAULT_PROVIDER_KEY, "alarmItem");
        this.viewModel = DetailModel.getInstant();
        this.selects = [];
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RepeatDialog_Params) {
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.selects !== undefined) {
            this.selects = params.selects;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: RepeatDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__alarmItem.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__alarmItem.aboutToBeDeleted();
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
    private viewModel: DetailModel;
    private selects: number[];
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    aboutToAppear(): void {
        this.selects = DataTypeUtils.deepCopy(this.alarmItem.repeatDays) as number[];
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create();
        }, Flex);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommonDialog(this, {
                        title: { "id": 16777227, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                        controller: this.controller,
                        onConfirm: () => {
                            this.selects.sort();
                            this.alarmItem.repeatDays = this.selects;
                            this.alarmItem.isRepeat = this.selects.length > 0;
                        },
                        closer: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const item = _item;
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width(CommonConstants.FULL_LENGTH);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.viewModel.transAlarmRepeatDayContent(item));
                                        Text.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
                                        Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                        Text.fontSize(DimensionUtil.getFp({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Checkbox.create({ name: item.toString() });
                                        Checkbox.select(this.alarmItem.repeatDays.indexOf(item) !== CommonConstants.DEFAULT_NUMBER_NEGATIVE);
                                        Checkbox.width(DimensionUtil.getVp({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                        Checkbox.height(DimensionUtil.getVp({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                        Checkbox.onChange((value: boolean) => {
                                            if (value) {
                                                this.selects.push(item);
                                            }
                                            else {
                                                let index = this.selects.indexOf(item);
                                                this.selects.splice(index, CommonConstants.DEFAULT_SINGLE);
                                            }
                                        });
                                    }, Checkbox);
                                    Checkbox.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                        Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                        Divider.lineCap(LineCapStyle.Round);
                                    }, Divider);
                                };
                                this.forEachUpdateFunction(elmtId, DetailConstant.WEEKDAY_DATA, forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Detail/dialog/RepeatDialog.ets", line: 36, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777227, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                            controller: this.controller,
                            onConfirm: () => {
                                this.selects.sort();
                                this.alarmItem.repeatDays = this.selects;
                                this.alarmItem.isRepeat = this.selects.length > 0;
                            },
                            closer: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const item = _item;
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.width(CommonConstants.FULL_LENGTH);
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(this.viewModel.transAlarmRepeatDayContent(item));
                                            Text.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
                                            Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Text.fontSize(DimensionUtil.getFp({ "id": 16777280, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Checkbox.create({ name: item.toString() });
                                            Checkbox.select(this.alarmItem.repeatDays.indexOf(item) !== CommonConstants.DEFAULT_NUMBER_NEGATIVE);
                                            Checkbox.width(DimensionUtil.getVp({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                            Checkbox.height(DimensionUtil.getVp({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                            Checkbox.onChange((value: boolean) => {
                                                if (value) {
                                                    this.selects.push(item);
                                                }
                                                else {
                                                    let index = this.selects.indexOf(item);
                                                    this.selects.splice(index, CommonConstants.DEFAULT_SINGLE);
                                                }
                                            });
                                        }, Checkbox);
                                        Checkbox.pop();
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Divider.create();
                                            Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Divider.lineCap(LineCapStyle.Round);
                                        }, Divider);
                                    };
                                    this.forEachUpdateFunction(elmtId, DetailConstant.WEEKDAY_DATA, forEachItemGenFunction);
                                }, ForEach);
                                ForEach.pop();
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
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
