if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SettingItem_Params {
    settingInfo?: Array<AlarmSettingBean>;
    repeatDialogController?: CustomDialogController;
    reNameDialogController?: CustomDialogController;
    durationDialogController?: CustomDialogController;
    intervalDialogController?: CustomDialogController;
    ringDateDialogController?: CustomDialogController;
}
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import { AlarmSettingType } from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/AlarmSettingBean";
import type AlarmSettingBean from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/AlarmSettingBean";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
import IntervalDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/IntervalDialog";
import DurationDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/DurationDialog";
import RenameDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/RenameDialog";
import RepeatDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/RepeatDialog";
import RingDateDialog from "@bundle:com.huawei.alarmclock/entry/ets/view/Detail/dialog/RingDateDialog";
export default class SettingItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingInfo = new SynchedPropertyObjectTwoWayPU(params.settingInfo, this, "settingInfo");
        this.repeatDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new RepeatDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Detail/SettingItem.ets", line: 29, col: 14 });
                jsDialog.setController(this.repeatDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true
        }, this);
        this.reNameDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new RenameDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Detail/SettingItem.ets", line: 33, col: 14 });
                jsDialog.setController(this.reNameDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true
        }, this);
        this.durationDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DurationDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Detail/SettingItem.ets", line: 37, col: 14 });
                jsDialog.setController(this.durationDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true
        }, this);
        this.intervalDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new IntervalDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Detail/SettingItem.ets", line: 41, col: 14 });
                jsDialog.setController(this.intervalDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true
        }, this);
        this.ringDateDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new RingDateDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Detail/SettingItem.ets", line: 45, col: 14 });
                jsDialog.setController(this.ringDateDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingItem_Params) {
        if (params.repeatDialogController !== undefined) {
            this.repeatDialogController = params.repeatDialogController;
        }
        if (params.reNameDialogController !== undefined) {
            this.reNameDialogController = params.reNameDialogController;
        }
        if (params.durationDialogController !== undefined) {
            this.durationDialogController = params.durationDialogController;
        }
        if (params.intervalDialogController !== undefined) {
            this.intervalDialogController = params.intervalDialogController;
        }
        if (params.ringDateDialogController !== undefined) {
            this.ringDateDialogController = params.ringDateDialogController;
        }
    }
    updateStateVars(params: SettingItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingInfo: SynchedPropertySimpleOneWayPU<Array<AlarmSettingBean>>;
    get settingInfo() {
        return this.__settingInfo.get();
    }
    set settingInfo(newValue: Array<AlarmSettingBean>) {
        this.__settingInfo.set(newValue);
    }
    private repeatDialogController: CustomDialogController;
    private reNameDialogController: CustomDialogController;
    private durationDialogController: CustomDialogController;
    private intervalDialogController: CustomDialogController;
    private ringDateDialogController: CustomDialogController;
    private showSettingDialog(sType: AlarmSettingType): void {
        switch (sType) {
            case AlarmSettingType.REPEAT:
                this.repeatDialogController.open();
                break;
            case AlarmSettingType.ALARM_NAME:
                this.reNameDialogController.open();
                break;
            case AlarmSettingType.RING_DURATION:
                this.durationDialogController.open();
                break;
            case AlarmSettingType.INTERVAL:
                this.intervalDialogController.open();
                break;
            case AlarmSettingType.RING_DATE:
                this.ringDateDialogController.open();
                break;
            default:
                break;
        }
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({
                bottom: DimensionUtil.getVp({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                left: DimensionUtil.getVp({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
            Column.borderRadius(DimensionUtil.getVp({ "id": 16777281, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Column.backgroundColor(Color.White);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.visibility(index === 0 ? Visibility.Hidden : Visibility.Visible);
                    Divider.opacity({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                    Divider.color({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                    Divider.lineCap(LineCapStyle.Round);
                    Divider.margin({
                        left: DimensionUtil.getVp({ "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                        right: DimensionUtil.getVp({ "id": 16777284, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
                    });
                }, Divider);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.height(DimensionUtil.getVp({ "id": 16777285, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                    Row.alignItems(VerticalAlign.Center);
                    Row.padding({
                        left: DimensionUtil.getVp({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                        right: DimensionUtil.getVp({ "id": 16777289, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
                    });
                    Row.onClick(() => {
                        this.showSettingDialog(item.sType);
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize(DimensionUtil.getFp({ "id": 16777290, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                    Text.fontWeight(FontWeight.Regular);
                    Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                    Text.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.content);
                    Text.fontSize(DimensionUtil.getFp({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                    Text.fontWeight(FontWeight.Normal);
                    Text.fontColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                    Text.opacity({ "id": 16777282, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777303, "type": 20000, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                    Image.width(DimensionUtil.getVp({ "id": 16777288, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                    Image.height(DimensionUtil.getVp({ "id": 16777286, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
                    Image.objectFit(ImageFit.Fill);
                    Image.margin({
                        left: DimensionUtil.getVp({ "id": 16777287, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
                    });
                }, Image);
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.settingInfo, forEachItemGenFunction, (item: AlarmSettingBean, index: number) => JSON.stringify(item) + index, true, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
