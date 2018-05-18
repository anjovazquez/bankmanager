import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoginService }  from '../login.service';
import { BankServiceService } from '../bank-service.service';



const unknownImg = `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`;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public infolists: info[];

  constructor(
    private route: ActivatedRoute,
    private bankService: BankServiceService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.bankService.getCustomers().subscribe(res => { this.infolists = res.data;
      //console.log(res.data);
      this.infolists.map((val, i, arr) => {
        if(!val.PHOTO){
          val.PHOTO = unknownImg;
        }
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  insertarUsuario():void {
    this.router.navigateByUrl('/ingresar');
  }

  logout():void {
    this.router.navigateByUrl('/login');
    localStorage.setItem('x-auth', '');
  }

}

interface info {
  SURNAME: string;
  EMAIL: string;
  ADDRESS: string;
  NAME: string;
  CUSTOMERID: string;
  STARTDATE: string;
  PHOTO:string;
}

