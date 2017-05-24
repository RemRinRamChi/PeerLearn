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

    function setUpReviewEnvironment(){
        $("#right_nav").hide();
        $("#feedback_container").show();
        $("#finish_review_button").show();
        toggleAnsSection();
        $("#solution, #justification").prop("readonly",true);
        $("#submit_button").hide();
    }

    function storeFeedback(feedback, feedbackType){
        var feedback_list;
        if(feedbackType === "OWN"){
            feedback_list = JSON.parse(sessionStorage.ownFeedbacks);
            feedback_list.push(feedback);
            sessionStorage.ownFeedbacks = JSON.stringify(feedback_list);
        } else if(feedbackType === "PEER"){
            feedback_list = JSON.parse(sessionStorage.peerFeedbacks);
            feedback_list.push(feedback);
            sessionStorage.peerFeedbacks = JSON.stringify(feedback_list);
        }
    }

    function populateFeedback(feedbackType){
        var feedback_list;
        if(feedbackType === "OWN"){
            feedback_list = JSON.parse(sessionStorage.ownFeedbacks);
        } else if(feedbackType === "PEER"){
            feedback_list = JSON.parse(sessionStorage.peerFeedbacks);
        }
        for (i = 0; i < feedback_list.length; i++) {
            $("#feedbacks > p:last-child").after(feedback_list[i]);
        }

    }

    if(sessionStorage.ownFeedbacks===undefined){
        sessionStorage.ownFeedbacks=JSON.stringify([]);
    }
    if(sessionStorage.peerFeedbacks===undefined){
        sessionStorage.peerFeedbacks=JSON.stringify([]);
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

    $("#expand_peer_button").click(function(){
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
        var feedback = "<p> <b>Levi:</b> " + $("#comment_box").val() + "</p>";
        $("#feedbacks > p:last-child").after(feedback);
        $("#comment_box").val("");
        storeFeedback(feedback,sessionStorage.mode);
    });

    if(sessionStorage.mode == "OWN"){
        setUpReviewEnvironment();
        $("#solution").val(sessionStorage.solution);
        $("#justification").val(sessionStorage.justification);
        populateFeedback("OWN");
    } else if(sessionStorage.mode == "PEER"){
        setUpReviewEnvironment();
        $("#solution").val("Lorem ipsum");
        $("#justification").val("Laurel");
        populateFeedback("PEER");
    }

});
