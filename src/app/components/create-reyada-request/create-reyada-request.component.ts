import { Component, DestroyRef, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { RelativeDto } from '../../models/relative.model';

@Component({
  selector: 'app-create-reyada-request',
  imports: [ReactiveFormsModule,MatSelectModule, MatRadioModule, MatInputModule],
  templateUrl: './create-reyada-request.component.html',
  styleUrl: './create-reyada-request.component.css',
})
export class CreateReyadaRequestComponent {
  private destroyRef = inject(DestroyRef);

  requestForm!: FormGroup;
  
  //TODO D: manage state of relativesList on the hasRelatives value.
  showRelativesList:boolean = false;
  ngOnInit() {
    this.initializeForm();
  }
  get relativesList(){
    console.log((this.requestForm.get("relativesList") as FormArray).controls.length)
    return (this.requestForm.get("relativesList") as FormArray).controls;
  }


  initializeForm() {
    //TODO: add required validators to all controls
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
      relativesList: new FormArray([]),
      businessPlan: new FormControl(''),
    });

    const relativeSub = this.requestForm.get("hasRelatives")!.valueChanges.subscribe({
      next: val => this.onRadioChange(val)
    })

    this.destroyRef.onDestroy(()=>relativeSub.unsubscribe());
  }


  createRelativeInfoGroup(){
    return new FormGroup({
      name: new FormControl(''),
      management: new FormControl(''),
      jobTitle: new FormControl(''),
      level: new FormControl(''),
    })
  }

  
  //TODO D: add a relative to the list
  addRelative(){
    (this.requestForm.get("relativesList") as FormArray).push(this.createRelativeInfoGroup());
  }
  onRadioChange(val:string){
    
    console.log("the valueChanges observable value", val);

    if(val==="true"){
      this.showRelativesList = true;
    }
    else{
      this.showRelativesList = false;
      this.requestForm.setControl("relativesList", new FormArray([]));
    }
  }

  //TODO: remove a relative from the list
  removeRelative(index: number): void {
    (this.requestForm.get("relativesList") as FormArray).removeAt(index);
  }
}
