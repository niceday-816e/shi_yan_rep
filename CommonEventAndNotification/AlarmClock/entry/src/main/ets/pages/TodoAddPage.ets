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

import router from '@ohos.router';
import { TodoDataStore } from '../common/utils/TodoDataStore';

@Entry
@Component
struct TodoAddPage {
  private dataStore: TodoDataStore = TodoDataStore.getInstance();
  @State inputTitle: string = '';
  @State inputContent: string = '';
  @StorageLink('todoRefreshTrigger') refreshTrigger: number = 0;

  /**
   * Navigate back without saving.
   */
  private goBack(): void {
    router.back();
  }

  /**
   * Save the todo item and navigate back.
   */
  private saveTodo(): void {
    if (this.inputTitle.trim().length > 0) {
      this.dataStore.addTodo(this.inputTitle.trim(), this.inputContent.trim());
      AppStorage.set('todoRefreshTrigger', Date.now());
      router.back();
    }
  }

  build(): void {
    Column() {
      // Title bar with back button
      Row() {
        Button() {
          Text('← 返回')
            .fontSize(16)
            .fontColor('#007DFF')
        }
        .backgroundColor(Color.Transparent)
        .onClick(() => {
          this.goBack();
        })

        Text('新建待办')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#182431')
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
      }
      .width('100%')
      .height(56)
      .padding({ left: 12, right: 12 })

      // Input area
      Column() {
        // Title input
        Text('待办标题')
          .fontSize(14)
          .fontColor('#666666')
          .width('100%')
          .margin({ bottom: 8 })

        TextInput({ text: this.inputTitle, placeholder: '请输入待办事项标题' })
          .width('100%')
          .height(48)
          .fontSize(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .padding({ left: 16, right: 16 })
          .border({ width: 1, color: '#E5E7EB' })
          .onChange((value: string) => {
            this.inputTitle = value;
          })

        // Divider
        Divider()
          .strokeWidth(1)
          .color('#E5E7EB')
          .margin({ top: 20, bottom: 20 })

        // Content input
        Text('内容')
          .fontSize(14)
          .fontColor('#666666')
          .width('100%')
          .margin({ bottom: 8 })

        TextArea({ text: this.inputContent, placeholder: '请输入待办事项的具体内容（选填）' })
          .width('100%')
          .height(160)
          .fontSize(15)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .padding({ left: 16, right: 16, top: 12, bottom: 12 })
          .border({ width: 1, color: '#E5E7EB' })
          .onChange((value: string) => {
            this.inputContent = value;
          })
      }
      .width('100%')
      .padding(16)

      Blank()

      // Bottom buttons
      Row() {
        Button('取消')
          .fontSize(16)
          .fontColor('#666666')
          .layoutWeight(1)
          .height(48)
          .backgroundColor('#F1F3F5')
          .borderRadius(12)
          .margin({ right: 8 })
          .onClick(() => {
            this.goBack();
          })

        Button('保存')
          .fontSize(16)
          .fontColor('#FFFFFF')
          .layoutWeight(2)
          .height(48)
          .backgroundColor(this.inputTitle.trim().length > 0 ? '#007DFF' : '#B0C4DE')
          .borderRadius(12)
          .margin({ left: 8 })
          .enabled(this.inputTitle.trim().length > 0)
          .onClick(() => {
            this.saveTodo();
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 24 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }
}
