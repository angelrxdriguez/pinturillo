$(document).ready(function() {
    $("#selector").click(function() {
        $("body").toggleClass("claro oscuro");

        if ($("body").hasClass("oscuro")) {
            $("#selector").html('<img src="img/islam.png" class="modo" alt="">');
        } else {
            $("#selector").html('<img src="img/sun.png" class="modo" alt="">');
        }
    });
});
