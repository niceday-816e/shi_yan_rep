if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RenameDialog_Params {
    alarmItem?: AlarmItem;
    name?: string;
    controller?: CustomDialogController;
}
import { CommonConstants, DetailConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../../../common/bean/AlarmItemBean';
import CommonDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/CommonDialog";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class RenameDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__alarmItem = this.initializeConsume(DetailConstant.DEFAULT_PROVIDER_KEY, "alarmItem");
        this.name = '';
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RenameDialog_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: RenameDialog_Params) {
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
    private name: string;
    private controller?: CustomDialogController;
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
                        title: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                        controller: this.controller,
                        onConfirm: () => {
                            this.alarmItem.name = this.name;
                        },
                        closer: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextArea.create({ text: this.alarmItem.name });
                                TextArea.width(CommonConstants.FULL_LENGTH);
                                TextArea.margin({ bottom: DimensionUtil.getVp({ "id": 16777278, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
                                TextArea.onChange((value: string) => {
                                    this.name = value;
                                });
                            }, TextArea);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                Divider.lineCap(LineCapStyle.Round);
                            }, Divider);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Detail/dialog/RenameDialog.ets", line: 29, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" },
                            controller: this.controller,
                            onConfirm: () => {
                                this.alarmItem.name = this.name;
                            },
                            closer: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    TextArea.create({ text: this.alarmItem.name });
                                    TextArea.width(CommonConstants.FULL_LENGTH);
                                    TextArea.margin({ bottom: DimensionUtil.getVp({ "id": 16777278, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
                                    TextArea.onChange((value: string) => {
                                        this.name = value;
                                    });
                                }, TextArea);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Divider.create();
                                    Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                    Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                                    Divider.lineCap(LineCapStyle.Round);
                                }, Divider);
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
