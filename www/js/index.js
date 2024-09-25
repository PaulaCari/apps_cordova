/*teste comando*/
/*app.dialog.alert('ola mundo');*/

//requisição protocolo http, para backend
fetch('js/backend.json')
.then(Response => Response.json())
.then(data=>{
    // salvar os dados vindos do back-end localmente
    // utilizar localstorage(armazenamento local)
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');


    
    // adicionar um temporizador (Simular o cargamento online)
    setTimeout(() => {

        // esvaziar a area de produtos (escodeu os card)
        $("#produtos").empty();

        // percorrido de  cada items
        data.forEach(produto => {
            var produtoHTML = `
             <!-- item card -->
                <div class="item-card">
                  <a data-id="${produto.id}" href="#" class="item">
                    <div class="img-container">
                      <img  src="${produto.imagem}">
                    </div>

                    <div class="nome-rating">
                      <span class="color-gray">${produto.nome}</span>
                      <span class="bold margin-right">
                        <i class="mdi mdi-star"></i>
                       ${produto.rating}
                      </span>
                    </div>
                    <div class="price"> ${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                  </a>
                </div>
        `;
            // adiciona os produtos nos card
            $("#produtos").append(produtoHTML)

        });

    }, 2000); //tempo em milesegundos

})
// se der errado
.catch(error => console.error('erro ao fazer fech dos dados: '+error));



