
function oraAttuale() {
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    return hours + ':' + minutes;
}

function generaContatti() {
    var nomi = ['Michele','Fabio','Samuele','Alessandro','Claudia','Davide','Federico'];

    var target = $('.contacts-container .contacts');
    for (var i = 0; i < nomi.length; i++) {
        var template = $('.template .contatto').clone();
        $(template).find('.contact-name').text(nomi[i]);
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



function init() {
    generaContatti()
    listenerKeyup();
}


$(document).ready(init);
