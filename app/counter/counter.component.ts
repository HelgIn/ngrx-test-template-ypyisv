import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  count$ = this.store.pipe(select(state => state.count));

  constructor(private store: Store<{ count: number }>) { }

  ngOnInit() {
  }

}