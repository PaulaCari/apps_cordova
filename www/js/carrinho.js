// teste de comunicação
//app.dialog.alert('disparou');

// Responsavel pela logica da pag de carrinho
var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length >0){
        // tem item no carrinho

        // Renderizar o carrinho
        renderizarCarrinho();

        // somar totais dos produtos
        calcularTotal();

    }else{
        //mostrar carrinho vazio
        carrinhoVazio();

    }

}else{
    // Mostrar carrinho vazio
    carrinhoVazio();
}

// segunda função renderizar carrinho
function renderizarCarrinho(){
    //Esvaziar a area dos item
    $("#listacarrinho").empty();

    //Percorrer o nosso carrinho e alimentar a area 
    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `
            <!-- item do carrinho -->

             <div class="item-carrinho">
              <div class="area-img">
                <img src="${itemCarrinho.item.imagem}" alt="">
              </div>

              <div class="area-details">
                <div class="sup">
                  <span class="name-prod">
                    ${itemCarrinho.item.nome}
                  </span>

                  <a data-index="${index}" class="delete-item" href="#">
                    <i class="mdi mdi-close"></i>
                  </a>
                </div>

                   <div class="middle">
                  <span>${itemCarrinho.item.principal_caracteristica}</span>
                </div>
                

                <div class="preco-quantidade">
                  <span>  ${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>

                 
                  <div class="count">
                    <a class="minus"  data-index="${index}"   href="#">-</a>
                    <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}"> 
                    <!-- readonly é só letura não poden alterar -->
                    <a class="plus"   data-index="${index}"   href="#">+</a>
                  </div>
                </div>
               </div>
        `;

        $("#listacarrinho").append(itemDiv);      
    });



    //activar o botão de deletar (X)
    $(".delete-item").on('click', function () {
        var index = $(this).data('index');    //attr('data-index')
        console.log('O indice é: ', index);
        //Confirmar
        app.dialog.confirm('Tem certeza que quer remover este item?', 'Remover', function () {
            
            // Remover o item do carrrinho
            carrinho.splice(index, 1);
            // Atualizar o carrinho com item removido
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            //Atualizar a pagina
            app.views.main.router.refreshPage();
        });
    });


    // Activar os botoes minus (-)
    $(".minus").on('click', function () {
        var index = $(this).data('index');    
        console.log('O indice é: ', index);

        // Sem tem mais de um item na quantidade
        if(carrinho[index].quantidade >1){
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;

            localStorage.setItem('carrinho', JSON.stringify(carrinho));

            app.views.main.router.refreshPage();
        }else{
            var itemname = carrinho[index].item.nome
            app.dialog.confirm(`Gostaria de remover<strong>${itemname}</strong>?`, 'REMOVER',function(){

                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderizarCarrinho();
                calcularTotal(); 
            });
        }
    });

    // Activar os botão mais (+)
    $(".plus").on('click', function () {
        var index = $(this).data('index');
        console.log('O indice é: ', index);

        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
        calcularTotal();  
    });
}



//terceira funcção calcular Total (subtotal)
function calcularTotal(){
    var totalCarrinho = 0;
    //Percorrer o carinho
    $.each(carrinho, function (index, itemCarrinho) {
        totalCarrinho += itemCarrinho.total_item;
    });
    //Mostrar o total
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
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


