import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  authorization;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Username: "+this.username+" Password: "+this.password);
    this.loginService.PostWithBasicAuth(this.username, this.password).subscribe(res => { this.authorization = res;
      if (this.authorization.status == 200) {
        this.router.navigateByUrl('/inicio');
      }} 
    );
  }
}