import { Component, DestroyRef, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { RequestsService } from '../../services/requests-svc/requests.service';
import { AuthService } from '../../services/auth-svc/auth.service';
import { ReyadaRequestDto } from '../../models/request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-reyada-request',
  imports: [ReactiveFormsModule,MatSelectModule, MatRadioModule, MatInputModule,NgFor],
  templateUrl: './create-reyada-request.component.html',
  styleUrl: './create-reyada-request.component.css',
})
export class CreateReyadaRequestComponent {
  private destroyRef = inject(DestroyRef);
  private requestSVC = inject(RequestsService);
  private authSVC = inject(AuthService);
  private router = inject(Router);
  requestForm!: FormGroup;
  
  showRelativesList:boolean = false;
  ngOnInit() {
    this.initializeForm();
  }
  get relativesList(){
    return (this.requestForm.get("relativeEmployees") as FormArray).controls;
  }
  get sectorsList(){
    return this.requestSVC.businessActivitySectors;
  }
  get divisionsList(){
    return this.requestSVC.businessActivityDivisions;
  }

  initializeForm() {
    this.requestForm = new FormGroup({
      requestType: new FormControl('',Validators.required),
      supportType: new FormControl('',Validators.required),
      businessActivitySector: new FormControl('',Validators.required),
      businessActivityDivision: new FormControl('',Validators.required),
      businessRelatedToOrg: new FormControl(false,Validators.required),
      planTitle: new FormControl('',Validators.required),
      businessNature: new FormControl('',Validators.required),
      hasRelatives: new FormControl(false,Validators.required),
      relativeEmployees: new FormArray([this.createRelativeInfoGroup()]),
      workPlan: new FormControl('',Validators.required),
    });

    const relativeSub = this.requestForm.get("hasRelatives")!.valueChanges.subscribe({
      next: val => this.onRelativesRadioChange(val)
    })

    this.destroyRef.onDestroy(()=>relativeSub.unsubscribe());
  }


  createRelativeInfoGroup(){
    return new FormGroup({
      name: new FormControl('',Validators.required),
      unitName: new FormControl('',Validators.required),
      positionTitle: new FormControl('',Validators.required),
      positionGrade: new FormControl('',Validators.required),
    })
  }

  
  onAddRelative(){
    (this.requestForm.get("relativeEmployees") as FormArray).push(this.createRelativeInfoGroup());
  }
  onRelativesRadioChange(val:string){
    
    if(val==="true"){
      this.showRelativesList = true;
    }
    else{
      this.showRelativesList = false;
      this.requestForm.setControl("relativeEmployees", new FormArray([ this.createRelativeInfoGroup()]));
    }
  }

  onRemoveRelative(index: number): void {
    const relativesList = (this.requestForm.get("relativeEmployees") as FormArray);
    if(relativesList.length===1)
    {
      this.requestForm.get("hasRelatives")?.setValue('false');
    }
    relativesList.removeAt(index);
  }

  onSubmit(){
    if(this.requestForm.invalid)
      return;
    //should i get it from the session or the service?
    let userEmail:string;
    const sub = this.authSVC.user.subscribe({
      next: user => {
        userEmail = user!.email;
        const newRequest:ReyadaRequestDto = {
          ...this.requestForm.value,
          employeePersonalEmail:userEmail,
          requestId:"REQ"+ Math.trunc(Math.random()*100000)
        }
        this.requestSVC.addRequest(newRequest);

      },
      error: error => console.error(error),
    })
    this.destroyRef.onDestroy(()=>sub.unsubscribe());
    alert("تمت اضافة الطلب");
    this.router.navigate(["/"]);
  }

  onCancel(){
    this.router.navigate(["/"]);
  }
}
