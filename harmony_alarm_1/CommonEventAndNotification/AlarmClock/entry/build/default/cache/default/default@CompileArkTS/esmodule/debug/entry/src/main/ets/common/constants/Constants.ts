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
// ======================== Common constants ========================
/**
 * database preference id.
 */
export const PREFERENCE_ID = 'storageId';
/**
 * database alarm data key.
 */
export const ALARM_KEY = 'alarmData';
interface CommonConstantsType {
    FULL_LENGTH: string;
    DEFAULT_STRING_SPACE: string;
    DEFAULT_STRING_COMMA: string;
    DEFAULT_STRING_NO_REPEAT: string;
    DEFAULT_NUMBER_NEGATIVE: number;
    DEFAULT_LAYOUT_WEIGHT: number;
    DEFAULT_NUMBER_MONDAY: number;
    DEFAULT_NUMBER_TUESDAY: number;
    DEFAULT_NUMBER_WEDNESDAY: number;
    DEFAULT_NUMBER_THURSDAY: number;
    DEFAULT_NUMBER_FRIDAY: number;
    DEFAULT_NUMBER_SATURDAY: number;
    DEFAULT_NUMBER_SUNDAY: number;
    DEFAULT_SINGLE: number;
    DEFAULT_DOUBLE: number;
    DEFAULT_DATA_PICKER_HOUR_SELECTION: number;
    DEFAULT_TOTAL_MINUTE: number;
    DEFAULT_STRING_MONDAY: string;
    DEFAULT_STRING_TUESDAY: string;
    DEFAULT_STRING_WEDNESDAY: string;
    DEFAULT_STRING_THURSDAY: string;
    DEFAULT_STRING_FRIDAY: string;
    DEFAULT_STRING_SATURDAY: string;
    DEFAULT_STRING_SUNDAY: string;
    DEFAULT_INTERVAL_STEP: number;
    DEFAULT_COMMON_DEGREE: number;
    DEFAULT_POINTER_WIDTH: number;
    DEFAULT_TOTAL_HOUR: number;
    DEFAULT_INTERVAL_TIME_MAX: number;
    DEFAULT_INTERVAL_MINUTE_MAX: number;
}
export const CommonConstants: CommonConstantsType = {
    /**
     * common full length
     */
    FULL_LENGTH: '100%',
    /**
     * default string space.
     */
    DEFAULT_STRING_SPACE: ' ',
    /**
     * default string comma.
     */
    DEFAULT_STRING_COMMA: '，',
    /**
     * default string no repeat.
     */
    DEFAULT_STRING_NO_REPEAT: '不重复',
    /**
     * default number negative.
     */
    DEFAULT_NUMBER_NEGATIVE: -1,
    /**
     * default layout weight.
     */
    DEFAULT_LAYOUT_WEIGHT: 1,
    /**
     * default number monday.
     */
    DEFAULT_NUMBER_MONDAY: 1,
    /**
     * default number tuesday.
     */
    DEFAULT_NUMBER_TUESDAY: 2,
    /**
     * default number wednesday.
     */
    DEFAULT_NUMBER_WEDNESDAY: 3,
    /**
     * default number thursday.
     */
    DEFAULT_NUMBER_THURSDAY: 4,
    /**
     * default number friday.
     */
    DEFAULT_NUMBER_FRIDAY: 5,
    /**
     * default number saturday.
     */
    DEFAULT_NUMBER_SATURDAY: 6,
    /**
     * default number sunday.
     */
    DEFAULT_NUMBER_SUNDAY: 7,
    /**
     * default single.
     */
    DEFAULT_SINGLE: 1,
    /**
    * default double.
    */
    DEFAULT_DOUBLE: 2,
    /**
     * default data picker hour selection.
     */
    DEFAULT_DATA_PICKER_HOUR_SELECTION: 2,
    /**
     * default total minute.
     */
    DEFAULT_TOTAL_MINUTE: 60,
    /**
     * default string monday.
     */
    DEFAULT_STRING_MONDAY: '周一',
    /**
     * default string tuesday.
     */
    DEFAULT_STRING_TUESDAY: '周二',
    /**
     * default string wednesday.
     */
    DEFAULT_STRING_WEDNESDAY: '周三',
    /**
     * default string thursday.
     */
    DEFAULT_STRING_THURSDAY: '周四',
    /**
     * default string friday.
     */
    DEFAULT_STRING_FRIDAY: '周五',
    /**
     * default string saturday.
     */
    DEFAULT_STRING_SATURDAY: '周六',
    /**
     * default string sunday.
     */
    DEFAULT_STRING_SUNDAY: '周日',
    /**
     * default interval step.
     */
    DEFAULT_INTERVAL_STEP: 5,
    /**
     * default common degree
     */
    DEFAULT_COMMON_DEGREE: 6,
    /**
     * default pointer width.
     */
    DEFAULT_POINTER_WIDTH: 10,
    /**
     * default total hour.
     */
    DEFAULT_TOTAL_HOUR: 12,
    /**
     * default interval time max.
     */
    DEFAULT_INTERVAL_TIME_MAX: 10,
    /**
     * default interval minute max.
     */
    DEFAULT_INTERVAL_MINUTE_MAX: 30,
};
// ======================== Detail constants ========================
export interface DayDataItem {
    timeType: number;
    delSelect: number;
    data: string[];
}
interface DetailConstantType {
    DAY_DATA: DayDataItem[];
    WEEKDAY_DATA: number[];
    RING_DURATION: number[];
    DEFAULT_STRING_MINUTE: string;
    DEFAULT_STRING_GROUP_NAME: string;
    DEFAULT_PROVIDER_KEY: string;
    DEFAULT_STRING_REPEAT: string;
    DEFAULT_STRING_ALARM_NAME: string;
    DEFAULT_STRING_INTERVAL: string;
    DEFAULT_STRING_DURATION: string;
    DEFAULT_STRING_TIMES: string;
    DEFAULT_STRING_RING_DATE: string;
}
/**
 * Detail page constant description.
 */
