import { 
    Component, 
    Directive, 
    ElementRef,
    Input,
    OnInit, 
} from 'angular2/core'

import { QuestionSolverComponent } from './solver/question-solver.component'
import { QuestionEditorComponent } from './editor/question-editor.component'
import { MonitoringService } from './services/monitoring-api.service'
import { Monitoring } from './model/monitoring'


@Component({
    selector: 'my-app',
    template: `
        <div [ngSwitch]="type" *ngIf="monitoring">
            <sowp-question-solver 
                *ngSwitchWhen="'solver'"
                [monitoring]="monitoring"></sowp-question-solver>
            <sowp-question-editor 
                *ngSwitchWhen="'editor'"
                [monitoring]="monitoring"></sowp-question-editor>
        </div>
    `,
    directives: [
        QuestionSolverComponent,
        QuestionEditorComponent
    ],
    providers: [
        MonitoringService
    ]
})
export class AppComponent implements OnInit { 

    monitoring_id: number;
    organizaiton_id: number;
    monitoring: Monitoring
    type: string = 'editor';
    constructor(
        private _montiroingSrvice: MonitoringService,
        private _el: ElementRef
    ) {
        let nativeElement = this._el.nativeElement;
        this.monitoring_id = +nativeElement.getAttribute('monitoring-id');
        this.organizaiton_id = +nativeElement.getAttribute('organizaiton-id');
    }

    ngOnInit(){
        this._montiroingSrvice
            .getMonitoring(this.monitoring_id)
            .subscribe(
                (m => this.monitoring = m),
                (error => { console.log(error) })
            )
    }
}
