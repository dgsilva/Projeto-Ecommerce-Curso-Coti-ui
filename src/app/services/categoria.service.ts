import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
//atributos
endpoint: string = environment.apiProdutos + "/categorias";
 
//construtor
constructor(
    private httpClient: HttpClient
) {
}

//método para consultar as categorias
getCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.endpoint);
}


}
