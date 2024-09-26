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
        carrinhoVazio();

    }

}else{
    // Mostrar carrinho vazio
    carrinhoVazio();
}

// Primeira função
function carrinhoVazio() {
    console.log('Carrinho  esta Vazio');
    //Esvaziar lista do carrinho
    $("#listacarrinho").empty();

    // Sumir os toolbar
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    // adiconar uma imagem sacolinha vazia
    $("#listacarrinho").html(`
        <div class="text-align-center">
        <img width="300" src="img/empty.gif">
        <br>
        <span class="color-gray"> Nada por enquanto...!</span>
        </div>
    `);
}

//deletar os item da saco
$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?', 'ESVAZIAR', function(){

        //Apagar o localstorage do carrinho
        localStorage.removeItem('carrinho');

        //Recargar a pagina
        app.views.main.router.refreshPage();
    });

})
