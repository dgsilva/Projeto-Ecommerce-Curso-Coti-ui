import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelpers } from 'src/app/helpers/authentication.helpers';
import { Authentication } from 'src/app/models/authentication.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string = '';
 
  constructor(
    private clientesService: ClienteService,
    private spinnerService: NgxSpinnerService,
    private authenticationHelper: AuthenticationHelpers,
    private router: Router,
  ) {
 
    //verificar se o cliente já está autenticado
    if(this.authenticationHelper.get() != null) {
      this.router.navigate(['/finalizar-pedido']);
    }
 
  }
 
  ngOnInit(): void {
  }
 
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
 
  get form(): any {
    return this.formLogin.controls;
  }
 
  //função para processar o SUBMIT do formulário
  onSubmit(): void {
 
    this.mensagem = '';
    this.spinnerService.show();
 
    this.clientesService.postAuth(this.formLogin.value)
      .subscribe({
        next: (response: any) => {
          this.formLogin.reset();
                   
          let auth = new Authentication();
 
          auth.idCliente = response.data._id;
          auth.nome = response.data.nome;
          auth.email = response.data.email;
          auth.telefone = response.data.telefone;
          auth.accessToken = response.accessToken;
 
          //gravar os dados do cliente autenticado
          this.authenticationHelper.signIn(auth);
 
          this.router.navigate(['/finalizar-pedido']);
        },
        error: (e) => {
 
          switch (e.status) {
            case 401:
              this.mensagem = e.error.message;
              break;
 
            default:
              this.mensagem = 'Falha. Não possível realizar a autenticação do cliente.';
              console.log(e.error);
              break;
          }
        }
      }).add(() => {
        this.spinnerService.hide();
      })
  }
}
