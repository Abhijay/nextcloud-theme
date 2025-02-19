jQuery(function($){

    $('.loadNews').each(function(){
        let currentPage = 1;
        $(this).on('click', function() {

            var thisBtn = $(this);
            //console.log("currentPage:"+currentPage);
            currentPage++; // Do currentPage + 1, because we want to load the next page
            var button = $(this);
            var textBtn = button.html();


            var action = 'nc_load_more';
            var data = {
                paged: currentPage
            };

            if($(this).data("category")){
                var cat_id = $(this).data("category");
                //console.log(cat_id);
                action = 'nc_cat_load_more';
                data.category = cat_id;
            }

            //searching page
            if($(this).data("search")){
                action = 'nc_search_load_more';
                data.post_type = $(this).data('post-type');
            }


            if($(this).data('post-type') == 'event') {
                var cat_id = $(this).data("category");

                if(cat_id && cat_id!='') {
                    //console.log("cat_id: "+cat_id);
                    action = 'nc_term_load_more';
                    data.category = cat_id;
                    data.post_type = $(this).data('post-type');
                } else {
                    //console.log("NC load more events");
                    action = 'nc_load_more';
                    data.post_type = $(this).data('post-type');
                }
                
            }


            if($(this).data('post-type') == 'past_webinars') {
                action = 'nc_past_webinars_load_more';
                data.post_type = 'event';
            }


            data.action = action;

            $.ajax({
                type: 'POST',
                url: '/wp-admin/admin-ajax.php',
                dataType: 'html',
                data: data,
                beforeSend : function ( xhr ) {
                    button.text('Loading...'); // change the button text, you can also add a preloader image
                    //console.log(data);
                    //console.log("current page: "+currentPage);
                },
                success: function (res) {
                    $(thisBtn).parents('.loadNews_row').siblings('.row-list-blog').append(res);
                    button.text(textBtn);
                },
                error: function (res) {
                    $(thisBtn).parents('.loadNews_row').siblings('.row-list-blog').append(res);
                    button.text(textBtn);
                }
            });
        });
    });

});