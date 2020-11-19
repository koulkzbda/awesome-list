import { User } from './../../../shared/models/user';
import { AuthService } from './../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_ -]*$')
      ]
      ],
      avatar: ['', [
        Validators.pattern('^ https?://.+')
      ]]
    });
  }

  public submit(): void {
    const user: User = this.authService.currentUser;
    user.name = this.profileForm.get('name').value;
    user.avatar = this.profileForm.get('avatar').value;
    this.authService.updateUserState(user).subscribe();
  }

  get name(): AbstractControl { return this.profileForm.get('name'); }
  get avatar(): AbstractControl { return this.profileForm.get('avatar'); }

}
