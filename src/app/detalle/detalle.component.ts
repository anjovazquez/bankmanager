import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankServiceService } from '../bank-service.service';


import { Location } from '@angular/common';

const unknownImg = `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`;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {

  public infos: Info[];
  public infoAccounts: CustomerDataInfoAccount;
  onLoadInfo:Info;
  customerTypes:CustomerDataBuscarCustomerTypeId[];

  constructor(
    private route: ActivatedRoute,
    private bankService: BankServiceService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bankService.getInfo(id).subscribe(res => { this.infos = res.data;
      this.infos.map((val, i, arr) => {
        if(!val.PHOTO){
          val.PHOTO = unknownImg;
        }
        val.STARTDATE = new Date(val.STARTDATE); //Convierte el STARTDATE en tipo fecha
      });
      this.onLoadInfo = Object.assign({}, res.data[0]);
      //console.log(res.data[0]);
    });
    this.bankService.getInfoAccounts(id).subscribe(res => this.infoAccounts = res.data);
    this.bankService.BuscarCustomerTypeId().subscribe(res => this.customerTypes = res.data);
  }

  actualizarDatos(){
    const id = +this.route.snapshot.paramMap.get('id');
    
    var newInfoList = {surname: "", email: "", address: "", name: "name", customerId: "", id:"", startdate:"", ID_DMS_DOC:"", customertypeid:"", comments:""};

    if (this.onLoadInfo.SURNAME != this.infos[0].SURNAME) {
      newInfoList.surname = '"SURNAME":"' + this.infos[0].SURNAME+'",';
    } else {
      newInfoList.surname = '';
    }
    if (this.onLoadInfo.EMAIL != this.infos[0].EMAIL) {
      newInfoList.email = '"EMAIL":"' + this.infos[0].EMAIL+'",';
    } else {
      newInfoList.email = '';
    }
    if (this.onLoadInfo.ADDRESS != this.infos[0].ADDRESS) {
      newInfoList.address = '"ADDRESS":"' + this.infos[0].ADDRESS+'",';
    } else {
      newInfoList.address = '';
    }
    if (this.onLoadInfo.NAME != this.infos[0].NAME) {
      newInfoList.name = '"NAME":"' + this.infos[0].NAME+'",';
    } else {
      newInfoList.name = '';
    }
    if (this.onLoadInfo.CUSTOMERID != this.infos[0].CUSTOMERID) {
      newInfoList.customerId = '"CUSTOMERID":"' + this.infos[0].CUSTOMERID+'",';
    } else {
      newInfoList.customerId = '';
    }
    if (this.onLoadInfo.ID != this.infos[0].ID) {
      newInfoList.id = '"ID":"' + this.infos[0].ID+'",';
    } else {
      newInfoList.id = '';
    }
    if (this.onLoadInfo.STARTDATE != this.infos[0].STARTDATE) {
      newInfoList.startdate = '"STARTDATE":' +  this.infos[0].STARTDATE.getTime()+','; //Convierte la fecha a milisegundos
    } else {
      newInfoList.startdate = '';
    }
    if (this.onLoadInfo.ID_DMS_DOC != this.infos[0].ID_DMS_DOC) {
      newInfoList.ID_DMS_DOC = '"ID_DMS_DOC":"' + this.infos[0].ID_DMS_DOC+'",';
    } else {
      newInfoList.ID_DMS_DOC = '';
    }
    if (this.onLoadInfo.CUSTOMERTYPEID != this.infos[0].CUSTOMERTYPEID) {
      newInfoList.customertypeid = '"CUSTOMERTYPEID":' + this.infos[0].CUSTOMERTYPEID+',';
    } else {
      newInfoList.customertypeid = '';
    }
    if (this.onLoadInfo.COMMENTS != this.infos[0].COMMENTS) {
      newInfoList.comments = '"COMMENTS":"' + this.infos[0].COMMENTS+'"';
    } else {
      newInfoList.comments = '"COMMENTS":"' + this.onLoadInfo.COMMENTS+'"';
    }
    //console.log(this.infos[0].SURNAME);
    this.bankService.GuardarDatos(id, newInfoList).subscribe();
  }

  borrarRegistro() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bankService.BorrarDatos(id).subscribe();
    this.router.navigateByUrl('/inicio');
    window.location.reload();
  }

  irAInicio() {
    this.router.navigateByUrl('/inicio');
  }
}


interface Info {
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

interface CustomerDataInfoAccount {
  ACCOUNTID: string;
  ENTITYID: string;
  OFFICEID: string;
  CDID: string;
  ANID: string;
  ACCOUNT: string;
  BALANCE: string;
  CUSTOMERID: string;
  STARTDATE:Date;
  ENDDATE:Date;
}

interface CustomerDataBuscarCustomerTypeId {
  DESCRIPTION:string;
  CUSTOMERTYPEID:number;
}