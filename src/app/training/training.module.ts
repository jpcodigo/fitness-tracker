import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingSessionsComponent } from './past-training-sessions/past-training-sessions.component';
import { StopTrainingComponent } from './current-training/stop-training.component';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingSessionsComponent,
        StopTrainingComponent
    ],
    imports: [
        AngularFirestoreModule,
        SharedModule
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}