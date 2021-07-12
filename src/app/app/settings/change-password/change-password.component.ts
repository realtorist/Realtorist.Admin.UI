import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import {
  NbToastrService,
} from "@nebular/theme";
import { IUserApi } from '../../../@core/abstractions/user.api';
import { ChangePasswordModel } from '../../../@core/models/user/changePassword';

@Component({
  selector: "ngx-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  model: ChangePasswordModel;

  loading = false;

  constructor(
    private toastrService: NbToastrService,
    private readonly api: IUserApi,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.model = {
      password: '',
      confirmPassword: '',
      oldPassword: ''
    }
  }

  save(form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    this.api.changePassword(this.model).subscribe((res) => {
      this.loading = false;
      this.toastrService.success(
        `Password was successfully changed`,
        "Saved!"
      );

      this.router.navigateByUrl('/');
    }, (error) => {
      this.loading = false;
      this.toastrService.danger(
        `Password was not changed. Please verify your old password`,
        "Error!"
      );
    });
  }
}
