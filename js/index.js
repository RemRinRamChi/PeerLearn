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

    $("#expand_peer").click(function(){
        $("#peers").slideToggle();
        if($("#expand_peer > p").html() === "+ Peer Answers"){
            $("#expand_peer > p").html("- Peer Answers");
        } else {
            $("#expand_peer > p").html("+ Peer Answers");
        }
    });

    $("#submit_button").click(function(){
        sessionStorage.solution=$("#solution").val();
        sessionStorage.justification=$("#justification").val();
    });
    $("#own_button").click(function(){
        sessionStorage.mode="OWN";
    });
    $("#peer_button").click(function(){
        sessionStorage.mode="PEER";
    });

    $("#comment_button").click(function(){
        $("#feedbacks > p:last-child").after("<p> <b>Levi:</b> " + $("#comment_box").val() + "</p>");
        $("#comment_box").val("");
    });

    if(sessionStorage.mode == "OWN"){
        $("#right_nav").hide();
        $("#feedback_container").show();
        $("#finish_review_button").show();
        $("#solution").val(sessionStorage.solution);
        $("#justification").val(sessionStorage.justification);
        toggleAnsSection();
        $("#solution, #justification").prop("readonly",true);
        $("#submit_button").hide();
    }

});
