import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina ={};
  cargada =false;
  equipo: any[]= [];

  constructor(
    private http: HttpClient
    ) {
    console.log("Servicio de info pagina");
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo(){
    // leer json
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: infoPagina )=>{

      this.cargada=true;
      this.info= resp;
        // console.log(resp);
      });
  }

  private cargarEquipo(){
    console.log();
     // leer json
     this.http.get('https://tecnifrio-html-default-rtdb.firebaseio.com/equipo.json')
     .subscribe( (resp: any )=>{
 
        this.equipo = resp;
         console.log(resp);
       });

  }
}
