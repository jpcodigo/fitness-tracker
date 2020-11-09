import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    /* this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
        this.exercises = exercises
      }
    ); */
     this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  startTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  /* ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    } 
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  } */

}
