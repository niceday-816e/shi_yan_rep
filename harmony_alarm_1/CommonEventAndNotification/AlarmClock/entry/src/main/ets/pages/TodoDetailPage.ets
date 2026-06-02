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
import { TodoDataStore, TodoItem } from '../common/utils/TodoDataStore';

@Entry
@Component
struct TodoDetailPage {
  private dataStore: TodoDataStore = TodoDataStore.getInstance();
  private todoId: number = 0;
  @State todoItem: TodoItem | undefined = undefined;

  aboutToAppear(): void {
    let params = router.getParams() as Record<string, number>;
    if (params && params['todoId'] !== undefined) {
      this.todoId = params['todoId'];
      this.todoItem = this.dataStore.getTodoById(this.todoId);
    }
  }

  /**
   * Format timestamp to readable time string.
   */
  private formatTime(timestamp: number): string {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
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
          router.back();
        })

        Text('待办详情')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#182431')
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
      }
      .width('100%')
      .height(56)
      .padding({ left: 12, right: 12 })

      if (this.todoItem) {
        Column() {
          // Title section
          Column() {
            Text(this.todoItem.title)
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontColor('#182431')
              .width('100%')

            Row() {
              Text('创建时间：')
                .fontSize(13)
                .fontColor('#999999')
              Text(this.formatTime(this.todoItem.createTime))
                .fontSize(13)
                .fontColor('#999999')
            }
            .width('100%')
            .margin({ top: 8 })
          }
          .width('100%')
          .padding(16)
          .alignItems(HorizontalAlign.Start)

          Divider()
            .strokeWidth(1)
            .color('#E5E7EB')

          // Content section
          Column() {
            Text('内容')
              .fontSize(14)
              .fontColor('#666666')
              .width('100%')
              .margin({ bottom: 12 })

            if (this.todoItem.content && this.todoItem.content.length > 0) {
              Text(this.todoItem.content)
                .fontSize(15)
                .fontColor('#182431')
                .lineHeight(24)
                .width('100%')
            } else {
              Text('暂无内容')
                .fontSize(15)
                .fontColor('#CCCCCC')
                .fontStyle(FontStyle.Italic)
                .width('100%')
            }
          }
          .width('100%')
          .padding(16)
          .alignItems(HorizontalAlign.Start)
        }
        .width('100%')
        .borderRadius(16)
        .backgroundColor('#FFFFFF')
        .margin({ top: 16, left: 16, right: 16 })
      } else {
        Column() {
          Text('待办事项不存在')
            .fontSize(16)
            .fontColor('#999999')
            .margin({ top: 60 })
        }
        .width('100%')
        .layoutWeight(1)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }
}
