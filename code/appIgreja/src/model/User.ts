import { Generos } from './genero';
import { Permissao } from './permissao';

export class User {
    public id: number;
    public nome: string;
    public ultimoNome: string;
    public genero: Generos;
    public senha: string;
    public email: string;
    public facebook: string = "";
    public permissao: Permissao;
    public foto: string = "";
    public nascimento:Date;
    public connected:boolean=false;

    constructor() {
    }
}
