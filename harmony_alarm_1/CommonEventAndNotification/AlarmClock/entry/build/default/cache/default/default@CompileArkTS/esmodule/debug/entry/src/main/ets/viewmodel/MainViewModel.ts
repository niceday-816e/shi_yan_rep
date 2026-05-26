import { MainConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import ReminderService from "@bundle:com.huawei.alarmclock/entry/ets/model/ReminderService";
import { ALARM_KEY, CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../common/bean/AlarmItemBean';
import DataTypeUtils from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DataTypeUtils";
/**
 * Declare class of main view model.
 */
export default class MainViewModel {
    private static instant: MainViewModel;
    private reminderService: ReminderService;
    private alarms: Array<AlarmItem>;
    private constructor() {
        this.alarms = new Array();
        this.reminderService = new ReminderService();
        this.reminderService.openNotificationPermission();
    }
    /**
     * Get instant in MainViewModel.
     */
    public static getInstant(): MainViewModel {
        if (MainViewModel.instant == null) {
            MainViewModel.instant = new MainViewModel();
        }
        return MainViewModel.instant;
    }
    /**
     * Querying alarm task database tables.
     *
     * @param callback (alarms: Array<AlarmItem>) => void
     */
    private queryDatabaseAlarms(callback: (alarms: Array<AlarmItem>) => void): void {
        globalThis.preference.get(ALARM_KEY).then((data: Object) => {
            if (!DataTypeUtils.isNull(data)) {
                this.alarms = JSON.parse(data as string);
                callback(this.alarms);
            }
        });
    }
    /**
     * Refresh alarm task.
     *
     * @param callback (alarms: Array<AlarmItem>) => void
     */
    public queryAlarmsTasker(callback: (alarms: Array<AlarmItem>) => void): void {
        let that = this;
        that.queryDatabaseAlarms(callback);
        globalThis.preference.addPreferencesListener({
            onDataChanged(): void {
                that.queryDatabaseAlarms(callback);
            }
        });
    }
    /**
     * Padding zeros for insufficient digits
     *
     * @param val number
     * @return content string
     */
    public fillZero(val: number): string {
        return (val > MainConstant.DEFAULT_SINGLE_DIGIT_MAX
            ? val.toString()
            : (MainConstant.DEFAULT_ZEROING + val));
    }
    /**
     * Get noon content in MainViewModel.
     *
     * @param hour number
     * @return content string
     */
    public getNoonContent(hour: number): string {
        return (hour < CommonConstants.DEFAULT_TOTAL_HOUR
            ? MainConstant.DEFAULT_STRING_MORNING
            : MainConstant.DEFAULT_STRING_AFTERNOON);
    }
    /**
     * Get task time content in MainViewModel.
     *
     * @param hour number
     * @param minute number
     * @return content string
     */
    public getTaskTimeContent(hour: number, minute: number): string {
        return (this.fillZero(hour > CommonConstants.DEFAULT_TOTAL_HOUR ? hour - CommonConstants.DEFAULT_TOTAL_HOUR : hour)
            + MainConstant.DEFAULT_STRING_COLON
            + this.fillZero(minute));
    }
    /**
     * Get description content in MainViewModel.
     *
     * @param alarmItem AlarmItem
     * @return content string
     */
    public getDescContent(alarmItem: AlarmItem): string {
        let ringDates: Array<number> = alarmItem.ringDates || [];
        return (alarmItem.name + CommonConstants.DEFAULT_STRING_COMMA
            + (alarmItem.isRepeat
                ? this.getAlarmRepeatDayContent(alarmItem.repeatDays)
                : CommonConstants.DEFAULT_STRING_NO_REPEAT)
            + CommonConstants.DEFAULT_STRING_COMMA
            + (ringDates.length > 0
                ? this.getAlarmRepeatDayContent(ringDates)
                : '响铃日期:未选择'));
    }
    /**
     * Obtains the number of repetition days of an alarm task.
     *
     * @param repeatDays Array<number>
     * @return content string
     */
    public getAlarmRepeatDayContent(repeatDays: Array<number>): string {
        let content = MainConstant.DEFAULT_STRING_NULL;
        for (let i = 0; i < repeatDays.length; i++) {
            let repeatDay: number = repeatDays[i];
            let repeatContent: string = '';
            switch (repeatDay) {
                case CommonConstants.DEFAULT_NUMBER_MONDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_MONDAY;
                    break;
                case CommonConstants.DEFAULT_NUMBER_TUESDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_TUESDAY;
                    break;
                case CommonConstants.DEFAULT_NUMBER_WEDNESDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_WEDNESDAY;
                    break;
                case CommonConstants.DEFAULT_NUMBER_THURSDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_THURSDAY;
                    break;
                case CommonConstants.DEFAULT_NUMBER_FRIDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_FRIDAY;
                    break;
                case CommonConstants.DEFAULT_NUMBER_SATURDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_SATURDAY;
                    break;
                case CommonConstants.DEFAULT_NUMBER_SUNDAY:
                    repeatContent = CommonConstants.DEFAULT_STRING_SUNDAY;
                    break;
                default:
                    break;
            }
            content += (repeatContent + CommonConstants.DEFAULT_STRING_SPACE);
        }
        return content;
    }
    /**
     * Enabling/Disabling alarms.
     *
     * @param id number
     * @return isOpen boolean
     */
    public openAlarm(id: number, isOpen: boolean): void {
        for (let i = 0; i < this.alarms.length; i++) {
            if (this.alarms[i].id === id) {
                this.alarms[i].isOpen = isOpen;
                if (isOpen) {
                    this.reminderService.addReminder(this.alarms[i]);
                }
                else {
                    this.reminderService.deleteReminder(this.alarms[i].id);
                }
                globalThis.preference.set(ALARM_KEY, JSON.stringify(this.alarms));
                break;
            }
        }
    }
}
