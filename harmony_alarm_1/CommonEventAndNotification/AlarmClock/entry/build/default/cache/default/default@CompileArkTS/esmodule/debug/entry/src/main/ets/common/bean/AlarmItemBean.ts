import ReminderItem from "@bundle:com.huawei.alarmclock/entry/ets/common/bean/ReminderItemBean";
/**
 * Alarm item description.
 */
@Observed
export default class AlarmItemBean extends ReminderItem {
    /**
     * Custom alarm name.
     */
    name = '闹钟';
    /**
     * Custom alarm is open.
     */
    isOpen: boolean = true;
    /**
     * Custom alarm is repeat.
     */
    isRepeat: boolean = false;
    /**
     * Custom alarm duration.
     */
    duration: number = 5;
    /**
     * Custom alarm interval minute.
     */
    intervalMinute: number = 10;
    /**
     * Custom alarm interval times.
     */
    intervalTimes: number = 3;
    /**
     * Custom alarm notification id.
     */
    notificationId: number = 0;
}
