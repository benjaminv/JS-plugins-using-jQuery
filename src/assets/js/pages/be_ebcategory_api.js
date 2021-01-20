$(function() {
    var cache = {};
    $( "#keyword_" ).autocomplete({
        minLength: 2,
        source: function( request, response ) {
            var term = request.term;
            if ( term in cache ) {
                response( cache[ term ] );
                return;
            }
            $url = 'https://raw.githubusercontent.com/benjaminv/ztrend-backend/main/python/data/categories-lv03-full.json?token=AACJCBNBXUV2D7DRVRPIBRTAA2CKA'
        
            $.getJSON( $url, request, function( data, status, xhr ) {
                console.log(data)
                if ( data !== undefined ) {
                    var $res_cat = []
                    for (var i=0; i<data.length; i++){
                        if (data[i]['level'] == 0)
                        $res_cat.push(data[i]['cat_text'])
                    };
                    console.log($res_cat);
                    $res_data = $res_cat;
                    cache[ term ] = $res_data;
                    response( $res_data );
                } else {
                    $res_data = [];
                    cache[ term ] = $res_data;
                    response( $res_data );
                }
            });
        }
    });
});