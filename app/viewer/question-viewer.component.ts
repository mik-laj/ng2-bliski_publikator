import {Component, Input} from 'angular2/core'
import {Monitoring} from '../model/monitoring'
import {QuestionViewComponent} from './question-view.component'

@Component({
    selector: 'sowp-question-viewer',
    templateUrl: `app/viewer/question-viewer.component.html`,
    directives: [
        QuestionViewComponent
    ]
})
export class QuestionViewerComponent{
    
    @Input()
    monitoring:Monitoring

    constructor(){

    }
}
