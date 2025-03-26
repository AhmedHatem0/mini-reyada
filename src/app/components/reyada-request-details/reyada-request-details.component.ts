import { Component, inject, input } from '@angular/core';
import { RequestsService } from '../../services/requests-svc/requests.service';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {NgFor, NgIf } from '@angular/common';
import { type ReyadaRequestDto } from '../../models/request.model';


@Component({
  selector: 'app-reyada-request-details',
  imports: [MatCardModule,MatDividerModule,MatListModule,MatGridListModule,MatTableModule,NgIf,NgFor],
  templateUrl: './reyada-request-details.component.html',
  styleUrl: './reyada-request-details.component.css'
})
export class ReyadaRequestDetailsComponent {
 
  requestId = input.required<string>();
  private requestSVC = inject(RequestsService);
  request !: ReyadaRequestDto;

 ngOnInit(){
  this.request= this.requestSVC.getRequest(this.requestId());
 }

}
