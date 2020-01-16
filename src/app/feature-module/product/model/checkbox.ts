export class Checkbox {
    value: any;
    text: string;
    disabled: boolean;
    selected: boolean;

    constructor(v: any, t: string, s: boolean, d = false) {
        this.value = v;
        this.text = t;
        this.disabled = d;
        this.selected = s;
    }
}
