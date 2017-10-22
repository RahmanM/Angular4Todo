import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spinner-component',
  templateUrl: './spinner-component.component.html',
  styleUrls: ['./spinner-component.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  @Input()
  textToAnimate : string;

  getTextToAnimateOrDefault= () =>
  {
    return this.textToAnimate ? this.textToAnimate : "Processing...";
  }

}
