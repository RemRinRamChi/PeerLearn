$(document).ready(function(){

    function togglePeerSection() {
        $("#peers").slideToggle();
    }

    $("#expand_peer").click(function(){
        togglePeerSection();
        if($("#expand_peer > p").html() === "+ Peer Answers"){
            $("#expand_peer > p").html("- Peer Answers");
        } else {
            $("#expand_peer > p").html("+ Peer Answers");
        }
    });

});
