if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DatePickArea_Params {
}
import { DetailConstant, CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type { DayDataItem } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class DatePickArea extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DatePickArea_Params) {
    }
    updateStateVars(params: DatePickArea_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Center });
            Stack.height(DimensionUtil.getVp({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }));
            Stack.padding({
                left: DimensionUtil.getVp({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" }),
                right: DimensionUtil.getVp({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextPicker.create({ range: item.data, selected: item.delSelect });
                    TextPicker.layoutWeight(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
                    TextPicker.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
                    TextPicker.canLoop(false);
                    TextPicker.onChange((_value: string | string[], index: number | number[]) => {
                        item.delSelect = index as number;
                    });
                }, TextPicker);
                TextPicker.pop();
            };
            this.forEachUpdateFunction(elmtId, DetailConstant.DAY_DATA, forEachItemGenFunction, (item: DayDataItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
