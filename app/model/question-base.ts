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
    hideConditions: BaseConditional[] = []
    constructor(options: {
        defaultValue?: T,
        id?: number,
        key?: string,
        label?: string,
        description?: string,
        order?: number,
        controlType?: string
    } = {}) {
        this.id = (options.id || options.id > 0) ? options.id : -1;
        this._key = options.key || '';
        this.label = options.label || '';
        this.description = options.description || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
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

    isHidden(answers:any){
        if (!this.hideConditions || this.hideConditions.length == 0)
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
        obj['hideConditions'] = this.hideConditions.map(t => t.toPlainObject() );
        return obj;
    }
}
