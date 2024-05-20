import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from '../quiz-question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  questions: QuizQuestion[] = [];
  selectedAnswers: (string | undefined)[] = [];
  isGameEnded = false;
  result: number | undefined;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private quizService: QuizService){}

  ngOnInit(): void {
    this.isLoading = true;
    this.quizService.getQuizQuestions().subscribe({
      next: resp => {
        
        this.questions = resp
        this.selectedAnswers = new Array(this.questions.length).fill(undefined)
        this.isLoading = false;
      },
      error: err => { 
        console.error(err)
        this.isLoading = false;
        this.errorMessage = 'Failed to load data. Please try again later.'
      }
      
    })
  }

  questionAnswered(answer: string, index:number) {
      this.selectedAnswers[index] = answer;
      this.isGameEnded = this.selectedAnswers.filter(a => a === undefined).length === 0;
      if (this.isGameEnded) {
        const points = this.selectedAnswers.filter((a,i) => this.questions[i].correct_answer === a).length;
        this.result = points / this.questions.length;
      }
  }
}
