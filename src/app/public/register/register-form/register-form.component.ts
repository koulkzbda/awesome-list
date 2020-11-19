import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [
  ]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_ -]*$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]]
    });
  }

  get name(): AbstractControl { return this.registerForm.get('name'); }
  get email(): AbstractControl { return this.registerForm.get('email'); }
  get password(): AbstractControl { return this.registerForm.get('password'); }

  submit(): void {
    this.authService
      .register(this.name.value, this.email.value, this.password.value)
      .subscribe(
        _ => this.router.navigate(['/app/dashboard']),
        _ => this.registerForm.reset()
      );
  }

}
