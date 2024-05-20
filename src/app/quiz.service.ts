import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { QuizQuestion } from './quiz-question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly quizUrl = environment.quizUrl
  constructor(private http: HttpClient) { }

  getQuizQuestions(){ 
    return this.http.get(this.quizUrl).pipe(map((resp: any) => {
      const questions = resp.results;
      questions.forEach((q: any) => {
        const answers = [q.correct_answer, ...q.incorrect_answers];
        this.shuffle(answers);
        q.answers = answers;
      });
      return questions as QuizQuestion[];
    }));
  }

  private shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random()*currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];

    }
  }
}
