// recuperar Id detalhes dolocalStorage
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorege
var produtos = JSON.parse(localStorage.getItem('produtos'));
// metodo para comparação
var item = produtos.find(produto => produto.id === id);

if (item){
    console.log('Produto encontrado: ',item);
}else{
    console.log('Produto não encontrado');
}



    

