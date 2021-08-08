import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
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

export class PorCapitalComponent{

  termino:string = '';
  error: boolean = false;
  paises: Country[] = [];
  placeholder:string = 'Buscar capital...';
  paisesSugeridos: Country[] = [];

  constructor(private paisService : PaisService) { }

  buscar(termino: string){
    this.error = false;
    this.paisService.buscarCapital(termino).subscribe(
      (resp: Country[]) =>{
        this.paises = resp;
      },
      (/* Error*/) => { this.error = true }
    )
    this.termino = '';
  }

  sugerencias(termino:any){
    this.error = false; 
    this.paisService.buscarCapital(termino).subscribe(
      (paises: Country[]) => this.paisesSugeridos = paises.splice(0,5),
      ()=> this.paisesSugeridos = []
    )
  }

}
