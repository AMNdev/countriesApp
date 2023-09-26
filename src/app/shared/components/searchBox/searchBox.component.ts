import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-searchBox',
  templateUrl: './searchBox.component.html',
})
export class SearchBoxComponent  {

  public value = ''
  @Input()
  placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter()


  emitValue(value: string) {
    this.onValue.emit(value)
    // console.log('emitiendo', { value })


  }
}
