import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CounterComponent } from './counter.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '../utils';

describe('Counter Component', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ],
      providers: [
        provideMockStore()
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should render a count with a mocked observable', () => {
    component.count$ = of(2);

    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(2);
  });

  it('should render a count with a mocked state', () => {
    store.setState({ count: 2 });
    
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(2);
  });
});
