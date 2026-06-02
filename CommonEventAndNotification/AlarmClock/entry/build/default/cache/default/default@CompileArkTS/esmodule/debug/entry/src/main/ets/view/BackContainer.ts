if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BackContainer_Params {
    header?: string | Resource;
    backImgRes?: string | Resource;
    backFunc?: () => void;
    closer?: () => void;
}
import router from "@ohos:router";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class BackContainer extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.header = '';
        this.backImgRes = '';
        this.backFunc = undefined;
        this.closer = this.defaultBuilder;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BackContainer_Params) {
        if (params.header !== undefined) {
            this.header = params.header;
        }
        if (params.backImgRes !== undefined) {
            this.backImgRes = params.backImgRes;
        }
        if (params.backFunc !== undefined) {
            this.backFunc = params.backFunc;
        }
        if (params.closer !== undefined) {
            this.closer = params.closer;
        }
    }
    updateStateVars(params: BackContainer_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private header: string | Resource;
    private backImgRes: string | Resource;
    private backFunc?: () => void;
    private __closer;
    defaultBuilder(parent = null) {
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({
                left: DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            Row.height(DimensionUtil.getVp({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Row.width(CommonConstants.FULL_LENGTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.backgroundColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Button.width(DimensionUtil.getVp({ "id": 16777291, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.height(DimensionUtil.getVp({ "id": 16777291, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Button.onClick(() => {
                this.backFunc ? this.backFunc() : router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.backImgRes == null ? { "id": 16777302, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" } : this.backImgRes);
            Image.objectFit(ImageFit.Fill);
        }, Image);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.header);
            Text.fontSize(DimensionUtil.getFp({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Text.lineHeight(DimensionUtil.getVp({ "id": 16777294, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Text.margin({ left: DimensionUtil.getVp({ "id": 16777295, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) });
            Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.closer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.closer.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
