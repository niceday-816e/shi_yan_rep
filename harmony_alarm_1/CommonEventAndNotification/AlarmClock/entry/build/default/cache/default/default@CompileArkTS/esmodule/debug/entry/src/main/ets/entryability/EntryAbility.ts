import display from "@ohos:display";
import UIAbility from "@ohos:app.ability.UIAbility";
import PreferencesHandler from "@bundle:com.huawei.alarmclock/entry/ets/model/database/PreferencesHandler";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
export default class EntryAbility extends UIAbility {
    onCreate(want: Want): void {
        let abilityInfo = this.context.abilityInfo;
        globalThis.bundleName = abilityInfo.bundleName;
        globalThis.abilityName = abilityInfo.name;
        globalThis.abilityWant = want;
        globalThis.preference = PreferencesHandler.getInstance();
    }
    async onWindowStageCreate(windowStage: window.WindowStage): Promise<void> {
        globalThis.display = await display.getDefaultDisplay();
        await globalThis.preference.configure(this.context.getApplicationContext());
        windowStage.loadContent('pages/MainIndex', null);
    }
}
