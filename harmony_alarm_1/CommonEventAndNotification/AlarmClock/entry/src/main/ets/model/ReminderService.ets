/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import reminderAgent from '@ohos.reminderAgentManager';
import notification from '@ohos.notificationManager';
import { CommonConstants } from '../common/constants/Constants';
import AlarmItem from '../common/bean/AlarmItemBean';

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
    // 优先使用 ringDates，如果 ringDates 为空则使用 repeatDays
    let daysOfWeek: number[] = [];
    if (item.ringDates && item.ringDates.length > 0) {
      daysOfWeek = item.ringDates;
    } else if (item.repeatDays && item.repeatDays.length > 0) {
      daysOfWeek = item.repeatDays;
    }
    
    return {
      reminderType: item.remindType,
      hour: item.hour,
      minute: item.minute,
      daysOfWeek: daysOfWeek,
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
