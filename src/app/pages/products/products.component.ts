import { ProdutosService } from 'src/app/services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Produto } from 'src/app/models/produto.model';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.models';
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  //atributos
  produtos: Produto[] = [];
  categorias: Categoria[] = [];
 
  constructor(
    //inicializando por meio de injeção de dependência
    private produtoService: ProdutosService,
    private categoriaService: CategoriaService,
    private shoppingCartService: ShoppingCartService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) { }
 
  //evento executado antes do componente carregar
  ngOnInit(): void {
    this.obterProdutos();
    this.obterCategorias();
  }
 
  //evento executado quando uma categoria for selecionada
  onChange(event: any): void {
    if (event.target.value != 0)
      this.obterProdutos(event.target.value);
    else
      this.obterProdutos();
  }
 
  //evento executado ao clicar no botão 'comprar'
  onClick(produto: Produto): void {
    //adicionar o produto no carrinho de compras
    this.shoppingCartService.adicionarItem(produto);
    //redirecionar para a página do carrinho de compras
    this.router.navigate(['/carrinho-de-compras']);
  }
 
  obterProdutos(categoriaID?: number) {
    this.spinnerService.show();
    this.produtoService.getProdutos(categoriaID)
      .subscribe({
        next: (data:any) => {
          this.produtos = data;
        },
        error: (e:any) => {
          console.log(e);
        }
      }).add(() => {
        this.spinnerService.hide();
      })
  }
 
  obterCategorias() {
    this.categoriaService.getCategorias()
      .subscribe({
        next: (data) => {
          this.categorias = data;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }
 
}
 
