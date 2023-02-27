import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'; 
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-register',
  templateUrl: './get-register.component.html',
  styleUrls: ['./get-register.component.css'],
  providers: [AuthService]
})
export class GetRegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  registerForm?: FormGroup;
  imgSrc:any;
  image?:File;

  createLoginForm(){
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      passwordAgain: ["", [Validators.required]],
    })
  }

  ngOnInit() {
    this.createLoginForm()
  }

  getImage(event:any){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(file)

      this.image = file;
    }
  }

  onSubmit(){
    let registerUser = {
      username: this.registerForm?.value.username,
      email: this.registerForm?.value.email,
      password: this.registerForm?.value.password,
      passwordAgain: this.registerForm?.value.passwordAgain
    }
    
    this.authService.register(registerUser, this.image)
  }

}
