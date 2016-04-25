import { Component, Input } from 'angular2/core';

import { ACCORDION_DIRECTIVES, DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap'

import { Monitoring } from '../model/monitoring'
import { QuestionBase } from '../model/question-base'
import { DropdownQuestion } from '../model/question-dropdown'
import { TextboxQuestion } from '../model/question-textbox'
import { QuestionEditComponent } from './question-edit.component'


@Component({
    selector: 'sowp-question-editor',
    templateUrl: 'app/editor/question-editor.component.html',
    directives: [
        QuestionEditComponent,
        ACCORDION_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        // Dragula
    ],  
    // viewProviders: [DragulaService],
})
export class QuestionEditorComponent{

    @Input()
    monitoring:Monitoring

    constructor(){

    }

    addDropdownQuestion() {
        this.monitoring.questions.push(new DropdownQuestion());
    }

    addTextBoxQuestion(){
        this.monitoring.questions.push(new TextboxQuestion());
    }

    removeQuestion(question: QuestionBase<any> ){
        this.monitoring.questions.splice(
            this.monitoring.questions.indexOf(question), 1);

    }
}
