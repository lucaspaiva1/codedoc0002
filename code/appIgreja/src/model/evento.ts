export class Evento{

  public IDEvento: number;
  public DataInicio: Date;
  public DataTermino: Date;
  public HoraInicio: any;
  public HoraTermino: any;
  public Titulo: string;
  public Descricao: string;
  public Local: string;
  public Usuario_IDUsuario: number = 1;
  public EventoDiario: boolean = false;

  constructor(){

  }
}
