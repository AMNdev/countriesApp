import { Subject, Subscription, debounceTime } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'shared-searchBox',
  templateUrl: './searchBox.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>
  private debouncerSubscription?: Subscription

  @Input()
  placeholder: string = '';
  @Input()
  initialValue: string='';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter()
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this.debouncerSubscription= this.debouncer.pipe(
      debounceTime(300)
    ).subscribe(value => {
      // console.log('debouncer: ', value)
      this.onDebounce.emit(value)

    })

  }


  emitValue(value: string) {
    this.onValue.emit(value)
    // console.log('emitiendo', { value })
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)

  }

  ngOnDestroy(): void {
    // console.log('destruido')
    this.debouncerSubscription?.unsubscribe()


    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
