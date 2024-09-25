// recuperar Id detalhes dolocalStorage
var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorege
var produtos = JSON.parse(localStorage.getItem('produtos'));
// metodo para comparação
var item = produtos.find(produto => produto.id === id);

if (item){
    console.log('Produto encontrado: ',item);

    // Alimentar os valores dos item 
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + ' reviews');
    $("#descricao-detalhe").html(item.descricao);

    // Toolbar
    $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    // Montar a Tabela
    var tabelaDetalhes = $("#tabdetalhes");
    // Percorrer detalhes
    item.detalhes.forEach(detalhe => {
        var linha = `
        //  Criar a linha dinamicamente
        <tr>
            <td>${detalhe.caracteristica}</td>
            <td>${detalhe.detalhes}</td>
        </tr>
        `;
     //adicionar a linha
        tabelaDetalhes.append(linha);
      
    });

}else{
    console.log('Produto não encontrado');
}



var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
// função Adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade){  
    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id)

    if (itemNoCarrinho){
        // ja tem o item no carrinho asicionar a quantiodade
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;

    }else{
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        });
    };

    // atualizar localStorage de carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho) )

    //clico no btn adiconar carrinho
    $(".add-card").on('click', function(){
        adicionarAoCarrinho(item, 1); //vem da var linha 7
    })

}




    

