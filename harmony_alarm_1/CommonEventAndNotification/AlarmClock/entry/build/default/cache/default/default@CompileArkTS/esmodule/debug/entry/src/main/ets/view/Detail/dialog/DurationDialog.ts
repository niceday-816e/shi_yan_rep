if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DurationDialog_Params {
    alarmItem?: AlarmItem;
    durations?: Array<number>;
    controller?: CustomDialogController;
}
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/CommonConstants";
import { DetailConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/DetailConstant";
import type AlarmItem from '../../../common/bean/AlarmItemBean';
import CommonDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/CommonDialog";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class DurationDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__alarmItem = this.initializeConsume(DetailConstant.DEFAULT_PROVIDER_KEY, "alarmItem");
        this.durations = DetailConstant.RING_DURATION;
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DurationDialog_Params) {
        if (params.durations !== undefined) {
            this.durations = params.durations;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: DurationDialog_Params) {
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
    private durations: Array<number>; //响铃时长，分钟
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create();
        }, Flex);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommonDialog(this, {
                        title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                        controller: this.controller,
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
                                        Text.create(item + CommonConstants.DEFAULT_STRING_SPACE + DetailConstant.DEFAULT_STRING_MINUTE);
                                        Text.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
                                        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                        Text.fontSize(DimensionUtil.getFp({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Radio.create({ value: item.toString(), group: DetailConstant.DEFAULT_STRING_GROUP_NAME });
                                        Radio.checked(item === this.alarmItem.duration ? true : false);
                                        Radio.height(DimensionUtil.getVp({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                        Radio.width(DimensionUtil.getVp({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                        Radio.onChange(() => {
                                            this.controller.close();
                                            this.alarmItem.duration = item;
                                        });
                                    }, Radio);
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Divider.create();
                                        Divider.opacity({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                        Divider.color({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                        Divider.lineCap(LineCapStyle.Round);
                                    }, Divider);
                                };
                                this.forEachUpdateFunction(elmtId, this.durations, forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Detail/dialog/DurationDialog.ets", line: 30, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                            controller: this.controller,
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
                                            Text.create(item + CommonConstants.DEFAULT_STRING_SPACE + DetailConstant.DEFAULT_STRING_MINUTE);
                                            Text.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
                                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Text.fontSize(DimensionUtil.getFp({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Radio.create({ value: item.toString(), group: DetailConstant.DEFAULT_STRING_GROUP_NAME });
                                            Radio.checked(item === this.alarmItem.duration ? true : false);
                                            Radio.height(DimensionUtil.getVp({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                            Radio.width(DimensionUtil.getVp({ "id": 16777273, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                                            Radio.onChange(() => {
                                                this.controller.close();
                                                this.alarmItem.duration = item;
                                            });
                                        }, Radio);
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Divider.create();
                                            Divider.opacity({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Divider.color({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                            Divider.lineCap(LineCapStyle.Round);
                                        }, Divider);
                                    };
                                    this.forEachUpdateFunction(elmtId, this.durations, forEachItemGenFunction);
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
