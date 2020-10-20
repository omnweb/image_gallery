import $ from 'jquery' // Importando o jQuery

// Importando elementos que serão lidos após o carregamento ter sido efetuado com sucesso
import { onLoadHtmlSuccess } from '../core/includes'

 // Duração da animação
const duration = 600

// Função para filtrar as cidades
function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        //  verificando se o elemento é um alvo
        // Se city for nulo será verdadeiro e exibirá todas as imagens
        // Se city for != de null, ele verifica se é exatamente igual a wm-city
        const isTarget = $(this).attr('wm-city') === city
            || city === null
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}
// Neste ponto já temos todas as cidades dentro de set
// convertendo em array

$.fn.cityButtons = function () {
    const cities = new Set
    
    // usando set para evitar repetições quando forem add as imagens pelo botão
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-secondary']).html(city)
        btn.click(e => filterByCity(city))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-secondary', 'active']).html('Todas')
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons()
})