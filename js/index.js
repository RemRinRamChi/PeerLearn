$(document).ready(function(){

function toggleAnsSection() {
    $("#extra_resources").hide();
    $("#answer").show();
    $("#nav_res > pre").css("color","rgba(0,0,0,0)");
    $("#nav_ans > pre").css("color","black");
}

function toggleResSection() {
    $("#answer").hide();
    $("#extra_resources").show();
    $("#nav_ans > pre").css("color","rgba(0,0,0,0)");
    $("#nav_res > pre").css("color","black");
}

function updateProgress() {
    if(($("#indicate_solution > pre").css("color")=="rgb(0, 0, 0)")&&($("#indicate_justification > pre").css("color")=="rgb(0, 0, 0)")){
        $("#progress").html("Progress (2/2)");
    } else if(($("#indicate_solution > pre").css("color")=="rgb(0, 0, 0)")||($("#indicate_justification > pre").css("color")=="rgb(0, 0, 0)")){
        $("#progress").html("Progress (1/2)");
    } else {
        $("#progress").html("Progress (0/2)");
    }
}

$("#next_button, #nav_ans").click(function(){
    toggleAnsSection();
});

$("#prev_button, #nav_res").click(function(){
    toggleResSection();
});

$("#solution").on('change keyup paste', function() {
    var value = $(this).val();
    if(value.trim() === ""){
        $("#indicate_solution > pre").css("color","rgba(0,0,0,0)");
    } else {
        $("#indicate_solution > pre").css("color","black");
    }
    updateProgress();
});

$("#justification").on('change keyup paste', function() {
    var value = $(this).val();
    if(value.trim() === ""){
        $("#indicate_justification > pre").css("color","rgba(0,0,0,0)");
    } else {
        $("#indicate_justification > pre").css("color","black");
    }
    updateProgress();
});


});
