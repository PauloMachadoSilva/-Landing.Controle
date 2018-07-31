import { Injectable } from '@angular/core';

import { HttpAPIMockService } from './../http/http.api.mock.service';

import { QuestionResponse } from './api.question.service.interfaces';
import { Question } from '../../models';

@Injectable()
export class APIQuestionService {
    constructor(
        private _httpService: HttpAPIMockService
    ) {
    }

    public async getQuestionList(): Promise<Array<Question>> {
        const response = await this._httpService.get<Array<QuestionResponse>>('QUEST_SERVICE_GET_QUEST_LIST', {});

        const questionList = new Array<Question>();
        response.forEach(element => {
            questionList.push(new Question({
                question: element.question,
                answerList: element.answerList,
                style: element.style
            }));
        });

        return questionList;
    }
}
