import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-svc/auth.service';
import { Subscription } from 'rxjs';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit{
  private authSVC = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  isLoginMode = true;
  authenticatedEmail :string|undefined;
  private userSub!: Subscription;
  
  ngOnInit()  {
    this.userSub = this.authSVC.user.subscribe({
    next: (user) => {
      this.authenticatedEmail = user?.email;
    },
  }); 
  this.destroyRef.onDestroy(() => {
    this.userSub.unsubscribe();
  });
  }
  authForm: FormGroup;
  constructor() {
    this.authForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      passwords: new FormGroup(
        {
          password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)],
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

  get isButtonDisabled() {
    return this.authForm.invalid;
  }

  // Toggle validators based on the mode (login or signup)
  toggleConfirmPasswordValidators() {
    const confirmPasswordControl = this.authForm.get(
      'passwords.confirmPassword'
    );
    const passwordControl = this.authForm.get('passwords');
    if (this.isLoginMode) {
      // Remove validators for confirmPassword in login mode
      confirmPasswordControl?.clearValidators();
      passwordControl?.clearValidators();
    } else {
      // Add validators for confirmPassword in signup mode
      confirmPasswordControl?.setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
      passwordControl?.setValidators([
        equalValues('password', 'confirmPassword'),
      ]);
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
    console.log(this.authenticatedEmail);
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    if (this.isLoginMode) {
      console.log('Logging in');
      this.authSVC
        .login(this.authForm.value.email, this.authForm.value.passwords.password)
        .subscribe(
          {
            next: (response) => {
              console.log(response);
            },
            error: (error) => {
              console.log(error);
            },
          }
        );
    } else {
      console.log('Signing up');
      this.authSVC
        .signup(this.authForm.value.email, this.authForm.value.passwords.password)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
    console.log(this.authForm.value);
    this.authForm.reset();
  }
}
