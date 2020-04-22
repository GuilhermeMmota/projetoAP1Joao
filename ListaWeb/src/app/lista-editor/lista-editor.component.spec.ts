import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEditorComponent } from './lista-editor.component';

describe('ListaEditorComponent', () => {
  let component: ListaEditorComponent;
  let fixture: ComponentFixture<ListaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
