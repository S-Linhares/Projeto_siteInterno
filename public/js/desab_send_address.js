document.addEventListener("DOMContentLoaded", function(){
    var inspetor_radio = document.getElementById('inspetor_radio');
    var terceirizado_radio = document.getElementById('terceirizado_radio');
    var inspetor_selecao_remetente = document.getElementById('inspetor');
    var terceirizado_selecao_remetente = document.getElementById('terceirizado');
    var inspetor_selecao_destinatario = document.getElementById('inspetor_d');
    var terceirizado_selecao_destinatario = document.getElementById('terceirizado_d');
    var inspetor_radio_d = document.getElementById('inspetor_radio_d');
    var terceirizado_radio_d = document.getElementById('terceirizado_radio_d');

    function disab_remetente(){
        if(inspetor_radio.checked){
            inspetor_selecao_remetente.disabled = false;
            terceirizado_selecao_remetente.disabled = true;
            inspetor_radio.value = "on";
            terceirizado_radio.value = "off";
        }else if(terceirizado_radio.checked){
            inspetor_selecao_remetente.disabled = true;
            terceirizado_selecao_remetente.disabled = false;
            terceirizado_radio.value = "on";
            inspetor_radio.value = "off";
        }
    }

    function disab_destinatario(){
        if(inspetor_radio_d.checked){
            inspetor_selecao_destinatario.disabled = false;
            terceirizado_selecao_destinatario.disabled = true;
            inspetor_radio_d.value = "on";
            terceirizado_radio_d.value = "off";
        }else if(terceirizado_radio_d.checked){
            inspetor_selecao_destinatario.disabled = true;
            terceirizado_selecao_destinatario.disabled = false;
            terceirizado_radio_d.value = "on";
            inspetor_radio_d.value = "off";
        }
    }

    function unchecked_destinatario(){
        if(inspetor_radio_d.checked){
            inspetor_radio_d.checked = false;
            inspetor_selecao_destinatario.disabled = true;
            inspetor_radio_d.value = "off";
        }else if(terceirizado_radio_d.checked){
            terceirizado_radio_d.checked = false;
            terceirizado_selecao_destinatario.disabled = true;
            terceirizado_radio_d.value = "off";
        }
    }

    function unchecked_remetente(){
        if(inspetor_radio.checked){
            inspetor_radio.checked = false;
            inspetor_selecao_remetente.disabled = true;
            inspetor_radio.value = "off";
        }else if(terceirizado_radio.checked){
            terceirizado_radio.checked = false;
            terceirizado_selecao_remetente.disabled = true;
            terceirizado_radio.value = "off";
        }
    }

    inspetor_radio.addEventListener("change", disab_remetente);
    terceirizado_radio.addEventListener("change", disab_remetente);
    inspetor_radio_d.addEventListener("change", disab_destinatario);
    terceirizado_radio_d.addEventListener("change", disab_destinatario);

    inspetor_radio_d.addEventListener("dblclick", unchecked_destinatario);
    terceirizado_radio_d.addEventListener("dblclick", unchecked_destinatario);
    inspetor_radio.addEventListener("dblclick", unchecked_remetente);
    terceirizado_radio.addEventListener("dblclick", unchecked_remetente);

    disab_remetente();
    disab_destinatario();
    unchecked_destinatario();
    unchecked_remetente();
});