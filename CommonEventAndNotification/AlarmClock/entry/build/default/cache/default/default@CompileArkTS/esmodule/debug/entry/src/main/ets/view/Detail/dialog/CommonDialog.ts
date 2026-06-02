if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommonDialog_Params {
    title?: string | Resource;
    controller?: CustomDialogController | null;
    onConfirm?: () => void;
    closer?: () => void;
}
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class CommonDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = '';
        this.controller = null;
        this.onConfirm = undefined;
        this.closer = this.defaultBuilder;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommonDialog_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onConfirm !== undefined) {
            this.onConfirm = params.onConfirm;
        }
        if (params.closer !== undefined) {
            this.closer = params.closer;
        }
    }
    updateStateVars(params: CommonDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string | Resource;
    private controller: CustomDialogController | null;
    private onConfirm?: () => void;
    private __closer;
    defaultBuilder(parent = null) {
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_LENGTH);
            Column.padding(DimensionUtil.getVp({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(DimensionUtil.getFp({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Text.width(CommonConstants.FULL_LENGTH);
            Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Text.margin({
                bottom: DimensionUtil.getVp({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
        }, Text);
        Text.pop();
        this.closer.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: DimensionUtil.getVp({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            __Button__actionBtnStyle();
            Button.onClick(() => {
                if (this.controller != null) {
                    this.controller.close();
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.onConfirm) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                        __Button__actionBtnStyle();
                        Button.onClick(() => {
                            this.onConfirm!();
                            if (this.controller != null) {
                                this.controller.close();
                            }
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Button__actionBtnStyle(): void {
    Button.fontSize(DimensionUtil.getFp({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
    Button.height(DimensionUtil.getVp({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
    Button.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
    Button.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
    Button.backgroundColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
}
