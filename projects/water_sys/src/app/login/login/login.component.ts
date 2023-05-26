import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: LoginService, private formBuilder: FormBuilder, private router: Router) {
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

          // Redirect to the dashboard'

          this.router.navigateByUrl('/questions')
            .then(() => {
              console.log('Navigation successful');
            })
            .catch((err) => {
              console.error('Navigation failed:', err);
            });
        },
        error: (error: any) => {
          console.error(error);
        }
      }
      );
  }
}
