import reminderAgent from "@ohos:reminderAgentManager";
import notification from "@ohos:notificationManager";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/Constants";
import type AlarmItem from '../common/bean/AlarmItemBean';
/**
 * Base on ohos reminder agent service
 */
export default class ReminderService {
    /**
     * open notification permission
     */
    public openNotificationPermission(): void {
        notification.requestEnableNotification().then(() => {
            console.info('Enable notification success');
            notification.addSlot(notification.SlotType.SERVICE_INFORMATION).then(() => {
                console.info('Add notification slot success');
            }).catch((err: Error) => {
                console.error('Add notification slot failed because ' + JSON.stringify(err));
            });
        }).catch((err: Error) => {
            console.error('Enable notification failed because ' + JSON.stringify(err));
        });
    }
    /**
     * Adding and modifying alarm reminders
     *
     * @param alarmItem AlarmItem
     * @param callback callback
     * @return Promise<number> reminder id
     */
    public addReminder(alarmItem: AlarmItem, callback?: (reminderId: number) => void): Promise<number> {
        let reminder: reminderAgent.ReminderRequestAlarm = this.initReminder(alarmItem);
        console.info('ReminderService.addReminder: publishing reminder with daysOfWeek=' + JSON.stringify(reminder.daysOfWeek) +
            ', hour=' + reminder.hour + ', minute=' + reminder.minute);
        return reminderAgent.publishReminder(reminder).then((reminderId: number) => {
            console.info('ReminderService.addReminder: published successfully, id=' + reminderId);
            if (callback != null) {
                callback(reminderId);
            }
            return reminderId;
        }).catch((err: Error) => {
            console.error('ReminderService.addReminder: publish failed, error=' + JSON.stringify(err));
            throw err;
        });
    }
    /**
     * Adding and modifying alarm reminders
     *
     * @param reminderId number
     */
    public deleteReminder(reminderId: number): void {
        reminderAgent.cancelReminder(reminderId);
    }
    private initReminder(item: AlarmItem): reminderAgent.ReminderRequestAlarm {
        let daysOfWeek: number[] = [];
        if (item.ringDates && item.ringDates.length > 0) {
            daysOfWeek = item.ringDates;
        }
        else if (item.repeatDays && item.repeatDays.length > 0) {
            daysOfWeek = item.repeatDays;
        }
        let reminder: reminderAgent.ReminderRequestAlarm = {
            reminderType: item.remindType,
            hour: item.hour,
            minute: item.minute,
            title: item.name,
            ringDuration: item.duration * CommonConstants.DEFAULT_TOTAL_MINUTE,
            snoozeTimes: item.intervalTimes,
            timeInterval: item.intervalMinute,
            actionButton: [
                {
                    title: '关闭',
                    type: reminderAgent.ActionButtonType.ACTION_BUTTON_TYPE_CLOSE
                },
                {
                    title: '稍后提醒',
                    type: reminderAgent.ActionButtonType.ACTION_BUTTON_TYPE_SNOOZE
                },
            ],
            wantAgent: {
                pkgName: globalThis.bundleName,
                abilityName: globalThis.abilityName
            },
            notificationId: item.notificationId,
            expiredContent: 'this reminder has expired',
            snoozeContent: 'remind later',
            slotType: notification.SlotType.SERVICE_INFORMATION
        };
        if (daysOfWeek.length > 0) {
            reminder.daysOfWeek = daysOfWeek;
        }
        return reminder;
    }
}
