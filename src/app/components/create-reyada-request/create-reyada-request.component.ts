import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-reyada-request',
  imports: [MatSelectModule, MatRadioModule, MatInputModule],
  templateUrl: './create-reyada-request.component.html',
  styleUrl: './create-reyada-request.component.css',
})
export class CreateReyadaRequestComponent {
  requestForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    //add required validators to all controls
    this.requestForm = new FormGroup({
      requestType: new FormControl(''),
      supportType: new FormControl(''),
      businessNature: new FormGroup({
        module: new FormControl(''),
        section: new FormControl(''),
        group: new FormControl(''),
        category: new FormControl(''),
        activity: new FormControl(''),
      }),
      isRelatedActivity: new FormControl(false),
      requestTitle: new FormControl(''),
      hasRelatives: new FormControl(false),
      businessDescription: new FormControl(''),
      info: new FormGroup({
        name: new FormControl(''),
        management: new FormControl(''),
        jobTitle: new FormControl(''),
        level: new FormControl(''),
      }),
      businessPlan: new FormControl(''),
    });
  }
}
