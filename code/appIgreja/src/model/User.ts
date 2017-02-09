//import { Generos } from './genero';

export class User {
  public id: number;
  public nome: string;
  public genero: string;
  public senha: string;
  public email: string;
  public facebook: string = "";
  public permissao: string;
  public foto: string = "";
  public nascimento: Date;
  public connected: boolean = false;
  public linkAntigo: string = '';
  public selecionado: boolean = false;

  constructor() {
  }
}
