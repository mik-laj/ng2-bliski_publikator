import {QuestionBase} from './question-base'

export class Monitoring{
    title: string;
    description: string;
    questions: QuestionBase<any>[];

    constructor(options: {
        title?: string,
        description?: string,
        questions?: QuestionBase<any>[]
    } = {}) {
        this.title = options.title || '';
        this.description = options.description || '';
        this.questions = options.questions || [];
    }

    toPlainObject() {
        let obj = {
            'title': this.title,
            'description': this.description,
            'questions': this.questions.map(t => t.toPlainObject())
        };
        console.log(obj);
        return obj;
    }
}
