import { Categoria } from "./categoria.models";

export class Produto{
    id: number = 0;
    nome: string = '';
    preco: number = 0.0;
    quantidade: number = 0;
    descricao: string = '';
    foto: Blob | null = null;
    categoria: Categoria = new Categoria()

}