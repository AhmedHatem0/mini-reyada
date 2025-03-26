import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { RequestsService } from '../../services/requests-svc/requests.service';
import { Router } from '@angular/router';
import { ReyadaRequestDto } from '../../models/request.model';

@Component({
  selector: 'app-list-reyada-request',
  imports: [MatTableModule],
  templateUrl: './list-reyada-request.component.html',
  styleUrls:[ './list-reyada-request.component.css']
})
export class ListReyadaRequestComponent {
  private requestsSVC = inject(RequestsService);
  private router = inject(Router);
  requests = this.requestsSVC.dummyReyadaRequests;
  displayedColumns = ["requestId","planTitle","requestType","supportType"];


  navigate(row: ReyadaRequestDto){
    this.router.navigate(["/details",row.requestId])
    console.log(row);
  }
  //TODO: get all requests summaries
}
