import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/validators/password-match.validator';
import { NgxSpinnerService } from "ngx-spinner";
import { ClienteService } from 'src/app/services/cliente.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  mensagem: string = '';
 
  constructor(
    private clientesService: ClienteService,
    private spinnerService: NgxSpinnerService,
  ) { }
 
  ngOnInit(): void {
  }
 
  formRegister = new FormGroup({
    nome: new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
 
    email: new FormControl('',
      [Validators.required, Validators.email]),
 
    telefone: new FormControl('',
      [Validators.required]),
 
    senha: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
 
    senhaConfirmacao: new FormControl('',
      [Validators.required]),
  }, {
    //adicionar a validações customizadas
    validators: [
      PasswordMatchValidator.MatchPassword,
    ]
  });
 
  get form(): any {
    return this.formRegister.controls;
  }
 
  //função para processar o SUBMIT do formulário
  onSubmit(): void {
 
    this.mensagem = '';
    this.spinnerService.show();
 
    this.clientesService.postClientes(this.formRegister.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
          this.formRegister.reset();
        },
        error: (e:any) => {
          this.mensagem = 'Falha. Não possível realizar o cadastro do cliente.';
          console.log(e.error);
        }
      }).add(() => {
        this.spinnerService.hide();
      })
 
  }
}
