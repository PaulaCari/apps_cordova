// teste de comunicação
//app.dialog.alert('disparou');

// Responsavel pela logica da pag de carrinho
var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length >0){
        // tem item no carrinho
        // Renderizar o carrinho
        // somar totais dos produtos
    }else{
        //mostrar carrinho vazio

    }

}else{
    // Mostrar carrinho vazio
}

