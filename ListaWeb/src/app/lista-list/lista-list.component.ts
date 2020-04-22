import { ListasService } from 'src/app/listas.service';
import { Listas } from '../shared/models/listas.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-lista-list',
  templateUrl: './lista-list.component.html',
  styleUrls: ['./lista-list.component.scss']
})
export class ListaListComponent implements OnInit {

  public loading: boolean = false;
  public listaListArray: Listas[]

  constructor(
    private listasService: ListasService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getLista();
  }

  public getLista(): void {
    this.loading = true;
    setTimeout(() => {
      this.listasService.retrieveAll()
      .subscribe(items => {
        this.loading = false;
        this.listaListArray = items;
      },(error) => {
        this.loading = false;
        console.log(error);
      });
    }, 2000);
  }

  public concludeLista(listaIndex: number): void {
    this.loading = true;
    setTimeout(() => {
      let listas = this.listaListArray[listaIndex];
      if (listas.done) {
        this.listasService.delete(listas.id)
        .subscribe(() => {
          this.successMessage("Produto removido com sucesso");
          this.getLista();
        }
        , (error) => this.errorMessage(error, "Erro ao atualizar o Produto"));
      }
      else {
        listas.done = true;
        this.listasService.update(listas)
        .subscribe((data: Listas) => this.successMessage("Produto atualizado com sucesso")
        , (error) => this.errorMessage(error, "Erro ao atualizar o Produto"));
      }
    }, 2000);
  }

  private successMessage(successMessage: string)
  {
    this.loading = false;
    console.log(successMessage);
    this._snackBar.open(successMessage, null, {
      duration: 2000,
    });
  }

  private errorMessage(error: string, errorMessage: string)
  {
    this.loading = false;
    console.log(error);
    this._snackBar.open(errorMessage, null, {
      duration: 2000,
    });
  }
}
