import { DetailConstant } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import { ALARM_KEY, CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../common/bean/AlarmItemBean';
import ReminderService from "@bundle:com.huawei.alarmclock/entry/ets/model/ReminderService";
import DataTypeUtils from "@bundle:com.huawei.alarmclock/entry/ets/common/utils/DataTypeUtils";
/**
 * Detail page view model description
 */
export default class DetailViewModel {
    private static instant: DetailViewModel;
    private reminderService: ReminderService;
    private alarms: Array<AlarmItem>;
    private constructor() {
        this.reminderService = new ReminderService();
        this.alarms = new Array();
    }
    /**
     * Get ring date content string.
     *
     * @param ringDates Array<number>
     * @return content string
     */
    public getRingDateContent(ringDates: Array<number>): string {
        if (!ringDates || ringDates.length === 0) {
            return '未选择';
        }
        let content = '';
        for (let i = 0; i < ringDates.length; i++) {
            content += this.transAlarmRepeatDayContent(ringDates[i]) + CommonConstants.DEFAULT_STRING_SPACE;
        }
        return content.trim();
    }
    /**
     * Get DetailViewModel instance.
     *
     * @return instance
     */
    public static getInstant(): DetailViewModel {
        if (DetailViewModel.instant == null) {
            DetailViewModel.instant = new DetailViewModel();
        }
        return DetailViewModel.instant;
    }
    /**
     * Conversion alarm repeat day content
     *
     * @param repeatDay number
     * @return repeatContent string
     */
    public transAlarmRepeatDayContent(repeatDay: number): string {
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
        return repeatContent;
    }
    /**
     * Set the initial time of the alarm.
     *
     * @param alarmItem AlarmItem
     */
    public setAlarmDefaultTime(alarmItem?: AlarmItem): void {
        let hour: number = 0;
        let minute: number = 0;
        if (alarmItem == null) {
            let date = new Date();
            hour = date.getHours();
            minute = date.getMinutes();
        }
        else {
            hour = alarmItem.hour;
            minute = alarmItem.minute;
        }
        DetailConstant.DAY_DATA[0].delSelect = (hour >= CommonConstants.DEFAULT_TOTAL_HOUR
            ? CommonConstants.DEFAULT_SINGLE
            : 0);
        DetailConstant.DAY_DATA[CommonConstants.DEFAULT_SINGLE].delSelect = (hour === 0
            ? CommonConstants.DEFAULT_TOTAL_HOUR
            : (hour > CommonConstants.DEFAULT_TOTAL_HOUR ? hour - CommonConstants.DEFAULT_TOTAL_HOUR : hour))
            - CommonConstants.DEFAULT_SINGLE;
        DetailConstant.DAY_DATA[CommonConstants.DEFAULT_DATA_PICKER_HOUR_SELECTION].delSelect =
            (minute === 0 ? CommonConstants.DEFAULT_TOTAL_MINUTE : minute) - CommonConstants.DEFAULT_SINGLE;
    }
    /**
     * Set the alarm remind.
     *
     * @param alarmItem AlarmItem
     */
    public async setAlarmRemind(alarmItem: AlarmItem): Promise<void> {
        alarmItem.hour = this.getAlarmTime(CommonConstants.DEFAULT_SINGLE);
        alarmItem.minute = this.getAlarmTime(CommonConstants.DEFAULT_DATA_PICKER_HOUR_SELECTION);
        console.info('DetailViewModel.setAlarmRemind: hour=' + alarmItem.hour + ', minute=' + alarmItem.minute +
            ', ringDates=' + JSON.stringify(alarmItem.ringDates) + ', repeatDays=' + JSON.stringify(alarmItem.repeatDays));
        let index = await this.findAlarmWithId(alarmItem.id);
        if (index !== CommonConstants.DEFAULT_NUMBER_NEGATIVE) { // 已存在，删除原有提醒
            this.reminderService.deleteReminder(alarmItem.id);
        }
        else { // 不存在，以数据长度为notificationId新增闹钟数据
            index = this.alarms.length;
            alarmItem.notificationId = index;
            this.alarms.push(alarmItem);
        }
        // 先更新数组并保存到preferences，确保数据持久化
        this.alarms[index] = alarmItem;
        await globalThis.preference.set(ALARM_KEY, JSON.stringify(this.alarms));
        // 再尝试发布系统提醒，失败不影响已保存的数据
        try {
            let newId: number = await this.reminderService.addReminder(alarmItem);
            alarmItem.id = newId;
            alarmItem.isOpen = true;
            this.alarms[index] = alarmItem;
            await globalThis.preference.set(ALARM_KEY, JSON.stringify(this.alarms));
            console.info('DetailViewModel.setAlarmRemind: reminder published successfully, id=' + newId);
        }
        catch (err) {
            console.error('Failed to publish reminder: ' + JSON.stringify(err));
        }
    }
    /**
     * Remove the alarm remind.
     *
     * @param id number
     */
    public async removeAlarmRemind(id: number): Promise<void> {
        this.reminderService.deleteReminder(id);
        let index = await this.findAlarmWithId(id);
        if (index !== CommonConstants.DEFAULT_NUMBER_NEGATIVE) {
            this.alarms.splice(index, CommonConstants.DEFAULT_SINGLE);
        }
        globalThis.preference.set(ALARM_KEY, JSON.stringify(this.alarms));
    }
    private getAlarmTime(aType: number): number {
        let times = DetailConstant.DAY_DATA[aType];
        let selectedIndex = times.delSelect;
        let time = Number(times.data[selectedIndex]);
        if (aType === CommonConstants.DEFAULT_SINGLE) {
            time = (time === CommonConstants.DEFAULT_TOTAL_HOUR ? 0 : time)
                + (DetailConstant.DAY_DATA[0].delSelect === CommonConstants.DEFAULT_SINGLE
                    ? CommonConstants.DEFAULT_TOTAL_HOUR
                    : 0);
        }
        return time;
    }
    private async findAlarmWithId(id: number): Promise<number> {
        let data: Object = await globalThis.preference.get(ALARM_KEY) as Object;
        if (!DataTypeUtils.isNull(data)) {
            this.alarms = JSON.parse(data as string);
            for (let i = 0; i < this.alarms.length; i++) {
                if (this.alarms[i].id === id) {
                    return i;
                }
            }
        }
        return CommonConstants.DEFAULT_NUMBER_NEGATIVE;
    }
}
