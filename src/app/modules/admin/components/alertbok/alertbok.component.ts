
import {Component, OnInit, ViewChild,Input} from '@angular/core';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-alertbok',
  templateUrl: './alertbok.component.html',
  styleUrls: ['./alertbok.component.css']
})
export class AlertbokComponent implements OnInit {
  @Input() color: string | any;
  @Input() child: string | any;

  constructor() {

      }    private _success = new Subject<string>();
  
    staticAlertClosed = false;
    successMessage = '';

    ngOnInit(): void {
      console.log(this.color);

    
    }
    public changeSuccessMessage() { this._success.next(`${new Date()} - Message successfully changed.`); }
}
