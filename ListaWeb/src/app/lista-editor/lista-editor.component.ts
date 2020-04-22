import { Listas } from '../shared/models/listas.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ListasService } from 'src/app/listas.service';



@Component({
  selector: 'app-lista-editor',
  templateUrl: './lista-editor.component.html',
  styleUrls: ['./lista-editor.component.scss']
})
export class ListaEditorComponent implements OnInit {

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  private listasId: string;
  public listasForm: FormGroup;
  public loading: boolean = false;

  constructor(
    fb: FormBuilder,
    private listasService: ListasService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {

    this.listasForm = fb.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl, });

    this.listasForm = this.formBuilder.group(
      {
        id: [''],
        title: ['', Validators.required],
        creationDate: [''],
        parsedDate: [new Date(), Validators.required],
        done: [false, Validators.required],
        priority: ["1", Validators.required]
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listasId = params['listasId'];
      if (this.listasId){
        this.getListas(this.listasId);
      }
    });
  }

  public getListas(id: any): void {
    this.loading = true;
    setTimeout(() => {
      this.listasService.retrievetById(id)
      .subscribe((data: Listas) => {
        this.loading = false;
        data.parsedDate = new Date(data.creationDate);
        this.listasForm.setValue(data);
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    }, 2000);
  }

  public showLoading(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  public doRequest(): void {
    this.loading = true;
    setTimeout(() => {
      let data: Listas = this.listasForm.value;
      data.creationDate = data.parsedDate.toDateString();
      if (data.id === undefined || data.id == 0)
      {
        data.id = 0;
        this.listasService.create(data)
        .subscribe((data: Listas) => this.successMessage("Produto criado com sucesso")
        , (error) => this.errorMessage(error, "Erro ao inserir Produto"));
      }
      else
      {
        this.listasService.update(data)
        .subscribe((data: Listas) => this.successMessage("Produto atualizado com sucesso")
        , (error) => this.errorMessage(error, "Erro ao atualizar Produto"));
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
