import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap'

import { 
    Component,
    Input
 } from 'angular2/core';

import { QuestionBase } from '../model/question-base';

import { isEqualConditional } from '../conditionals/conditional-is-equal'

@Component({
    selector: 'sowp-question-conditionals',
    templateUrl: 'app/editor/question-conditionals.component.html',
    directives: [
        DROPDOWN_DIRECTIVES
    ]
})
export class QuestionConditionalsComponent{
    @Input()
    questions: QuestionBase<any>[]

    @Input()
    current: QuestionBase<any>

    main(){

    }

    addIsEqualCondionals() {
        let target = this.questions[0];
        let conditionals = new isEqualConditional({ target: target, value: "" });
        this.current.hideConditions.push(conditionals);
    }
}
