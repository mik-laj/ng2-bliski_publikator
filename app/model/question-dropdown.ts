import {QuestionBase} from './question-base';

interface DropdownOption{
    key: string;
    value: string;
}
export class DropdownQuestion extends QuestionBase<string>{
    controlType = 'dropdown';
    options: DropdownOption[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }

    toPlainObject() {
        let obj = super.toPlainObject();
        obj['options'] = this.options;
        return obj;
    }
}
