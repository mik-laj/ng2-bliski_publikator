import { Component, Input } from 'angular2/core'


@Component({
    selector: 'sowp-question-option-edit',
    templateUrl: 'app/editor/question-option-edit.component.html'
})
export class QuestionOptionEditComponent{
    constructor() {}

    @Input()
    options:{key:string, value:string}[]

    removeOption(option:any){
        this.options.splice(this.options.indexOf(option), 1);
        // this.options = this.options.splice(position, 1);
    }
    addOption(){
        this.options.push({ key: "", value: "" });
    }
}
