import { Component, Input, Output, OnInit, OnChanges} from '@angular/core';
import { min } from 'rxjs/operator/min';

@Component({
  selector: 'app-display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnChanges{

  @Input() time:number = null;
  public minutes: string = '00';
  public seconds: string = '00';

  constructor() { }

  ngOnChanges(changes) {
    if(changes.time) {
      const minutes = Math.trunc(changes.time.currentValue / 60);
      const seconds = changes.time.currentValue - minutes*60;

      if (minutes >= 10) {
        this.minutes = minutes.toString().substring(-2);
      } else {
        this.minutes = '0' + minutes.toString().substring(-2);
      }

      if (seconds >= 10) {
        this.seconds = seconds.toString().substring(-2);
      } else {
        this.seconds = '0' + seconds.toString().substring(-2);
      }
    }
  }
}
