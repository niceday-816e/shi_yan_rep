import reminderAgent from "@ohos:reminderAgentManager";
/**
 * Reminder item base class.
 */
export class ReminderItemBean {
    id: number = 0;
    remindType: reminderAgent.ReminderType = reminderAgent.ReminderType.REMINDER_TYPE_ALARM;
    name: string = '';
    hour: number = 0;
    minute: number = 0;
    duration: number = 0;
    intervalMinute: number = 0;
    intervalTimes: number = 0;
    repeatDays: Array<number> = [];
    notificationId: number = 0;
}
/**
 * Alarm item description.
 */
@Observed
export default class AlarmItemBean extends ReminderItemBean {
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
    /**
     * Custom alarm ring dates (1=Mon..7=Sun).
     */
    ringDates: Array<number> = [];
}
