import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
      this.cargarProductos();

   }

   private cargarProductos(){
     return new Promise ((resolve, rejects)=>{
      this.http.get('https://tecnifrio-html-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: any ) => {
        console.log(resp);
        this.productos= resp;
 
        setTimeout(() => {
         this.cargando= false;
        }, 2000);
        resolve;
      });
     })
     
    }
    getProducto(id:string){
     return this.http.get(`https://tecnifrio-html-default-rtdb.firebaseio.com/productos/${ id }.json`)
    }

    buscarProducto(termino: string){

      if (this.productos.length === 0){
        //cargar producto
        this.cargarProductos().then(()=>{
          // ejecutar despues  e tener los productos
          // aplicar filtro
          this.filtrarProducto( termino );
        });
      }else{
        // aplicar filtro
        this.filtrarProducto( termino );
      }
    }

    private filtrarProducto(termino: string){
      console.log(this.productos);
      this.productosFiltrado= [];
      termino= termino.toLocaleLowerCase();
      this.productos.forEach( prod =>{
         const tituloLower = prod.titulo.toLocaleLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino)>= 0 ) {
              this.productosFiltrado.push( prod );
            };

      });
    } 
}