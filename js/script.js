
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

function sendMessage() {
    var msg = $('#messaggio');
    var chat = $('.chat-container main');
    msg.keydown(function (event) {
        var key = event.which;
        if (key == '13' && msg.val() != '') {
            var template = $('.template .bubble').clone();
            $(template).children('p').text(msg.val());
            $(template).children('small').text(oraAttuale());
            chat.append(template);
            msg.val('');
        }
    })
}


function init() {
    generaContatti()
    sendMessage();
}


$(document).ready(init);