export const DetailConstant: DetailConstantType = {
    /**
     * detail page day data.
     */
    DAY_DATA: [
        { timeType: 0, delSelect: 0, data: ['上午', '下午'] },
        { timeType: 1, delSelect: 0, data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] },
        { timeType: 2, delSelect: 0, data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
                '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36',
                '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48',
                '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '00',
            ] }
    ],
    /**
     * week day data.
     */
    WEEKDAY_DATA: [1, 2, 3, 4, 5, 6, 7],
    /**
     * ring duration list data.
     */
    RING_DURATION: [1, 5, 10, 15, 20, 30],
    /**
     * default string minute.
     */
    DEFAULT_STRING_MINUTE: '分钟',
    /**
     * default string group name.
     */
    DEFAULT_STRING_GROUP_NAME: 'radioGroup',
    /**
     * default string provider key.
     */
    DEFAULT_PROVIDER_KEY: 'alarmItemProvide',
    /**
     * default string repeat.
     */
    DEFAULT_STRING_REPEAT: '重复',
    /**
     * default string alarm name.
     */
    DEFAULT_STRING_ALARM_NAME: '闹钟名',
    /**
     * default string interval.
     */
    DEFAULT_STRING_INTERVAL: '再响间隔',
    /**
     * default string duration.
     */
    DEFAULT_STRING_DURATION: '闹铃时长',
    /**
     * default string times.
     */
    DEFAULT_STRING_TIMES: '次',
    /**
     * default string ring date.
     */
    DEFAULT_STRING_RING_DATE: '响铃日期',
};
// ======================== Main constants ========================
interface MainConstantType {
    DEFAULT_SINGLE_DIGIT_MAX: number;
    DEFAULT_HORIZONTAL_ANGLE: number;
    DEFAULT_ONE_SECOND_MS: number;
    DEFAULT_ZEROING: string;
    DEFAULT_STRING_MORNING: string;
    DEFAULT_STRING_AFTERNOON: string;
    DEFAULT_STRING_ALARM: string;
    DEFAULT_STRING_NULL: string;
    DEFAULT_STRING_COLON: string;
    CLOCK_TIME_FONT_SIZE_UNIT: string;
    HOUR_POINTER_IMAGE_URL: string;
    MINUTE_POINTER_IMAGE_URL: string;
    SECOND_POINTER_IMAGE_URL: string;
    CLOCK_PAN_IMAGE_URL: string;
}
/**
 * Main page constant description.
 */
export const MainConstant: MainConstantType = {
    /**
     * Default single digit max.
     */
    DEFAULT_SINGLE_DIGIT_MAX: 9,
    /**
     * Default horizontal angle.
     */
    DEFAULT_HORIZONTAL_ANGLE: 180,
    /**
     * Default one second ms.
     */
    DEFAULT_ONE_SECOND_MS: 1000,
    /**
     * Default zeroing.
     */
    DEFAULT_ZEROING: "0",
    /**
     * Default string morning.
     */
    DEFAULT_STRING_MORNING: '上午',
    /**
     * Default string afternoon.
     */
    DEFAULT_STRING_AFTERNOON: '下午',
    /**
     * Default string alarm name.
     */
    DEFAULT_STRING_ALARM: '闹钟',
    /**
     * Default string quotation.
     */
    DEFAULT_STRING_NULL: "",
    /**
     * Default string colon.
     */
    DEFAULT_STRING_COLON: ':',
    /**
     * Default clock time font size unit.
     */
    CLOCK_TIME_FONT_SIZE_UNIT: 'px',
    /**
     * Hour pointer image url.
     */
    HOUR_POINTER_IMAGE_URL: "../../../resources/base/media/ic_hour_pointer.png",
    /**
     * Minute pointer image url.
     */
    MINUTE_POINTER_IMAGE_URL: "../../../resources/base/media/ic_minute_pointer.png",
    /**
     * Second pointer image url.
     */
    SECOND_POINTER_IMAGE_URL: "../../../resources/base/media/ic_second_pointer.png",
    /**
     * Clock pan image url.
     */
    CLOCK_PAN_IMAGE_URL: '../../../resources/base/media/ic_clock_pan.png',
};
