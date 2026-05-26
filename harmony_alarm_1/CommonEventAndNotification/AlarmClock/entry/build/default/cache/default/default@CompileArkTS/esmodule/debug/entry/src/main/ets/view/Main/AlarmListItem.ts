if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlarmListItem_Params {
    mainModel?: MainModel;
    alarmItem?: AlarmItem;
}
import MainModel from "@bundle:com.huawei.alarmclock/entry/ets/viewmodel/MainViewModel";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/CommonConstants";
import AlarmItem from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/AlarmItemBean";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
interface MarginOptions {
    left?: number;
    top?: number;
}
export default class AlarmListItem extends ViewPU {
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
                left: DimensionUtil.getVp({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            Row.width(CommonConstants.FULL_LENGTH);
            Row.height(DimensionUtil.getVp({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Row.backgroundColor(Color.White);
            Row.borderRadius(DimensionUtil.getVp({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
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
            __Text__CommonTextAttr(DimensionUtil.getFp({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }), FontWeight.Regular);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mainModel.getTaskTimeContent(this.alarmItem.hour, this.alarmItem.minute));
            __Text__CommonTextAttr(DimensionUtil.getFp({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }), FontWeight.Regular, { left: DimensionUtil.getVp({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) } as MarginOptions);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mainModel.getDescContent(this.alarmItem));
            __Text__CommonTextAttr(DimensionUtil.getFp({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }), FontWeight.Normal, { top: DimensionUtil.getVp({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }) } as MarginOptions, { "id": 16777246, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.alarmItem.isOpen });
            Toggle.onChange((isOn: boolean) => {
                this.mainModel.openAlarm(this.alarmItem.id, isOn);
            });
            Toggle.width(DimensionUtil.getVp({ "id": 16777253, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Toggle.height(DimensionUtil.getVp({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
        }, Toggle);
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Text__CommonTextAttr(fontSize: number, fontWeight: number, margin?: MarginOptions, opacity?: Resource): void {
    Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
    Text.fontSize(fontSize);
    Text.fontWeight(fontWeight);
    Text.margin(margin);
    Text.opacity(opacity);
}
