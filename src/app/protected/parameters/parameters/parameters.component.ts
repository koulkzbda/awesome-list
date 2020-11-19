import { AuthService } from './../../../core/services/auth.service';
import { UserService } from './../../../core/services/user.service';
import { User } from './../../../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styles: [
  ]
})
export class ParametersComponent implements OnInit {
  parametersForm: FormGroup;
  pomodoros = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.parametersForm = this.fb.group({
      pomodoro: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const user: User = this.authService.currentUser;
    user.pomodoroDuration = this.parametersForm.get('pomodoro').value * 60;
    this.authService.updateUserState(user).subscribe();
  }

}
