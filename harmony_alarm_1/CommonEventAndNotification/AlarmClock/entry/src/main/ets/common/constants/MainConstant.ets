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

interface MainConstantType {
  TIMES: number[];
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
   * Main page times list.
   */
  TIMES: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],

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
}
