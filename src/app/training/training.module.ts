import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingSessionsComponent } from './past-training-sessions/past-training-sessions.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { trainingReducer } from './training.reducer';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingSessionsComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}