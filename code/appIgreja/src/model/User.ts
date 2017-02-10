//import { Generos } from './genero';

export class User {
  public IDUsuario: number;
  public Nome: string;
  public Sexo: string;
  public Senha: string;
  public Email: string;
  public Facebook: string = "";
  public Tipo: string;
  public URLFoto: string = "";
  public Nascimento: Date;
  public connected: boolean = false;
  public linkAntigo: string = '';
  public selecionado: boolean = false;

  constructor() {
  }
}
