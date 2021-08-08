import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private activatedRoute: ActivatedRoute, private paisService : PaisService) { }
  //El activated route sirve para subascribirte e los cambios en url


  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.buscarPaisPorAlfa(id)),
        tap(console.log)//Imprime lo que recibe lo de arriba
      )//El switchMap te evita un subscribe
      .subscribe(
        (pais: Country)=>{
          this.pais = pais;
        }
      )


/*     this.activatedRoute.params.subscribe(//Te devuelve los parametros del url
      ({id}) => {
        this.paisService.buscarPaisPorAlfa(id).subscribe(
          (pais: Country) =>{ console.log(pais) }
        )
      }
    ) */

  }

}
