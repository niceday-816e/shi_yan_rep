import type { AlarmSettingType } from '../constants/AlarmSettingType';
/**
 * Alarm setting bean information.
 */
export default class AlarmSettingBean {
    /**
     * Alarm setting title.
     */
    public title: string;
    /**
     * Alarm setting content.
     */
    public content: string;
    /**
     * Alarm setting type.
     */
    public sType: AlarmSettingType;
    constructor(title: string, content: string, sType: AlarmSettingType) {
        this.title = title;
        this.content = content;
        this.sType = sType;
    }
}
