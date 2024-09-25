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
})
// se der errado
.catch(error => console.error('erro ao fazer fech dos dados: '+error));



