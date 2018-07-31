
export interface QuestionInterface {
    question: string;
    answerList: Array<string>;
    style: string;
}

class Question implements QuestionInterface {
    question: string;
    answerList: Array<string>;
    style: string;

    constructor(
        json: QuestionInterface
    ) {
        this.question = json.question;
        this.answerList = json.answerList;
        this.style = json.style;
    }
}

export default Question;
