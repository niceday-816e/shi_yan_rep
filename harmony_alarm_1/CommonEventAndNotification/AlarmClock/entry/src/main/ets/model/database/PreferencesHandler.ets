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

import { preferences } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { PREFERENCE_ID } from '../../common/constants/CommonConstants';
import PreferencesListener from './PreferencesListener';

/**
 * Based on lightweight databases preferences handler.
 */
export default class PreferencesHandler {
  private static instance: PreferencesHandler;
  private preferences: preferences.Preferences | null = null;
  private defaultValue: string = '';
  private listeners: PreferencesListener[];

  private constructor() {
    this.listeners = new Array();
  }

  /**
   * Get PreferencesHandler instance.
   *
   * @return instance
   */
  public static getInstance(): PreferencesHandler {
    if (PreferencesHandler.instance == null) {
      PreferencesHandler.instance = new PreferencesHandler();
    }
    return PreferencesHandler.instance;
  }

  /**
   * Configure PreferencesHandler.
   *
   * @param context Context
   */
  public async configure(context: common.Context): Promise<void> {
    this.preferences = preferences.getPreferencesSync(context, { name: PREFERENCE_ID });
    this.preferences.on('change', (key: string) => {
      for (let preferencesListener of this.listeners) {
        preferencesListener.onDataChanged(key);
      }
    });
  }

  /**
   * Set data in PreferencesHandler.
   *
   * @param key string
   * @param value Object
   */
  public async set(key: string, value: Object): Promise<void> {
    if (this.preferences != null) {
      await this.preferences.put(key, value as preferences.ValueType);
      await this.preferences.flush();
    }
  }

  /**
   * Get data in PreferencesHandler.
   *
   * @param key string
   * @param defValue Object
   * @return data about key
   */
  public async get(key: string, defValue?: Object): Promise<Object> {
    let data: preferences.ValueType = this.defaultValue;
    if (this.preferences != null) {
      data = await this.preferences.get(key, (defValue ?? this.defaultValue) as preferences.ValueType);
    }
    return data as Object;
  }

  /**
   * Clear data in PreferencesHandler.
   */
  public async clear(): Promise<void> {
    if (this.preferences != null) {
      await this.preferences.clear();
    }
  }

  /**
   * Get all data in PreferencesHandler.
   *
   * @return data
   */
  public async getAll(): Promise<Object> {
    if (this.preferences != null) {
      return this.preferences.getAll();
    }
    let emptyRecord: Record<string, preferences.ValueType> = {};
    return emptyRecord;
  }

  /**
   * Add preferences listener in PreferencesHandler.
   *
   * @param listener PreferencesListener
   */
  public addPreferencesListener(listener: PreferencesListener): void {
    this.listeners.push(listener);
  }
}
