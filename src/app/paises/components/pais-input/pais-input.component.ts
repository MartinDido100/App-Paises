import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{
  
  @Output() onEnviarTermino: EventEmitter <string> = new EventEmitter();
  @Output() onDebounce: EventEmitter <string> = new EventEmitter();

  @Input() placeholder: string = '';
  
  debouncer: Subject<string> = new Subject(); //Creas un observable
  
  public termino: string = '';
  
  enviarTermino(){
    this.onEnviarTermino.emit(this.termino);
  }
  
  ngOnInit(): void {
    this.debouncer.pipe(
      debounceTime(300) //Cuanto tiempo tarda en emitir el siguiente valor
    ).subscribe( valor => { this.onDebounce.emit(valor)})
    //Aca me subscribo al observable que cree
  }
  
  teclaPresionada(){
    this.debouncer.next( this.termino );

  }

}
