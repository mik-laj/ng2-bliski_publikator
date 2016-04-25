import { Observable }     from 'rxjs/Observable';

import { Http } from 'angular2/http';

import { BaseApiService } from './api.base.service';
import { Monitoring } from '../model/monitoring';

import { QuestionBase } from '../model/question-base';
import { TextboxQuestion } from '../model/question-textbox';
import { DropdownQuestion } from '../model/question-dropdown';

import { isEqualConditional } from '../conditionals/conditional-is-equal'

export class MonitoringService extends BaseApiService {

    constructor(http: Http) {
        super(http);
    }

    getMonitoring(id: number):Observable<Monitoring> {
        return this.simple_get(`monitoring/${id}`)
            .map(data => {
                console.log(data);
                let questions = this.parseQuestionsList(data.questions);
                this.addHideConditions(data.questions, questions);
                return new Monitoring(
                    {
                        title: data.title, 
                        description: data.description, 
                        questions: questions 
                    }
                );
            })
            .map(data => data)
    }

    parseQuestionsList(questions:any[]):QuestionBase<any>[]{
        console.log('parseQuestionsList', questions);
        return questions.map(this.parseQuestion)
    }

    parseQuestion(question):QuestionBase<any>{
        console.log('parseQuestion', question);
        switch(question.controlType){
            case 'textbox':
                return new TextboxQuestion(question);
            case 'dropdown': 
                return new DropdownQuestion(question);
        }
        throw new Error(`Unsupported controlType [${question.controlType}].`);
    }

    addHideConditions(data:any[], questions:QuestionBase<any>[]){
        var question_with_conditions = data.filter(t => t.hideConditions && t.hideConditions.length > 0);
        question_with_conditions.forEach( q => {
            var question = questions.find(t => t.id == q.id)
            q.hideConditions.forEach(h => {
                question.hideConditions.push(this.parseHideConditions(h, questions));
            })
        });
    }

    parseHideConditions(data, questions: QuestionBase<any>[]) {
        switch(data.type){
            case 'is-equal':{
                let target = questions.find(t => data.target == t.id);
                let value = data.value;
                return new isEqualConditional({ target, value });
            }

        }
        throw new Error(`Unsupported hide conditions [${data.hideConditions}].`);
    }
}
