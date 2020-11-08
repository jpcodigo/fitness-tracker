import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { SET_AVAILABLE_EXERCISES, SET_FINISHED_EXERCISES, START_TRAINING, STOP_TRAINING, TrainingActions } from './training.actions';


export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise[];
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_EXERCISES:
            return {
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_EXERCISES:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: action.payload
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
    }
}

export const getAvailableExercises = (state: TrainingState) => state.availableExercises;
export const getFinishedExercises = (state: TrainingState) => state.finishedExercises;
export const getActiveTraining = (state: TrainingState) => state.activeTraining;