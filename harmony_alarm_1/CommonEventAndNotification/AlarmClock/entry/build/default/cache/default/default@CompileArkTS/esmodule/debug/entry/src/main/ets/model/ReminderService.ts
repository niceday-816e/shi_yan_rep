import reminderAgent from "@ohos:reminderAgentManager";
import notification from "@ohos:notificationManager";
import { CommonConstants } from "@bundle:com.huawei.alarmclock/entry/ets/common/constants/CommonConstants";
import type ReminderItem from '../common/bean/ReminderItemBean';
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
        }).catch((err: Error) => {
            console.error('Enable notification failed because ' + JSON.stringify(err));
        });
    }
    /**
     * Adding and modifying alarm reminders
     *
     * @param alarmItem ReminderItem
     * @param callback callback
     * @return Promise<number> reminder id
     */
    public addReminder(alarmItem: ReminderItem, callback?: (reminderId: number) => void): Promise<number> {
        let reminder: reminderAgent.ReminderRequestAlarm = this.initReminder(alarmItem);
        return reminderAgent.publishReminder(reminder).then((reminderId: number) => {
            if (callback != null) {
                callback(reminderId);
            }
            return reminderId;
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
    private initReminder(item: ReminderItem): reminderAgent.ReminderRequestAlarm {
        return {
            reminderType: item.remindType,
            hour: item.hour,
            minute: item.minute,
            daysOfWeek: item.repeatDays,
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
    }
}
