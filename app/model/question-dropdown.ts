import { EventEmitter } from 'angular2/core'; 
import { QuestionBase } from './question-base';

export interface DropdownOption{
    key: string;
    value: string;
}

export class DropdownQuestion extends QuestionBase<string>{
    controlType = 'dropdown';
    _options: DropdownOption[] = [];
    options_changes = new EventEmitter();

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }

    get options() {
        return this._options;
    }

    set options(options: DropdownOption[]) {
        this._options = options;
        this.options_changes.emit(options);
    }

    toPlainObject() {
        let obj = super.toPlainObject();
        obj['options'] = this._options;
        return obj;
    }
}
