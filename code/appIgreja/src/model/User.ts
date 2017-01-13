import { Generos } from './genero';
import { Permissao } from './permissao';

export class User {
    public id: number;
    public uid:number;//codigo do firebase
    public nome: string;
    public ultimoNome: string;
    public genero: Generos;
    public senha: string;
    public email: string;
    public facebook: string;
    public permissao: Permissao;
    public URLFoto: string = "http://kleberaquino.com.br/wp-content/uploads/2016/02/anonimo.png";
    public nascimento:Date;


    constructor() {

    }
}
