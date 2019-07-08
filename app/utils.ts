import { Injectable, Inject } from '@angular/core';
import {
  StateObservable,
  Store,
  ReducerManager,
  ActionsSubject,
  ActionReducer,
  Action,
  ScannedActionsSubject,
  INITIAL_STATE,
} from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockState<T> extends BehaviorSubject<T> {
  constructor() {
    super({} as T);
  }
}

@Injectable()
export class MockReducerManager extends BehaviorSubject<ActionReducer<any, any>>{
  constructor() {
    super(() => undefined);
  }
}

@Injectable()
export class MockStore<T> extends Store<T> {

  // not needed
  // private state$ = new BehaviorSubject(this.initialState as T);

  constructor(
    private state$: MockState<T>,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager,
    public scannedActions$: ScannedActionsSubject,
    @Inject(INITIAL_STATE) private initialState: T
  ) {
    super(state$, actionsObserver, reducerManager);

    //deprecated
    // this.source = this.state$.asObservable();

    this.state$.next(this.initialState);
  }

  setState(state: T): void {
    this.state$.next(state);
  }

  dispatch(action: Action) {
    super.dispatch(action);
    this.scannedActions$.next(action);
  }

  addReducer() {
    // noop
  }

  removeReducer() {
    // noop
  }
}

export function provideMockStore<T>(config: { initialState?: T } = {} as T) {
  return [
    { provide: INITIAL_STATE, useValue: config.initialState },
    ActionsSubject,
    ScannedActionsSubject,
    MockState,
    { provide: ReducerManager, useClass: MockReducerManager },
    {
      provide: Store,
      useClass: MockStore,
      deps: [MockState]
    },
  ];
}