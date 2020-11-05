import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';

export interface State {
    ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {

};