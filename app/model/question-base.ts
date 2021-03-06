import { EventEmitter } from 'angular2/core'

import { slugify } from '../utils';
import { BaseConditional } from '../conditionals/condititional-base';
import { Serializable } from '../serializable';

export class QuestionBase<T> implements Serializable {
    defaultValue: T;
    id: number;
    _key: string;
    label: string;
    description: string;
    order: number;
    controlType: string;
    private _hideConditions: BaseConditional[];
    hideConditions_changes = new EventEmitter();

    constructor(options: {
        defaultValue?: T,
        id?: number,
        key?: string,
        label?: string,
        description?: string,
        order?: number,
        controlType?: string,
        hideConditions?: BaseConditional[]
    } = {}) {
        this.id = (options.id || options.id > 0) ? options.id : -1;
        this._key = options.key || '';
        this.label = options.label || '';
        this.description = options.description || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.hideConditions = options.hideConditions || [];
    }

    get key(){
        if (this._key)
            return this._key;
        this._key = slugify(this.label) + ( ( Math.random() * 1000 ) | 0)
        return this._key;
    }

    set key(value){
        this._key = value;
    }

    get hideConditions(){
        return this._hideConditions;
    }

    set hideConditions(conditions:BaseConditional[]) {
        this._hideConditions = conditions;
        this.hideConditions_changes.emit(conditions);
    }

    isHidden(answers:any){
        if (this.hideConditions.length == 0)
            return false;
        return this.hideConditions.some(t => t.isValid(answers));
    }

    toPlainObject() {
        let obj = {};
        if(this.id > 0){
            obj[ 'id' ] = this.id;
        }
        obj['label'] = this.label;
        obj['description'] = this.description;
        obj['order'] = this.order;
        obj['controlType'] = this.controlType;
        obj['defaultValue'] = this.defaultValue;
        obj['hideConditions'] = this._hideConditions.map(t => t.toPlainObject() );
        return obj;
    }
}
