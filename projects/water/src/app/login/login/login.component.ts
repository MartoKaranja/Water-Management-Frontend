import { Component } from '@angular/core';
import { LoginService } from 'projects/water/src/app/services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsercredentialsService } from 'src/app/services/usercredentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  error !: any;

  constructor(private authService: LoginService, private formBuilder: FormBuilder, private router: Router, private usercredentialsService : UsercredentialsService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password)
      .subscribe({
        next: (response) => {
          console.log(response)
          const token = response.token;
          // Store the token in session storage
          //sessionStorage.setItem('auth_token', token);
          localStorage.setItem('auth_token', token);
          this.usercredentialsService.username = username;

          console.log(response.userType);

          //store user type
          localStorage.setItem('userType', response.userType);

          // Redirect to the dashboard'

          if (response.userType === 'landlord')
          {
            this.router.navigateByUrl('/admin-dashboard')
            .then(() => {
              console.log('Navigation successful');
            })
            .catch((err) => {
              console.error('Navigation failed:', err);
            });

          }
          else
          {
            this.router.navigateByUrl('/client-dashboard')
            .then(() => {
              console.log('Navigation successful');
            })
            .catch((err) => {
              console.error('Navigation failed:', err);
            });
          }


        },
        error: (error: any) => {
          console.error(error);
          this.error = error
        }
      }
      );
  }
}
