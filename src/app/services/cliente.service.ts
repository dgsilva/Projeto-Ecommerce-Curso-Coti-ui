import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
//atributos
endpointClientes: string = environment.apiClientes + "/clientes";
endpointAuth: string = environment.apiClientes + "/auth";

constructor(
    private httpClient: HttpClient
) {

}

//método para cadastrar clientes
postClientes(data: any) {
    return this.httpClient.post(this.endpointClientes, data);
}

//método para autenticar clientes
postAuth(data: any) {
    return this.httpClient.post(this.endpointAuth, data);
}

}
