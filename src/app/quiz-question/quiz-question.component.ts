import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { QuizQuestion } from '../quiz-question.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.scss'
})
export class QuizQuestionComponent implements OnInit {
  @Input() question: QuizQuestion | undefined;
  @Input() showCorrectAnswer = false;
  selectedAnswer: string | undefined;
  @Output() selectedAnswerChange = new EventEmitter<string>();

  constructor() {}
  ngOnInit(): void {
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.selectedAnswerChange.emit(this.selectedAnswer);
  }
}
