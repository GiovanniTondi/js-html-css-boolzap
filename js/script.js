// general function
function oraAttuale() {
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
}

function generaChat(int) {

    var chatTarget = $('.chat-container main');

    for (var i = 0; i < int; i++) {
        var chatTemplate = $('.template .chat-template .chat').clone();
        chatTemplate.attr('data-id', i);
        chatTarget.append(chatTemplate);
    }
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
            template.attr('data-id', i);
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
function sendMessage(txt, type, chatId) {
    console.log('entro in send');
    var chat = $('.chat-container main .chat[data-id="' + chatId + '"]');
    var template = $('.template .message-template .bubble').clone();
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

            var id = $('.chat.selected').data('id');

            sendMessage(txt, 'sent', id);
            setTimeout(function () { sendMessage('ok', 'received', id) }, 1000);
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

function selectChat() {

    $(document).on('click', '.contacts .contatto', function () {

        var user = $(this);
        var username = $(this).find('.contact-name').text();
        var userId = user.data('id');

        $('.contacts .contatto').removeClass('selected');
        user.addClass('selected');
        $('#contact-name').text(username);
        $('#contact-subtitle').text('Ultimo accesso oggi alle..');
        $('#chat-user-img').show();

        // console.log($('.chat[data-id=' + userId + ']'));
        $('.chat').removeClass('selected');
        $('.chat[data-id=' + userId + ']').addClass('selected');



    })
}

function init() {
    generaContatti()
    generaChat(7)
    listenerKeyup();
    chatDropdown();
    selectChat();
    // console.log(oraAttuale());
}


$(document).ready(init);
