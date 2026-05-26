if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ClockArea_Params {
    mainModel?: MainModel;
    drawInterval?: number;
    showClock?: boolean;
    canvasSize?: number;
    clockRadius?: number;
    settings?: RenderingContextSettings;
    renderContext?: CanvasRenderingContext2D;
}
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/CommonConstants";
import MainModel from "@bundle:com.huawei.alarmclock/entry/ets/viewmodel/MainViewModel";
import { MainConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/MainConstant";
import DimensionUtil from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DimensionUtil";
export default class ClockArea extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.mainModel = MainModel.getInstant();
        this.drawInterval = CommonConstants.DEFAULT_NUMBER_NEGATIVE;
        this.__showClock = new ObservedPropertySimplePU(true, this, "showClock");
        this.canvasSize = 0;
        this.clockRadius = 0;
        this.settings = new RenderingContextSettings(true);
        this.renderContext = new CanvasRenderingContext2D(this.settings);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ClockArea_Params) {
        if (params.mainModel !== undefined) {
            this.mainModel = params.mainModel;
        }
        if (params.drawInterval !== undefined) {
            this.drawInterval = params.drawInterval;
        }
        if (params.showClock !== undefined) {
            this.showClock = params.showClock;
        }
        if (params.canvasSize !== undefined) {
            this.canvasSize = params.canvasSize;
        }
        if (params.clockRadius !== undefined) {
            this.clockRadius = params.clockRadius;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.renderContext !== undefined) {
            this.renderContext = params.renderContext;
        }
    }
    updateStateVars(params: ClockArea_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__showClock.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__showClock.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private mainModel: MainModel;
    private drawInterval: number;
    private __showClock: ObservedPropertySimplePU<boolean>;
    get showClock() {
        return this.__showClock.get();
    }
    set showClock(newValue: boolean) {
        this.__showClock.set(newValue);
    }
    private canvasSize: number;
    private clockRadius: number;
    private settings: RenderingContextSettings;
    private renderContext: CanvasRenderingContext2D;
    aboutToAppear(): void {
        this.canvasSize = DimensionUtil.getVp({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" });
        this.clockRadius = this.canvasSize / CommonConstants.DEFAULT_DOUBLE - CommonConstants.DEFAULT_DOUBLE;
    }
    aboutToDisappear(): void {
        clearInterval(this.drawInterval);
    }
    initialRender(): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.renderContext);
            Canvas.width(this.canvasSize);
            Canvas.aspectRatio(CommonConstants.DEFAULT_LAYOUT_WEIGHT);
            Canvas.onReady(() => {
                if (this.drawInterval === CommonConstants.DEFAULT_NUMBER_NEGATIVE) {
                    this.startDrawTask();
                }
            });
            Canvas.onClick(() => {
                this.showClock = !this.showClock;
            });
        }, Canvas);
        Canvas.pop();
    }
    private startDrawTask(): void {
        this.renderContext.translate(this.canvasSize / CommonConstants.DEFAULT_DOUBLE, this.canvasSize / CommonConstants.DEFAULT_DOUBLE);
        this.drawClockArea();
        this.drawInterval = setInterval(() => {
            this.drawClockArea();
        }, MainConstant.DEFAULT_ONE_SECOND_MS);
    }
    private drawClockArea(): void {
        this.renderContext.clearRect(-this.canvasSize, -this.canvasSize / CommonConstants.DEFAULT_DOUBLE, this.canvasSize * CommonConstants.DEFAULT_DOUBLE, this.canvasSize);
        let date: Date = new Date();
        let hours: number = date.getHours();
        let minutes: number = date.getMinutes();
        let seconds: number = date.getSeconds();
        if (this.showClock) {
            this.drawPan();
            this.drawPointer(CommonConstants.DEFAULT_INTERVAL_MINUTE_MAX * (hours > CommonConstants.DEFAULT_TOTAL_HOUR
                ? hours - CommonConstants.DEFAULT_TOTAL_HOUR
                : hours)
                + minutes / CommonConstants.DEFAULT_TOTAL_HOUR * CommonConstants.DEFAULT_COMMON_DEGREE, MainConstant.HOUR_POINTER_IMAGE_URL);
            this.drawPointer(CommonConstants.DEFAULT_COMMON_DEGREE * minutes, MainConstant.MINUTE_POINTER_IMAGE_URL);
            this.drawPointer(CommonConstants.DEFAULT_COMMON_DEGREE * seconds, MainConstant.SECOND_POINTER_IMAGE_URL);
        }
        else {
            this.drawTime(hours, minutes, seconds);
        }
    }
    private drawPan(): void {
        this.renderContext.beginPath();
        let secondImg: ImageBitmap = new ImageBitmap(MainConstant.CLOCK_PAN_IMAGE_URL);
        let imgWidth: number = this.clockRadius * 2;
        this.renderContext.drawImage(secondImg, -this.clockRadius, -this.clockRadius, imgWidth, imgWidth);
        this.renderContext.restore();
    }
    private drawPointer(degree: number, pointerImgRes: string): void {
        this.renderContext.save();
        let theta: number = (degree + MainConstant.DEFAULT_HORIZONTAL_ANGLE) * Math.PI / MainConstant.DEFAULT_HORIZONTAL_ANGLE;
        this.renderContext.rotate(theta);
        this.renderContext.beginPath();
        let secondImg: ImageBitmap = new ImageBitmap(pointerImgRes);
        let imgWidth: number = CommonConstants.DEFAULT_POINTER_WIDTH;
        this.renderContext.drawImage(secondImg, -imgWidth / CommonConstants.DEFAULT_DOUBLE, -this.clockRadius, imgWidth, this.clockRadius * CommonConstants.DEFAULT_DOUBLE);
        this.renderContext.restore();
    }
    private drawTime(hour: number, minute: number, second: number): void {
        let time: string = this.mainModel.fillZero(hour)
            + MainConstant.DEFAULT_STRING_COLON
            + this.mainModel.fillZero(minute)
            + MainConstant.DEFAULT_STRING_COLON
            + this.mainModel.fillZero(second);
        this.renderContext.save();
        this.renderContext.font = DimensionUtil.getPx({ "id": 16777255, "type": 10002, params: [], "bundleName": "com.huawei.alarmclock", "moduleName": "entry" })
            + MainConstant.CLOCK_TIME_FONT_SIZE_UNIT;
        this.renderContext.beginPath();
        this.renderContext.textAlign = 'center';
        this.renderContext.fillText(time, 0, 0);
        this.renderContext.restore();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
