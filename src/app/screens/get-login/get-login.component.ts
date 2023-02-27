import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms'; 
import { UserRepository } from 'src/repositories/user.repository';

@Component({
  selector: 'app-get-login',
  templateUrl: './get-login.component.html',
  styleUrls: ['./get-login.component.css'],
  providers:[UserRepository]
})
export class GetLoginComponent implements OnInit  {

  constructor(
    private formBuilder: FormBuilder,
    private userRepo: UserRepository,
    
    ) { }

  loginForm?: FormGroup;

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {
    this.createLoginForm()
  }

  onSubmit(){
    let email: string = this.loginForm?.value.email
    let password: string = this.loginForm?.value.password

    this.userRepo.authenticate(email=email, password=password);
  }

}
