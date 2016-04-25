import { BaseConditional } from './condititional-base';
import { QuestionBase } from '../model/question-base';


export class isEqualConditional extends BaseConditional{
    type = 'is-equal';
    target: QuestionBase<any>;
    value: string;
    constructor(options:{
        target: QuestionBase<any>,
        value: string
    }) {
        super(options)
        this.target = options['target'];
        this.value = options['value'];
    }

    isValid(answers):boolean {
        console.log(this.target.id, answers[this.target.key], this.value, answers[this.target.key] == this.value)
        return answers[this.target.key] == this.value;
    }

    toPlainObject(){
        let obj = super.toPlainObject();
        obj['target'] = this.target.id;
        obj['value'] = this.value;
        return obj; 
    }
}
