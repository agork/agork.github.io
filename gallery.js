var folder = "/images/2018_03_15-16_sesja_ix/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif|JPG)$/) ) {
                $("body").append( "<img src='"+ folder + val +"'>" );
            }
        });
    }
});
