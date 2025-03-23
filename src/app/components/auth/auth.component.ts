import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-svc/auth.service';
import { Observable, Subscription } from 'rxjs';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData } from '../../models/authResponseData.model';
import { equalValues, validPass } from './auth.utils';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule,SpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit{
  private authSVC = inject(AuthService);
  private destroyRef = inject(DestroyRef);
    private userSub!: Subscription;
  private router = inject(Router);

  authenticatedEmail :string|undefined;
  error: string='';	
  authForm!: FormGroup;
  isLoginMode = true;
  isLoading = false;
  
  ngOnInit()  {
    // this.authForm.valueChanges.
    this.initializeForm();
    this.setupUserSubscription();
    if(sessionStorage.getItem('userData')){
      this.router.navigate(['/']);
    }
  }
  get isButtonDisabled() {
    return this.authForm.invalid;
  }

  get isPasswordValid(){
    return this.authForm.get('passwords.password')?.valid || !this.authForm.get('passwords.password')?.touched ;
  }
  get isEmailValid(){
  return this.authForm.get("email")?.valid || !this.authForm.get("email")?.touched;
  }

  get isConfirmPasswordValid(){
    return this.authForm.get("passwords")?.valid || !this.authForm.get("passwords.confirmPassword")?.touched;
  }

  initializeForm(){
    this.authForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      passwords: new FormGroup(
        {
          password: new FormControl('', {
            validators: [Validators.required],
          }),
          confirmPassword: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)],
          }),
        },
        { validators: [equalValues('password', 'confirmPassword')] }
      ),
    });
    this.toggleConfirmPasswordValidators();
  }
  setupUserSubscription(){
    this.userSub = this.authSVC.user.subscribe({
      next: (user) => {
        this.authenticatedEmail = user?.email;
      },
    }); 
    this.destroyRef.onDestroy(() => {
      this.userSub.unsubscribe();
    });
  }

  // Toggle validators based on the mode (login or signup)
  toggleConfirmPasswordValidators() {
    const confirmPasswordControl = this.authForm.get('passwords.confirmPassword');
    const passwordsControl = this.authForm.get('passwords');
    const passwordControl = this.authForm.get('passwords.password');
    if (this.isLoginMode) {
      // Remove validators for confirmPassword in login mode
      confirmPasswordControl?.clearValidators();
      passwordsControl?.clearValidators();
      passwordControl?.removeValidators(validPass);
    } else {
      // Add validators for confirmPassword in signup mode
      confirmPasswordControl?.setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
      passwordsControl?.setValidators([
        equalValues('password', 'confirmPassword'),
      ]);
      passwordControl?.addValidators([validPass]);
    }

    // Update the validity of the confirmPassword control
    confirmPasswordControl?.updateValueAndValidity();
    passwordControl?.updateValueAndValidity();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.toggleConfirmPasswordValidators();
  }

  onLogout(){
    this.authSVC.logout();
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    
    let observeable: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      observeable = this.authSVC.login(this.authForm.value.email, this.authForm.value.passwords.password);
    } else {
      observeable = this.authSVC.signup(this.authForm.value.email, this.authForm.value.passwords.password);
    }
      observeable.subscribe({
          next: (response) => {
            this.isLoading = false;
            this.error = '';
          },
          error: (error) => {
            this.handleError(error);
            this.isLoading = false;
          },
        });
    
    this.authForm.reset();
  }
  handleError(errorObj:HttpErrorResponse){
    switch(errorObj.error.error.message){
      case 'EMAIL_EXISTS':
        this.error = 'Email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        this.error = 'Invalid Credentials, please check your email and password';
        break;
      default:
        this.error = 'An error occurred';
    }
  }

}
