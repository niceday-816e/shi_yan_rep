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

/**
 * Data type utils.
 */
export default class DataTypeUtils {
  /**
   * return value is number.
   *
   * @return boolean.
   */
  static isNumber(value: Object): boolean {
    return typeof value === 'number' && isFinite(value as number);
  }

  /**
   * return obj is null.
   *
   * @return boolean.
   */
  static isNull(obj: Object): boolean {
    return (typeof obj === 'undefined' || obj == null || obj === '');
  }

  /**
   * return new deep copy object from obj.
   *
   * @return type in obj.
   */
  static deepCopy(obj: Object): Object {
    let newObj: Record<string, Object> = {};
    let isArray: boolean = Array.isArray(obj);
    if (isArray) {
      let arr: Object[] = obj as Object[];
      let resultArr: Object[] = [];
      for (let k: number = 0; k < arr.length; k++) {
        let item: Object = arr[k];
        if (typeof item === 'object' && item !== null) {
          resultArr[k] = DataTypeUtils.deepCopy(item);
        } else {
          resultArr[k] = item;
        }
      }
      return resultArr;
    }
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    let keys: string[] = Object.keys(obj);
    let record: Record<string, Object> = obj as Record<string, Object>;
    for (let k: number = 0; k < keys.length; k++) {
      let key: string = keys[k];
      let val: Object = record[key];
      if (typeof val === 'object' && val !== null) {
        newObj[key] = DataTypeUtils.deepCopy(val);
      } else {
        newObj[key] = val;
      }
    }
    return newObj;
  }
}