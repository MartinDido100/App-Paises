import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    .col{
      margin-bottom: 10px;
    }

    a{
      text-decoration: none;
      color: #222;
    }
    `
  ]
})
export class PorPaisComponent{

  public paises: Country[] = [];
  public error: boolean = false;
  public termino : string = '';
  placeholder: string = 'Buscar pais...';
  paisesSugeridos: Country[] = []

  constructor(private paisService: PaisService) { }

  buscar (terminoRecibido: string){
    this.paisesSugeridos = [];
    this.termino = terminoRecibido;
    this.error = false;
      this.paisService.buscarPais(this.termino).subscribe(
        (paises) =>{ 
          this.paises = paises;
        },
        () => { 
            this.error = true;
            this.paises = []; 
        }
      )
      this.termino = '';
  }

  sugerencias(termino:any){
    this.error = false; 
    this.paisService.buscarPais(termino).subscribe(
      (paises: Country[]) => this.paisesSugeridos = paises.splice(0,5),
      ()=> this.paisesSugeridos = []
    )
  }

}
