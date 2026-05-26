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
@Observed export default class AlarmItemBean extends ReminderItemBean {
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
