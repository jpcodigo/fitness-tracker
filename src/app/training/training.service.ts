import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(
        private firestore: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        // this.uiService.loadingStateChanged.next(true);
        
        this.fbSubs.push(this.firestore
            .collection('Available exercises')
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                    return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data() as Exercise
                    };
                });
            }))
            .subscribe(
                (exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    // this.uiService.loadingStateChanged.next(false);
                    this.store.dispatch(new Training.SetAvailableExercises(exercises))
                }, error => {
                    this.store.dispatch(new UI.StopLoading());
                    // this.uiService.loadingStateChanged.next(false);
                    this.uiService.showSnackbar('Fetching exercises failed, please try again', null, 3000);
                    this.exercisesChanged.next(null);
                }
            )
        );
    }

    startExercise(selectedId: string) {
        //this.firestore.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
        /* this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise }); */
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.store.dispatch(new Training.StopTraining());
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.store.dispatch(new Training.StopTraining());
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.firestore
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedExercises(exercises));
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.firestore.collection('finishedExercises').add(exercise);
    }
}