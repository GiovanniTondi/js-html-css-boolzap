// general function
function oraAttuale() {
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    return hours + ':' + minutes;
}

function generaContatti(array) {

    if (!array) {
        var array = ['Michele','Fabio','Samuele','Alessandro','Claudia','Davide','Federico'];
    }

    var target = $('.contacts-container .contacts');
    target.html('');

    if (array.length > 0) {

        for (var i = 0; i < array.length; i++) {
            var template = $('.template .contatto').clone();
            $(template).find('.contact-name').text(array[i]);
            target.append(template);
        }
    } else {
        target.text('Nessuna corrispondenza!');
    }
}

function isStringInArray(string, array) {

    if (!string) {
        return false;
    } else {
        var corrispondenza = false;
        var arrayFiltrato = [];

        for (var i = 0; i < array.length; i++) {
            array[i] = array[i].toLowerCase();
            if (array[i].includes(string.toLowerCase())) {
                arrayFiltrato.push(array[i]);
                corrispondenza = true;
            }
        }

        if (!corrispondenza) {
            return false;
        }

        return arrayFiltrato;
    }

}

function collectName() {
    var objNomi = $('.contacts .contatto .contact-name');
    var nomi = [];
    objNomi.each(function () {
        nomi.push($(this).text());
    })

    return nomi;
}

function filtraUtenti() {
    var filtro = $(this).val();
    var nomi = collectName();

    console.log('nomi',filtro);
    var nomiFiltrati = isStringInArray(filtro, nomi);
    console.log('nomiFiltrati',nomiFiltrati);
    if (nomiFiltrati) {
        generaContatti(nomiFiltrati);
    } else if (filtro) {
        var arrVuoto = [];
        generaContatti(arrVuoto);

        console.log('Nessun contatto trovato');
    } else {
        generaContatti();
    }
}

// send function
function sendMessage(txt, type) {
    var chat = $('.chat-container main');
    var template = $('.template .bubble').clone();
    template.addClass(type);
    $(template).children('.message-text').text(txt);
    $(template).children('small').text(oraAttuale());
    chat.append(template);
}

// listener
function listenerKeyup() {
    var msg = $('#messaggio');
    var searchBox = $('#search');

    var nomi = collectName();
    searchBox.keyup(function(){
        var filtro = $(this).val();
        var nomiFiltrati = isStringInArray(filtro, nomi);

        if (nomiFiltrati) {
            generaContatti(nomiFiltrati);
        } else if (filtro) {
            var arrVuoto = [];
            generaContatti(arrVuoto);
        } else {
            generaContatti();
        }
    });

    msg.keyup(function (event) {
        var key = event.which;
        if (key == '13' && msg.val() != '') {
            var txt = msg.val();
            msg.val('');
            sendMessage(txt, 'sent');
            setTimeout(function () { sendMessage('ok', 'received') }, 1000);
        }
    })
}

function chatDropdown() {

    $(document).on('click', '.message-options', function () {
        $(this).next('.message-dropdown').toggle();

        $('.message-dropdown .message-info').click(function () {
            console.log('info click');
        })

        $('.message-dropdown .message-delete').click(function () {
            $(this).parents('.bubble').remove();
        })
    })


}

function init() {
    generaContatti()
    listenerKeyup();
    chatDropdown();
}


$(document).ready(init);
