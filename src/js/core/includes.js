import $ from 'jquery'

//Usado para resolver o problema de não conseguir carregar o html dentro de Gallery
const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccessCallbacks.includes(callback)){
        loadHtmlSuccessCallbacks.push(callback)
    }
}

// Função para ler todos os atributos wm-include
function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function (i, e){
        const url = $(e).attr('wm-include') // Pegando a url do elemento
        $.ajax({
            url,
            success(data){
                $(e).html(data) // Incluindo data no html
                $(e).removeAttr('wm-include') //Exluindo para que não seja interpretada mais de uma vez

                // chamando as callbacks
                loadHtmlSuccessCallbacks.forEach(callback => callback(data))

                //Chamando loadIncludes para que se haja mais elementos a serem incluidos dentro de data, que eles sejam carregados 
                loadIncludes(e)
            }
        })
    })
}
loadIncludes()