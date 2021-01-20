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
            $url = "https://autosug.ebay.com/autosug?_jgr=1&sId=15&_ch=0&_ac=0&_f=ac6&_cp=8&_ps=1&callback=0&kwd=" + $("#keyword_").val()
        
            $.getJSON( $url, request, function( data, status, xhr ) {
                console.log(data)
                if ( data['res'] !== undefined ) {
                    if (data['res']['categories'] !== undefined ) {
                        $res_cat_list = data['res']['categories']
                        $res_kwd = data['res']['sug']
                        var $res_cat = [];
                        for (var i=0; i<$res_cat_list.length; i++){
                            arr = $res_kwd[0] + ' - ' + $res_cat_list[i][1]
                            $res_kwd.splice(1+i,0,arr)
                            $res_cat.push(arr)
                        };
                        $res_data = $res_kwd;
                        cache[ term ] = $res_data;
                        response( $res_data );
                    } else {
                        $res_data = data['res']['sug']
                        cache[ term ] = $res_data;
                        response( $res_data );
                    }
                } else {
                    $res_data = [];
                    cache[ term ] = $res_data;
                    response( $res_data );
                }
            });
        }
    });
});