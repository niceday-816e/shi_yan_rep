# AlarmClockETS 工程文件描述

## 1. 工程概述

**项目名称：** AlarmClockETS（闹钟应用）

**项目类型：** OpenHarmony / HarmonyOS Codelab 示例教程项目

**技术栈：** ArkTS + ArkUI（Stage 模型）+ Hvigor 构建系统

**SDK 版本：** HarmonyOS SDK 6.0.2 (API 22)

**许可证：** Apache License 2.0

**所属仓库：** [OpenHarmony Codelabs](https://gitee.com/sebuntin/codelabs.git)

**分类目录：** CommonEventAndNotification（公共事件与通知）

**应用包名：** com.huawei.alarmclock

**版本号：** 1.0.0 (versionCode: 1000000)

---

## 2. 工程目录结构

```
AlarmClock/
├── README.md                              # 中文教程文档（含概念讲解、环境搭建、分步实现说明）
├── LICENSE                                # Apache License 2.0
├── build-profile.json5                    # 项目级构建配置（SDK版本、产品定义、模块声明）
├── hvigorfile.ts                          # 根级 Hvigor 构建脚本（导出 appTasks）
├── oh-package.json5                       # OHPM 包清单（项目名/版本/依赖）
├── oh-package-lock.json5                  # 依赖锁文件（@ohos/hypium@1.0.16）
├── local.properties                       # 本地 SDK 路径配置
│
├── AppScope/                              # 应用级配置
│   ├── app.json5                          # 应用清单（bundleName、版本、图标、标签）
│   └── resources/base/
│       ├── element/string.json            # 应用名称字符串资源
│       └── media/app_icon.png             # 应用图标
│
├── entry/                                 # 主模块（HAP 入口模块）
│   ├── build-profile.json5                # 模块构建配置（stageMode、apiType）
│   ├── hvigorfile.ts                      # 模块级 Hvigor 脚本（导出 hapTasks）
│   ├── oh-package.json5                   # 模块级 OHPM 包清单
│   └── src/main/
│       ├── module.json5                   # 模块清单（Ability、权限、页面路由声明）
│       ├── resources/base/
│       │   ├── element/
│       │   │   ├── string.json            # 中英文字符串资源（含权限说明、UI文本）
│       │   │   ├── color.json             # 颜色定义（8个颜色值）
│       │   │   └── dimen.json             # 尺寸常量（35+ 个浮点值）
│       │   ├── media/                     # 图片资源（时钟表盘、指针、图标等）
│       │   └── profile/
│       │       └── main_pages.json        # 页面路由配置（2个页面路径）
│       └── ets/                           # ArkTS 源码目录（详见 §3）
│
├── oh_modules/                            # OHPM 依赖包（@ohos/hypium 测试框架）
├── figures/                               # README 教程截图（GIF/PNG，中文标注）
├── public_sys-resources/                  # README 公共图标资源
├── .hvigor/                               # Hvigor 构建缓存
├── .idea/                                 # DevEco Studio IDE 配置
├── .appanalyzer/                          # 应用静态分析配置
└── signing/                               # 签名配置目录（空）
```

---

## 3. ArkTS 源码架构详解

### 3.1 源码目录总览

```
ets/
├── entryability/
│   └── EntryAbility.ets                   # 应用入口 Ability
├── pages/
│   ├── MainIndex.ets                      # 主页面（闹钟列表 + 时钟显示）
│   └── DetailIndex.ets                    # 详情页（添加/编辑/删除闹钟）
├── common/
│   ├── bean/
│   │   ├── ReminderItemBean.ets           # 提醒基础数据模型（基类）
│   │   ├── AlarmItemBean.ets              # 闹钟数据模型（继承 ReminderItem）
│   │   └── AlarmSettingBean.ets           # 设置项数据模型（标题/内容/类型）
│   ├── constants/
│   │   ├── CommonConstants.ets            # 全局常量（60+ 数值/字符串常量）
│   │   ├── MainConstant.ets               # 主页常量（时钟图片URL、时间格式化）
│   │   ├── DetailConstant.ets             # 详情页常量（选择器数据、时长列表）
│   │   └── AlarmSettingType.ets           # 设置类型枚举（REPEAT/NAME/DURATION/INTERVAL）
│   └── utils/
│       ├── DataTypeUtils.ets              # 数据类型工具（isNull/isNumber/deepCopy）
│       └── DimensionUtil.ets              # 屏幕适配工具（vp/fp/px 换算）
├── model/
│   ├── ReminderService.ets                # 系统提醒代理服务（发布/取消闹钟提醒）
│   └── database/
│       ├── PreferencesHandler.ets         # 轻量级 KV 数据库操作（增删改查+监听）
│       └── PreferencesListener.ets        # 数据变化监听接口
├── view/
│   ├── BackContainer.ets                  # 通用头部容器（返回按钮 + 标题 + 右侧插槽）
│   ├── Main/
│   │   ├── ClockArea.ets                  # Canvas 时钟组件（模拟时钟/数字时钟切换）
│   │   ├── AlarmList.ets                  # 闹钟列表组件
│   │   └── AlarmListItem.ets              # 闹钟列表项组件（含开关 Toggle）
│   └── Detail/
│       ├── DatePickArea.ets               # 时间选择器（上午/下午、时、分三列）
│       ├── SettingItem.ets                # 设置项列表（点击弹出对应弹窗）
│       └── dialog/
│           ├── CommonDialog.ets           # 通用弹窗模板（标题 + 内容插槽 + 取消/确认按钮）
│           ├── RepeatDialog.ets           # 重复日选择弹窗（周一至周日多选）
│           ├── RenameDialog.ets           # 闹钟名输入弹窗（文本输入框）
│           ├── DurationDialog.ets         # 响铃时长选择弹窗（单选列表）
│           └── IntervalDialog.ets         # 再响间隔弹窗（双滑块：间隔/次数）
└── viewmodel/
    ├── MainViewModel.ets                  # 主页视图模型（单例，数据查询、闹钟开关）
    └── DetailViewModel.ets                # 详情页视图模型（单例，CRUD 操作）
```

### 3.2 各文件详细说明

---

#### 3.2.1 entryability/EntryAbility.ets

**职责：** 应用生命周期入口，Stage 模型 UIAbility

**关键逻辑：**
- `onCreate()`：初始化全局变量（bundleName、abilityName、abilityWant、PreferenceHandler 单例）
- `onWindowStageCreate()`：获取默认显示设备信息，配置数据库上下文，加载 `pages/MainIndex` 页面

**依赖模块：**
- `@ohos.display` — 显示设备信息
- `@ohos.app.ability.UIAbility` — Stage 模型 Ability 基类
- `@ohos.window` — 窗口管理

---

#### 3.2.2 pages/MainIndex.ets

**职责：** 主页面（闹钟列表页），标注 `@Entry` 装饰器

**UI 结构（从上到下）：**
1. 标题文本 "闹钟"（粗体，左对齐）
2. `ClockArea` — Canvas 模拟时钟（点击可切换数字时钟）
3. `AlarmList` — 闹钟列表
4. `Blank()` — 弹性空白
5. 添加按钮（"+"图标）→ 点击跳转 `pages/DetailIndex`

**生命周期：**
- `aboutToAppear()`：调用 `MainViewModel.queryAlarmsTasker()` 查询所有闹钟数据并绑定到 `@State alarmItems`

**状态变量：**
- `@State alarmItems: Array<AlarmItem>` — 闹钟列表数据
- `@State isAuth: boolean` — 授权状态

---

#### 3.2.3 pages/DetailIndex.ets

**职责：** 闹钟详情页（新建/编辑/删除），标注 `@Entry` 装饰器

**UI 结构（从上到下）：**
1. `BackContainer` — 标题栏（新建闹钟 / 编辑闹钟）+ 确认按钮
2. `DatePickArea` — 时间选择器（上午/下午 + 时 + 分）
3. `SettingItem` × 2 — 闹钟设置项（重复 / 闹钟名 / 响铃时长 / 再响间隔）
4. `Blank()` — 弹性空白
5. 删除按钮（仅编辑模式可见）→ 调用 `removeAlarmRemind()` 后返回

**路由参数：**
```typescript
interface DetailParams {
  alarmItem: AlarmItem;  // 编辑时传入已有闹钟数据
}
```

**核心流程：**
- 接收路由参数 → 若无参数则为新建模式（`isNow = true`），否则为编辑模式
- 确认按钮：调用 `DetailViewModel.setAlarmRemind()` 保存闹钟 → 返回主页
- 删除按钮：调用 `DetailViewModel.removeAlarmRemind()` 删除闹钟 → 返回主页

**状态管理：**
- `@Provide(DetailConstant.DEFAULT_PROVIDER_KEY)` alarmItem — 跨组件共享闹钟数据
- `@Watch('onAlarmItemChange')` — 监听 alarmItem 变化，重新初始化设置项数据

---

#### 3.2.4 common/bean/ReminderItemBean.ets

**职责：** 提醒基础数据模型（POJO 类）

**字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| id | number | 0 | 提醒 ID（系统分配） |
| remindType | ReminderType | REMINDER_TYPE_ALARM | 提醒类型（闹钟） |
| name | string | '' | 提醒名称 |
| hour | number | 0 | 小时 (0-23) |
| minute | number | 0 | 分钟 (0-59) |
| duration | number | 0 | 响铃时长 |
| intervalMinute | number | 0 | 再响间隔（分钟） |
| intervalTimes | number | 0 | 再响次数 |
| repeatDays | Array\<number\> | [] | 重复日（1-7 表示周一至周日） |
| notificationId | number | 0 | 通知 ID |

---

#### 3.2.5 common/bean/AlarmItemBean.ets

**职责：** 闹钟数据模型，继承 `ReminderItemBean`，标注 `@Observed` 实现响应式

**新增字段：**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | '闹钟' | 闹钟自定义名称 |
| isOpen | boolean | true | 是否开启 |
| isRepeat | boolean | false | 是否重复 |
| duration | number | 5 | 响铃时长（分钟） |
| intervalMinute | number | 10 | 再响间隔（分钟） |
| intervalTimes | number | 3 | 再响次数 |
| notificationId | number | 0 | 通知 ID |

---

#### 3.2.6 common/bean/AlarmSettingBean.ets

**职责：** 详情页设置项数据模型

**字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| title | string | 设置项标题（如"重复"、"闹钟名"等） |
| content | string | 设置项当前值（如"不重复"、"10分钟"等） |
| sType | AlarmSettingType | 设置类型枚举，决定点击后弹出哪个弹窗 |

---

#### 3.2.7 common/constants/CommonConstants.ets

**职责：** 全局公共常量定义

**常量分类：**
- **数据库常量：** `PREFERENCE_ID = 'storageId'`、`ALARM_KEY = 'alarmData'`、`PARAM_KEY = 'alarmItem'`
- **布局常量：** `FULL_LENGTH = '100%'`、`DEFAULT_LAYOUT_WEIGHT = 1`
- **数字常量：** `DEFAULT_SINGLE = 1`、`DEFAULT_DOUBLE = 2`、`DEFAULT_TOTAL_HOUR = 12`、`DEFAULT_TOTAL_MINUTE = 60` 等
- **星期映射：** 1→'周一'、2→'周二'、...、7→'周日'
- **Canvas 常量：** `DEFAULT_COMMON_DEGREE = 6`（每刻度6°）、`DEFAULT_POINTER_WIDTH = 10`
- **间隔限制：** `DEFAULT_INTERVAL_TIME_MAX = 10`、`DEFAULT_INTERVAL_MINUTE_MAX = 30`

---

#### 3.2.8 common/constants/MainConstant.ets

**职责：** 主页面相关常量

| 常量 | 类型 | 值 | 说明 |
|------|------|-----|------|
| TIMES | number[] | [3,4,5,6,7,8,9,10,11,12,1,2] | 钟表刻度列表 |
| DEFAULT_ONE_SECOND_MS | number | 1000 | 1秒毫秒数（Canvas 刷新间隔） |
| DEFAULT_HORIZONTAL_ANGLE | number | 180 | 旋转偏移角度 |
| HOUR_POINTER_IMAGE_URL | string | 时针图片路径 | Canvas 时针素材 |
| MINUTE_POINTER_IMAGE_URL | string | 分针图片路径 | Canvas 分针素材 |
| SECOND_POINTER_IMAGE_URL | string | 秒针图片路径 | Canvas 秒针素材 |
| CLOCK_PAN_IMAGE_URL | string | 表盘图片路径 | Canvas 表盘素材 |

---

#### 3.2.9 common/constants/DetailConstant.ets

**职责：** 详情页相关常量

**核心数据结构：**
```typescript
interface DayDataItem {
  timeType: number;   // 0=上午/下午, 1=小时, 2=分钟
  delSelect: number;  // 当前选中索引
  data: string[];     // 可选数据列表
}
```

**数据内容：**
- `DAY_DATA[0]`：['上午', '下午'] — 上午/下午选择器
- `DAY_DATA[1]`：['01'-'12'] — 12 小时制选择器
- `DAY_DATA[2]`：['01'-'59', '00'] — 分钟选择器（0-59）
- `WEEKDAY_DATA`：[1,2,3,4,5,6,7] — 一周七天
- `RING_DURATION`：[1,5,10,15,20,30] — 响铃时长选项（分钟）

---

#### 3.2.10 common/constants/AlarmSettingType.ets

**职责：** 闹钟设置类型枚举

```typescript
enum AlarmSettingType {
  REPEAT,        // 重复设置
  ALARM_NAME,    // 闹钟名设置
  RING_DURATION, // 响铃时长设置
  INTERVAL       // 再响间隔设置
}
```

**用途：** 在 `SettingItem` 组件中，根据 `sType` 值决定弹出哪个 `CustomDialog`

---

#### 3.2.11 common/utils/DataTypeUtils.ets

**职责：** 数据类型判断与深拷贝工具类

**静态方法：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| isNumber(value) | Object | boolean | 判断值是否为有效数字 |
| isNull(obj) | Object | boolean | 判断值是否为 undefined/null/空字符串 |
| deepCopy(obj) | Object | Object | 递归深拷贝对象/数组 |

---

#### 3.2.12 common/utils/DimensionUtil.ets

**职责：** 屏幕适配工具类（vp/fp/px 换算）

**核心方法：**
- `getVp(resource)` — 将设计尺寸转换为虚拟像素（vp），根据屏幕宽度等比缩放
- `getFp(resource)` — 将设计字号转换为虚拟字号（fp）
- `getPx(resource)` — 将设计尺寸转换为实际像素（px）

**适配策略：** 基于设计稿基准宽度与实际屏幕宽度的比例进行缩放

---

#### 3.2.13 model/ReminderService.ets

**职责：** 封装系统提醒代理 API，管理闹钟的发布与取消

**核心方法：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| openNotificationPermission() | — | void | 请求通知权限（requestEnableNotification） |
| addReminder(alarmItem, callback?) | ReminderItem, callback | Promise\<number\> | 发布系统闹钟提醒，返回 reminderId |
| deleteReminder(reminderId) | number | void | 取消指定 reminderId 的系统提醒 |

**内部逻辑：**
- `initReminder(item)` 构建 `ReminderRequestAlarm` 对象：
  - `reminderType`：REMINDER_TYPE_ALARM
  - `hour/minute`：闹钟时间
  - `daysOfWeek`：重复日数组
  - `ringDuration`：响铃时长（秒） = duration × 60
  - `snoozeTimes / timeInterval`：再响次数/间隔
  - `actionButton`：["关闭", "稍后提醒"] 两个操作按钮
  - `wantAgent`：点击通知唤起 EntryAbility
  - `slotType`：SERVICE_INFORMATION

**依赖模块：**
- `@ohos.reminderAgentManager` — 系统提醒代理
- `@ohos.notificationManager` — 通知管理（权限请求、Slot 类型）

---

#### 3.2.14 model/database/PreferencesHandler.ets

**职责：** 封装 OpenHarmony 轻量级 KV 数据库（Preferences），支持增删改查与数据变化监听

**设计模式：** 单例模式（`getInstance()`）

**核心方法：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| configure(context) | common.Context | Promise\<void\> | 初始化 Preferences 实例，注册 onChange 事件 |
| set(key, value) | string, Object | Promise\<void\> | 写入数据并立即 flush |
| get(key, defValue?) | string, Object? | Promise\<Object\> | 读取数据 |
| clear() | — | Promise\<void\> | 清空所有数据 |
| getAll() | — | Promise\<Object\> | 获取所有键值对 |
| addPreferencesListener(listener) | PreferencesListener | void | 注册数据变化监听器 |

**监听机制：**
- 维护 `listeners: PreferencesListener[]` 数组
- 当数据库数据变更时，遍历所有 listener 并回调 `onDataChanged(key)`
- 主页通过监听器实现了数据库变化 → UI 自动刷新的响应式效果

**依赖模块：**
- `@kit.ArkData` — 数据管理 Kit（`preferences` API）
- `@kit.AbilityKit` — 能力 Kit（`common.Context`）

---

#### 3.2.15 model/database/PreferencesListener.ets

**职责：** 数据变化监听接口定义

```typescript
interface PreferencesListener {
  onDataChanged(key: string): void;
}
```

---

#### 3.2.16 viewmodel/MainViewModel.ets

**职责：** 主页业务逻辑视图模型（单例模式）

**核心方法：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| getInstant() | — | MainViewModel | 获取单例实例 |
| queryAlarmsTasker(callback) | callback | void | 查询闹钟数据并注册数据变化监听 |
| openAlarm(id, isOpen) | number, boolean | void | 开启/关闭闹钟（更新数据库 + 发布/取消系统提醒） |
| fillZero(val) | number | string | 个位数补零（8→"08"） |
| getNoonContent(hour) | number | string | 获取上/下午文本（<12→"上午", >=12→"下午"） |
| getTaskTimeContent(hour, minute) | number, number | string | 格式化时间文本（"08:30"） |
| getDescContent(alarmItem) | AlarmItem | string | 获取闹钟描述（名称 + 重复日） |
| getAlarmRepeatDayContent(repeatDays) | Array\<number\> | string | 将数字星期数组转为文本 |

---

#### 3.2.17 viewmodel/DetailViewModel.ets

**职责：** 详情页业务逻辑视图模型（单例模式）

**核心方法：**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| getInstant() | — | DetailViewModel | 获取单例实例 |
| transAlarmRepeatDayContent(repeatDay) | number | string | 数字转星期文本 |
| setAlarmDefaultTime(alarmItem?) | AlarmItem? | void | 设置时间选择器初始值（新建取当前时间，编辑取已有时间） |
| setAlarmRemind(alarmItem) | AlarmItem | Promise\<void\> | 保存闹钟（先存储数据，再发布系统提醒，失败不影响已保存数据） |
| removeAlarmRemind(id) | number | Promise\<void\> | 删除闹钟（取消系统提醒 + 从数据库移除） |

**保存流程（setAlarmRemind）：**
1. 从时间选择器解析 hour 和 minute
2. 查找闹钟是否已存在（findAlarmWithId）
3. 若存在：先取消旧系统提醒
4. 若不存在：以数组长度为 notificationId，新增至数组
5. 将数组保存至 Preferences 数据库
6. 调用 `ReminderService.addReminder()` 发布系统提醒
7. 成功：更新 `alarmItem.id` 和 `isOpen`，重新持久化
8. 失败：仅输出错误日志（数据已保存，不会丢失）

---

#### 3.2.18 view/BackContainer.ets

**职责：** 通用标题栏容器组件

**参数：**
- `header: string | Resource` — 标题文本
- `backImgRes: string | Resource` — 返回按钮图片
- `backFunc?: () => void` — 自定义返回逻辑（默认调用 `router.back()`）
- `@BuilderParam closer` — 右侧插槽（详情页挂载确认按钮）

**UI 结构：** Row → [返回按钮 + 标题 + Blank + 右侧插槽]

---

#### 3.2.19 view/Main/ClockArea.ets

**职责：** Canvas 时钟组件，支持模拟时钟和数字时钟切换

**核心逻辑：**
- 使用 `CanvasRenderingContext2D` 绘制
- `showClock = true`：显示模拟时钟（表盘背景 + 时/分/秒指针旋转）
- `showClock = false`：显示数字时钟（"HH:MM:SS" 文本）
- 点击切换显示模式
- 每秒（1000ms）重绘一次

**绘制流程：**
1. `drawPan()`：绘制表盘背景图
2. `drawPointer(degree, imgUrl)`：根据角度旋转并绘制指针图片
3. `drawTime(h, m, s)`：绘制数字时间文本

---

#### 3.2.20 view/Main/AlarmList.ets

**职责：** 闹钟列表组件

**参数：**
- `@Link alarmItems: Array<AlarmItem>` — 父组件双向绑定的闹钟数据

**UI：** `List` + `ForEach` 渲染每个 `AlarmListItem`
- 点击列表项 → 跳转 `pages/DetailIndex`，携带 `alarmItem` 参数用于编辑

---

#### 3.2.21 view/Main/AlarmListItem.ets

**职责：** 单个闹钟列表项组件

**UI 结构：**
```
Row ─┬─ Column ─┬─ Row [上下午文本 + 时间文本]
     │          └─ Text [闹钟描述：名称 + 重复日]
     └─ Toggle Switch [开关状态，isOpen 双向绑定]
```

**交互：**
- Toggle 开关 → 调用 `MainViewModel.openAlarm(id, isOpen)` 开启/关闭闹钟

**样式扩展：** `@Extend(Text) function CommonTextAttr()` 统一文本样式

---

#### 3.2.22 view/Detail/DatePickArea.ets

**职责：** 时间选择器组件（三列联动）

**UI：** `Stack` + `Row` 包含三个 `TextPicker`：
1. 上午/下午选择器（"上午" | "下午"）
2. 小时选择器（01-12）
3. 分钟选择器（01-59, 00）

**数据源：** `DetailConstant.DAY_DATA`

**交互：** 每个 `TextPicker` 的 `onChange` 更新对应 `DayDataItem.delSelect` 索引

---

#### 3.2.23 view/Detail/SettingItem.ets

**职责：** 闹钟详情设置项列表组件

**参数：**
- `@Link settingInfo: Array<AlarmSettingBean>` — 设置项数据

**UI：** `Column` + `ForEach` 遍历设置项
- 每项包含：分隔线 + Row [标题 + 内容文本 + >箭头]
- 点击 → 根据 `item.sType` 弹出对应 `CustomDialog`

**弹窗控制器（4个）：**
1. `repeatDialogController` → `RepeatDialog`
2. `reNameDialogController` → `RenameDialog`
3. `durationDialogController` → `DurationDialog`
4. `intervalDialogController` → `IntervalDialog`

---

#### 3.2.24 view/Detail/dialog/CommonDialog.ets

**职责：** 通用自定义弹窗模板

**参数：**
- `title: string | Resource` — 弹窗标题
- `controller: CustomDialogController | null` — 弹窗控制器
- `onConfirm?: () => void` — 确认回调
- `@BuilderParam closer` — 内容插槽

**UI 结构：**
```
Column ─┬─ Text [标题]
        ├─ closer() [自定义内容插槽]
        └─ Row ─┬─ Button [取消] → controller.close()
                └─ Button [确认] → onConfirm!() + controller.close()
```

**全局扩展样式：** `@Extend(Button) function actionBtnStyle()` — 统一按钮样式

---

#### 3.2.25 view/Detail/dialog/RepeatDialog.ets

**职责：** 重复日多选弹窗（`@CustomDialog`）

**UI：** `CommonDialog` + 周一到周日 `Checkbox` 列表（7项）

**逻辑：**
- `aboutToAppear()`：深拷贝当前 `alarmItem.repeatDays` 到本地 `selects`
- 确认：将 `selects` 排序后赋值给 `alarmItem.repeatDays`，更新 `isRepeat` 状态
- 取消：不修改原始数据（深拷贝隔离）

---

#### 3.2.26 view/Detail/dialog/RenameDialog.ets

**职责：** 闹钟名文本输入弹窗（`@CustomDialog`）

**UI：** `CommonDialog` + `TextArea` 输入框

**逻辑：** 确认时将 `TextArea` 的值赋给 `alarmItem.name`

---

#### 3.2.27 view/Detail/dialog/DurationDialog.ets

**职责：** 响铃时长选择弹窗（`@CustomDialog`）

**UI：** `CommonDialog` + `Radio` 单选列表（1/5/10/15/20/30 分钟）

**逻辑：** 选中后立即关闭弹窗并更新 `alarmItem.duration`

---

#### 3.2.28 view/Detail/dialog/IntervalDialog.ets

**职责：** 再响间隔/次数设置弹窗（`@CustomDialog`）

**UI：** `CommonDialog` + 双 `Slider` 滑块：
1. 间隔时长滑块（5-30 分钟，步长 5）
2. 重复次数滑块（0-10 次，步长 2）

**逻辑：**
- `aboutToAppear()`：从 `alarmItem` 初始化滑块值
- 确认：将滑块值赋给 `alarmItem.intervalMinute` 和 `alarmItem.intervalTimes`

---

## 4. 架构设计总结

### 4.1 架构模式：MVVM

```
View (ets/pages/*, ets/view/*)
  ↕ 双向数据绑定（@State/@Link/@Provide/@Consume）
ViewModel (ets/viewmodel/*)
  ↕ 调用
Model (ets/model/*, ets/common/bean/*)
```

### 4.2 数据流

```
┌─────────────────────────────────────────────────────┐
│  UI 组件 (@Component, @CustomDialog)                │
│  - @State / @Link / @Provide / @Consume            │
│  - @Watch 监听数据变化                               │
├─────────────────────────────────────────────────────┤
│  ViewModel (单例)                                    │
│  - MainViewModel: 数据查询、闹钟开关                  │
│  - DetailViewModel: 闹钟 CRUD                       │
├─────────────────────────────────────────────────────┤
│  Model 层                                           │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ PreferencesHandler│  │  ReminderService         │ │
│  │ (KV 数据库存储)    │  │  (系统提醒代理 API)       │ │
│  │ - get/set/clear   │  │  - publishReminder()     │ │
│  │ - 数据变化监听     │  │  - cancelReminder()      │ │
│  └──────────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 4.3 核心技术点

| 技术点 | 具体实现 |
|--------|----------|
| **UI 框架** | ArkUI 声明式开发（`@Component`、`@Entry`、`@CustomDialog`） |
| **状态管理** | `@State`（组件内状态）、`@Link`（双向绑定）、`@Provide/@Consume`（跨组件共享）、`@Watch`（状态变化监听） |
| **页面路由** | `@ohos.router.pushUrl()` / `router.back()` |
| **数据持久化** | `@kit.ArkData` preferences（KV 存储），闹钟数据 JSON 序列化后存储 |
| **后台提醒** | `@ohos.reminderAgentManager` 系统提醒代理（发布/取消闹钟） |
| **通知权限** | `@ohos.notificationManager.requestEnableNotification()` |
| **Canvas 绘图** | `CanvasRenderingContext2D` 绘制模拟时钟（旋转、画图） |
| **屏幕适配** | 自定义 `DimensionUtil` 类，基于设计稿基准等比缩放 |
| **构建系统** | Hvigor（`hvigorfile.ts` + `build-profile.json5`） |
| **包管理** | OHPM（`oh-package.json5`） |
| **测试框架** | `@ohos/hypium@1.0.16` |
| **设计模式** | 单例模式（ViewModel + PreferencesHandler）、观察者模式（PreferencesListener） |

### 4.4 应用权限

```json5
{
  "name": "ohos.permission.PUBLISH_AGENT_REMINDER",
  "reason": "$string:reason",
  "usedScene": {
    "abilities": ["EntryAbility"],
    "when": "inuse"
  }
}
```

---

## 5. 构建与运行

### 5.1 开发环境要求

- DevEco Studio（OpenHarmony 版本）
- HarmonyOS SDK 6.0.2 (API 22)
- Hvigor 构建工具
- OHPM 包管理器

### 5.2 构建步骤

1. 使用 DevEco Studio 打开 `AlarmClock` 目录
2. 等待依赖同步完成（OHPM 安装 `@ohos/hypium`）
3. 连接设备或启动模拟器
4. 点击 Run 按钮编译并部署

### 5.3 项目配置文件说明

| 文件 | 用途 |
|------|------|
| `build-profile.json5` | 项目级构建配置（compileSdk/兼容版本/模块声明） |
| `entry/build-profile.json5` | 模块级构建配置（stageMode） |
| `hvigorfile.ts` | Hvigor 构建任务入口 |
| `oh-package.json5` | OHPM 包清单（依赖管理） |
| `AppScope/app.json5` | 应用元数据（bundleName/版本/图标/名称） |
| `entry/src/main/module.json5` | 模块清单（Ability/权限/页面路由） |
| `local.properties` | 本地 SDK 路径 |

---

## 6. 文件统计

| 类别 | 文件数 | 说明 |
|------|--------|------|
| 入口 Ability | 1 | EntryAbility.ets |
| 页面组件 | 2 | MainIndex.ets, DetailIndex.ets |
| 视图模型 | 2 | MainViewModel.ets, DetailViewModel.ets |
| 服务层 | 1 | ReminderService.ets |
| 数据库层 | 2 | PreferencesHandler.ets, PreferencesListener.ets |
| 数据 Bean | 3 | ReminderItemBean.ets, AlarmItemBean.ets, AlarmSettingBean.ets |
| 常量定义 | 4 | CommonConstants, MainConstant, DetailConstant, AlarmSettingType |
| 工具类 | 2 | DataTypeUtils.ets, DimensionUtil.ets |
| 视图组件（主页） | 3 | ClockArea.ets, AlarmList.ets, AlarmListItem.ets |
| 视图组件（详情页） | 2 | DatePickArea.ets, SettingItem.ets |
| 视图组件（通用） | 1 | BackContainer.ets |
| 弹窗组件 | 5 | CommonDialog, RepeatDialog, RenameDialog, DurationDialog, IntervalDialog |
| 配置文件 | 10+ | build-profile.json5 × 2, hvigorfile.ts × 2, oh-package.json5 × 2, module.json5, app.json5 等 |
| 资源文件 | 15+ | 字符串、颜色、尺寸、图片资源 |

**源码总文件数：** 28 个 .ets 文件（不含配置文件）
**源码总行数（估）：** 约 1200 行
