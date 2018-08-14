import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Class } from '../../../../models/class.model';
import { UserType, User } from '../../../../models/user.model';
import { ClassService } from '../../../class/services/class.graphql.service';
import { AddUserDialogComponent } from '../add/add-user.dialog';
import { UserService } from '../../services/user.graphql.service';

@Component({
  selector: 'app-update-user.dialog',
  templateUrl: './update-user.dialog.html',
  styleUrls: ['./update-user.dialog.scss'],
})

export class UpdateUserDialogComponent implements OnInit {
  form: FormGroup;
  roles: string[];
  userRoleEnum = UserType;
  classes: Class[];
  currentRole: string;
  formControl = new FormControl('', [Validators.required]);
  EmailFormControl = new FormControl(this.data.email, [Validators.required, Validators.email]);
  selectUserType = new FormControl(this.data.role, Validators.required);
  selectGrade = new FormControl('', [Validators.required]);
  userNameFormControl = new FormControl(this.data.username, [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Za-z]+$')]);
  constructor(private formBuilder: FormBuilder,
              private classService: ClassService,
              public dialogRef: MatDialogRef<AddUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public userService: UserService,
          ) {
          this.roles = Object.keys(this.userRoleEnum);
          this.getClasses();
          }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      userName: this.userNameFormControl,
      email: this.EmailFormControl,
      userType: this.selectUserType,
      class: undefined,
    });

  }
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmAdd(dialogData): void {
    this.dialogRef.close(dialogData);
  }

  onUserTypeChange(event): void {
    this.currentRole = event;
    if (event === 'MANAGER') {
       this.data.Class = undefined;
    }

}
   async getClasses() {
    this.classes = await this.classService.getAllClasses();
  }
}
