import { Produto } from './../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

   //atributo
   endpoint: string = environment.apiProdutos + '/produtos';
 
   constructor(
       //inicializando a classe HttpClient por injeção de dependência
       private httpClient: HttpClient
   ) {
   }

   //função para retornar a lista de produtos
   getProdutos(categoriaID?: number): Observable<Produto[]> {

       if (categoriaID != undefined)
           return this.httpClient.get<Produto[]>(this.endpoint + "/" + categoriaID);
       else
           return this.httpClient.get<Produto[]>(this.endpoint);
   }

}
