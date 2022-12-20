import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
//armazenar os itens do carrinho de compras
dados: any = {};
 
constructor(
  private shoppingCartService: ShoppingCartService //injeção de dependência
) { }

ngOnInit(): void {
  //trazer todos os itens contidos no carrinho de compras
  this.dados = this.shoppingCartService.obterCarrinhoDeCompras();
}

limpar(): void {
  this.shoppingCartService.limparCarrinho();
  this.ngOnInit();
}

adicionar(item: Produto): void {
  this.shoppingCartService.adicionarQuantidadeItem(item);
  this.ngOnInit();
}

remover(item: Produto): void {
  this.shoppingCartService.diminuirQuantidadeItens(item);
  this.ngOnInit();
}

}
