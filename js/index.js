$(document).ready(function(){
    // transitions to answer panel by showing answer panel and hiding extra resources panel
    function toggleAnsSection() {
        $("#extra_resources").hide();
        $("#answer").show();
        $("#nav_res > pre").css("color","rgba(0,0,0,0)");
        $("#nav_ans > pre").css("color","black");
    }

    // transitions to extra resources panel by showing extra resources panel and hiding answer panel
    function toggleResSection() {
        $("#answer").hide();
        $("#extra_resources").show();
        $("#nav_ans > pre").css("color","rgba(0,0,0,0)");
        $("#nav_res > pre").css("color","black");
    }

    // updates the progress display in the head of the progress panel
    function updateProgress() {
        if(($("#indicate_solution > pre").css("color")=="rgb(0, 0, 0)")&&($("#indicate_justification > pre").css("color")=="rgb(0, 0, 0)")){
            $("#progress").html("Progress (2/2)");
        } else if(($("#indicate_solution > pre").css("color")=="rgb(0, 0, 0)")||($("#indicate_justification > pre").css("color")=="rgb(0, 0, 0)")){
            $("#progress").html("Progress (1/2)");
        } else {
            $("#progress").html("Progress (0/2)");
        }
    }

    // switch to review mode by hiding progress panel and displaying feedback panel etc.
    function setUpReviewEnvironment(){
        $("#right_nav").hide();
        $("#feedback_container").show();
        $("#finish_review_button").show();
        toggleAnsSection();
        $("#solution, #justification").prop("readonly",true);
        $("#submit_button").hide();
        $("#home_button").click(function(){$("#finish_review_button").click();});
    }

    // store user's provided feedbacks across pages
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

    // populate feedback panel with stored user's feedbacks
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

    // initialise feedback storing arrays in session storage
    if(sessionStorage.ownFeedbacks===undefined){
        sessionStorage.ownFeedbacks=JSON.stringify([]);
    }
    if(sessionStorage.peerFeedbacks===undefined){
        sessionStorage.peerFeedbacks=JSON.stringify([]);
    }

    // transitions to answer panel from extra resources panel
    $("#next_button, #nav_ans").click(function(){
        toggleAnsSection();
    });

    // transitions to extra resources panel from answer panel
    $("#prev_button, #nav_res").click(function(){
        toggleResSection();
    });

    // detect text changes in answer text area to appropriately change progress
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

    // expand the option to review peers
    $("#expand_peer_button").click(function(){
        $("#peers").slideToggle();
        if($("#expand_peer > p").html() === "+ Peer Answers"){
            $("#expand_peer > p").html("- Peer Answers");
        } else {
            $("#expand_peer > p").html("+ Peer Answers");
        }
    });

    // store the submitted answers
    $("#submit_button").click(function(){
        sessionStorage.solution=$("#solution").val();
        sessionStorage.justification=$("#justification").val();
    });

    // SET appropriate mode for system
    $("#own_button").click(function(){
        sessionStorage.mode="OWN";
    });
    $("#peer_button").click(function(){
        sessionStorage.mode="PEER";
    });

    // publish user's provided feedbacks
    $("#comment_button").click(function(){
        var feedback = "<p> <b>Levi:</b> " + $("#comment_box").val() + "</p>";
        $("#feedbacks > p:last-child").after(feedback);
        $("#comment_box").val("");
        storeFeedback(feedback,sessionStorage.mode);
    });

    // set up the reviewing environment
    if(sessionStorage.mode == "OWN"){
        setUpReviewEnvironment();
        $("#solution").val(sessionStorage.solution);
        $("#justification").val(sessionStorage.justification);
        populateFeedback("OWN");
        $("#feedbacks > p:first-child").html("<b>Stella:</b> Good answer");
    } else if(sessionStorage.mode == "PEER"){
        setUpReviewEnvironment();
        $("#solution").val("Strength training consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ");
        $("#justification").val("Strength training duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
        populateFeedback("PEER");
        $("#feedbacks > p:first-child").html("<b>Stella:</b> Constructive feedbacks welcomed");
    }

    // allow current date to be displayed in completed assignment entry
    var date = new Date();
    var month = date.getMonth() + 1; // because it starts at 0
    var dueMonth = month + 1; 
    $("#due_date").html(date.getDate() + '/' + dueMonth + '/' + date.getFullYear());
    $("#completed_date").html(date.getDate() + '/' + month + '/' + date.getFullYear());

});
