import { Component, OnInit } from '@angular/core';
import { BankServiceService } from '../bank-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: ['./ingresar-usuario.component.css']
})
export class IngresarUsuarioComponent implements OnInit {

  public dato: CustomerInfo;
  id:CustomerDataInsert;
  customerTypes:CustomerDataBuscarCustomerTypeId[];
  insertPhoto:string;

  constructor(
    private route: ActivatedRoute,
    private bankService: BankServiceService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.dato = {SURNAME:"", EMAIL:"", ADDRESS:"", NAME:"",CUSTOMERID:"",ID:"", CUSTOMERTYPEID:"",
    STARTDATE: new Date, PHOTO:"", COMMENTS:"", ID_DMS_DOC:""};

    this.bankService.BuscarCustomerTypeId().subscribe(res => { this.customerTypes = res.data;
    });
  }

  IngresarRegistro() {
    var insertInfoList = {surname: this.dato.SURNAME, email: this.dato.EMAIL, customertypeid: this.dato.CUSTOMERTYPEID, address: this.dato.ADDRESS, name: this.dato.NAME, id:this.dato.ID, startdate:this.dato.STARTDATE.toISOString(), ID_DMS_DOC:this.dato.ID_DMS_DOC, comments:this.dato.COMMENTS, photo:this.insertPhoto};
    this.bankService.InsertarDatos(insertInfoList).subscribe(res => { this.id = res.data   
      this.router.navigateByUrl('/detalle/'+this.id.CUSTOMERID);
    });
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
            this.insertPhoto= btoa(binaryString);
    }
  }


interface CustomerInfo {
  SURNAME: string;
  EMAIL: string;
  ADDRESS: string;
  NAME: string;
  CUSTOMERID: string;
  ID: string;
  CUSTOMERTYPEID: string;
  STARTDATE: Date;
  PHOTO:string;
  COMMENTS:string;
  ID_DMS_DOC:string;
}

interface CustomerDataBuscarCustomerTypeId {
  DESCRIPTION:string;
  CUSTOMERTYPEID:number;
}

interface CustomerDataInsert {
  CUSTOMERID:string;
}