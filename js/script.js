
function oraAttuale() {
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    return hours + ':' + minutes;
}

function generaContatti(array) {

    if (!array || array.length == 0) {
        var array = ['Michele','Fabio','Samuele','Alessandro','Claudia','Davide','Federico'];
    }

    var target = $('.contacts-container .contacts');
    target.html('');
    for (var i = 0; i < array.length; i++) {
        var template = $('.template .contatto').clone();
        $(template).find('.contact-name').text(array[i]);
        target.append(template);
    }
}

function autoReply() {
    setTimeout(function () {
        var chat = $('.chat-container main');
        var template = $('.template .bubble.received').clone();
        $(template).children('p').text('ok');
        $(template).children('small').text(oraAttuale());
        chat.append(template);
    }, 1000);
}

function listenerKeyup() {
    var msg = $('#messaggio');
    var searchBox = $('#search');

    searchBox.keyup(filterUser);

    msg.keyup(function (event) {
        var key = event.which;
        if (key == '13' && msg.val() != '') {
            var txt = msg.val();
            msg.val('');
            sendMessage(txt);
        }
    })
}

function sendMessage(txt) {
    var chat = $('.chat-container main');
    var template = $('.template .bubble.sent').clone();
    $(template).children('p').text(txt);
    $(template).children('small').text(oraAttuale());
    chat.append(template);
    autoReply();
}

function collectName() {
    var objNomi = $('.contacts .contatto .contact-name');
    var nomi = [];
    objNomi.each(function functionName() {
        nomi.push($(this).text());
    })

    return nomi;
}

function filterUser() {
    var filtro = $(this).val();
    // console.log(filtro);
    var nomi = collectName();
    var nomiFiltrati = [];
    if (!filtro) {
        generaContatti();
    } else {
        for (var i = 0; i < nomi.length; i++) {
            nomi[i] = nomi[i].toLowerCase();
            if (nomi[i].includes(filtro)) {
                nomiFiltrati.push(nomi[i]);
            }
        }
        generaContatti(nomiFiltrati);
    }
}


function init() {
    generaContatti()
    listenerKeyup();
}


$(document).ready(init);
