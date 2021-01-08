import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';

import { untilDestroyed } from '../@core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {


  constructor(private media: MediaObserver) { }

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.some(change => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')),
        untilDestroyed(this)
      )
      .subscribe(() => console.log('object'));
  }

  ngOnDestroy() {
    // Needed for automatic unsubscribe with untilDestroyed
  }

}
