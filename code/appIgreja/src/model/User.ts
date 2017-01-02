import { Generos } from './genero';
import { Permissao } from './permissao';

export class User {
    private id: number;
    private uid:number;//codigo do firebase
    private nome: string;
    private ultimoNome: string;
    private genero: Generos;
    private senha: string;
    private email: string;
    private facebook: string;
    private permissao: Permissao;
    private foto:string;


    constructor() {

    }
}
