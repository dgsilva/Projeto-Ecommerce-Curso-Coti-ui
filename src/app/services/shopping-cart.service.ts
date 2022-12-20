import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
 
  key: string = 'shopping-cart';
 
  dados = {
      itens: [{
          id: 0,
          nome: '',
          preco: 0,
          quantidade: 0,
          total: 0,
          foto: new Blob(),
      }],
      valorTotal: 0,
      quantidadeItens: 0
  };

  constructor() { }

  adicionarItem(item: Produto): void {
      if (localStorage.getItem(this.key) != null) {
          this.dados = JSON.parse(localStorage.getItem(this.key) as string);
      }
      else {
          this.dados.itens = [];
          this.dados.valorTotal = 0;
          this.dados.quantidadeItens = 0;
      }

      var itemJaExiste = false;
      for (var i = 0; i < this.dados.itens.length; i++) {
          if (this.dados.itens[i].id == item.id) {
              this.dados.itens[i].quantidade++;
              this.dados.itens[i].total = (this.dados.itens[i].preco * this.dados.itens[i].quantidade);

              this.dados.valorTotal += this.dados.itens[i].total;
              this.dados.quantidadeItens += this.dados.itens[i].quantidade;

              itemJaExiste = true;
              break;
          }
      }

      if (!itemJaExiste) {
          this.dados.itens.push(
              {
                  id: item.id,
                  nome: item.nome,
                  preco: item.preco,
                  quantidade: 1,
                  total: item.preco,
                  foto: item.foto as Blob
              }
          );

          this.dados.quantidadeItens += 1;
          this.dados.valorTotal += item.preco;
      }

      localStorage.setItem(this.key, JSON.stringify(this.dados));
  }

  obterCarrinhoDeCompras(): any {

      var carrinho = localStorage.getItem(this.key) as string;
      if (carrinho != null) {
          this.dados = JSON.parse(carrinho);
      }
      else {
          this.dados.itens = [];
          this.dados.valorTotal = 0;
          this.dados.quantidadeItens = 0;
      }

      return this.dados;
  }

  limparCarrinho(): void {
      if (window.confirm('Deseja realmente remover todos os itens do carrinho?')) {
          localStorage.removeItem(this.key);
      }
  }

  adicionarQuantidadeItem(item: Produto): void {
      this.dados = JSON.parse(localStorage.getItem(this.key) as string);
      for (var i = 0; i < this.dados.itens.length; i++) {
          if (this.dados.itens[i].id === item.id) {
              this.dados.itens[i].quantidade++;
          }
      }

      this.dados.valorTotal += item.preco;
      this.dados.quantidadeItens++;

      localStorage.setItem(this.key, JSON.stringify(this.dados));
  }

  diminuirQuantidadeItens(item: Produto): void {
      this.dados = JSON.parse(localStorage.getItem(this.key) as string);
      for (var i = 0; i < this.dados.itens.length; i++) {
          if (this.dados.itens[i].id === item.id) {
              this.dados.itens[i].quantidade--;
          }
      }

      this.dados.itens = this.dados.itens.filter(
          function (produto) {
              return produto.quantidade > 0;
          }
      );

      this.dados.valorTotal -= item.preco;
      this.dados.quantidadeItens--;

      localStorage.setItem(this.key, JSON.stringify(this.dados));
  }
}
