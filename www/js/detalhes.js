// recuperar Id detalhes dolocalStorage
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorege
var produtos = JSON.parse(localStorage.getItem('produtos'));
// metodo para comparação
var item = produtos.find(produto => produto.id === id);

if (item){
    console.log('Produto encontrado: ',item);

    // Alimentar os valores dos item 
    $("#imagem-detalhe").attr('src', item.imagem)
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating)
    $("#like-detalhe").html(item.likes)
    $("#reviews-detalhe").html(item.reviews + ' reviews');
    $("#descricao-detalhe").html(item.descricao)



}else{
    console.log('Produto não encontrado');
}



    

