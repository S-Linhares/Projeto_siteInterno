document.addEventListener("DOMContentLoaded", function(){
    var inspetor_radio = document.getElementById('inspetor_radio');
    var terceirizado_radio = document.getElementById('terceirizado_radio');
    var inspetor_selecao_remetente = document.getElementById('inspetor');
    var terceirizado_selecao_remetente = document.getElementById('terceirizado');

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

    function checked_remetente_terceirizado(){
        inspetor_radio.checked = false;
        terceirizado_radio.checked = true;
    }

    function checked_remetente_inspetor(){
        inspetor_radio.checked = true;
        terceirizado_radio.checked = false;
    }

    function radio_requerido(){
        if(inspetor_radio.checked == false && terceirizado_radio.checked == false){
            inspetor_radio.required = true;
            terceirizado_radio.required = true;
        }
    }

    inspetor_radio.addEventListener("change", disab_remetente);
    terceirizado_radio.addEventListener("change", disab_remetente);

    inspetor_radio.addEventListener("dblclick", unchecked_remetente);
    terceirizado_radio.addEventListener("dblclick", unchecked_remetente);

    terceirizado_radio.addEventListener("click", checked_remetente_terceirizado);
    inspetor_radio.addEventListener("click", checked_remetente_inspetor);

    radio_requerido();
});