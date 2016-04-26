import { BaseConditional } from './condititional-base';
import { QuestionBase } from '../model/question-base';


export class isNullConditional extends BaseConditional{
    type = 'is-null';
    target: QuestionBase<any>;
    value: string;
    constructor(options:{
        target: QuestionBase<any>,
        value: string
    }) {
        super(options)
        this.target = options['target'];
    }

    isValid(answers):boolean {
        return answers[this.target.key] == null || answers[this.target.key] === "";
    }

    toPlainObject(){
        let obj = super.toPlainObject();
        obj['target'] = this.target.id;
        obj['value'] = this.value;
        return obj; 
    }
}
