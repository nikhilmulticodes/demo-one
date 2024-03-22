const myTimeout = setTimeout(latloadjs, 8000); 
setTimeout(latloadjs_search, 10000);
jQuery(document).ready(function(){
    jQuery("body").scroll(function(){
        latloadjs();
		latloadjs_search();
      });
jQuery("body").mouseover(function(){
    latloadjs();
	latloadjs_search();
  }); 
  jQuery("body").click(function(){
    latloadjs();
	latloadjs_search();
  });
});
var load_ajax = 1;
function latloadjs()
{
    get_shop_category_ajax();
    if(load_ajax == 1)
    {
        load_ajax = 0;
		get_cart_data();
        if(shop_page == 0)
        {
            get_related_products_aj();
        }
    }
    
}
var load_search = 1;
function latloadjs_search()
{
    if(load_search == 1)
    {
	   load_search = 0;
       load_js();
    }
    
}




function get_shop_category_ajax() {
   
    var cat_status =  jQuery('#shop_category').attr('cat_status');
    if(cat_status == 0)
    {
        jQuery('#shop_category').attr('cat_status','1');

        var width_view = document.querySelector('body').offsetWidth;
        if(width_view < 767)
        {
            jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                data : "action=get_shop_category_mobile",
                success: function(response){
                    //Success
                    jQuery('.cat-all').html(response);
                    jQuery('#shop_category').attr('cat_status','1');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    //Error
                    jQuery('#shop_category').attr('cat_status','0');
                }
            });
        }else{
            jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                data : "action=get_shop_category",
                success: function(response){
                    //Success
                    jQuery('#shop_category').html(response);
                    jQuery('#shop_category').attr('cat_status','1');

                    var heHeight = jQuery(".main-header").height() + 60;
                    console.log('Header Height - ', heHeight);
                    jQuery(".cat-all-box").css("height", "calc(100vh - " + heHeight + "px" + ")");

                    jQuery("div.bhoechie-tab-menu>div.list-group>a:first").eq(0).addClass("active");
                    jQuery("div.bhoechie-tab>div.bhoechie-tab-content").eq(0).addClass("active");
                    var image = jQuery("div.bhoechie-tab>div.bhoechie-tab-content.active").attr("data-image") ;
                    jQuery('div.bhoechie-tab').css('background-image', 'url('+image+')');

                        jQuery("div.bhoechie-tab-menu>div.list-group>a").hover(function(e) {
                                    e.preventDefault();
                                    jQuery(this).siblings('a.active').removeClass("active");
                                    jQuery(this).addClass("active");
                                    var index = jQuery(this).index();
                                    jQuery("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
                                    jQuery("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
                                    var image = jQuery("div.bhoechie-tab>div.bhoechie-tab-content.active").attr("data-image") ;
                                    if(typeof image !== 'undefined'){
                                        jQuery('div.bhoechie-tab').css('background-image', 'url('+image+')');
                                    } else {
                                        jQuery('div.bhoechie-tab').css('background-image', '');
                                    }
                            });

                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    //Error
                    jQuery('#shop_category').attr('cat_status','0');
                }
            }); 
        }

        
    }
    
}
jQuery(document).ready(function(){
    
     jQuery(".cat-all, #shop_category").hover(function(){
         jQuery('#shop_category').show();
         
         }, function(){
        // jQuery('#shop_category').hide();
       });  
       /*jQuery( ".cat-all" ).click(function() {
         jQuery('#shop_category').show();
       });*/
     
    jQuery(document).on("click", function(a) {
        if (jQuery(a.target).is("#shop_category") === false) {
            jQuery("#shop_category").removeAttr("style");
        }
    });
    jQuery(document).on('mouseleave','#shop_category',function(){
        jQuery("#shop_category").removeAttr("style");
    });
 });


jQuery(document).on("click", '.cat-all .icon-open-close', function() { 
    jQuery('.m-shop-cat').toggle('slow');
});

jQuery(document).on("click", '.cat-all .icon-open-close', function() { 
    jQuery('.cat-all').toggleClass('cm-open');
});

	
jQuery(document).on("click", '.icon-toggle', function() {
    var $this = jQuery(this);
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
        $this.removeClass('sub-open');
    } else {
        $this.parent().parent().find('li .sub_category_ul').removeClass('show');
        $this.parent().parent().find('.icon-toggle').removeClass('sub-open');
        $this.parent().parent().find('li .sub_category_ul').slideUp(350);
        $this.next().toggleClass('show');
        $this.addClass('sub-open');
        $this.next().slideToggle(350);
    }
});

// homepage model MC subscription  POPUP
jQuery(document).on('click','#snv_mcwp1 .btn-submit', function () {
    jQuery("#snv_mcwp1").submit(function (event) {
      var formData = {
        snv_mcwp_email: jQuery("#snv_mcwp1 #snv_mcwp_email").val(),
        action: 'snv_send_email_mc',
      };
  
      jQuery.ajax({
        type: "POST",
        url: ajaxurl,
        data : formData,
        success: function(response){
            //Success
            jQuery('#snv_mcwp1 #res_message').html(response);
            jQuery("#snv_mcwp1 #snv_mcwp_email").val('')
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            //Error
            jQuery('#snv_mcwp1 #res_message').html('<div class="error">Server error</div>');
        }
    });
  
      event.preventDefault();
    });
  });

  // homepage model MC subscription  FOOTER
jQuery(document).on('click','#snv_mcwp2 .btn-submit', function () {
    jQuery("#snv_mcwp2").submit(function (event) {
      var formData = {
        snv_mcwp_email: jQuery("#snv_mcwp2 #snv_mcwp_email2").val(),
        action: 'snv_send_email_mc',
      };
  
      jQuery.ajax({
        type: "POST",
        url: ajaxurl,
        data : formData,
        success: function(response){
            //Success
            jQuery('#snv_mcwp2 #res_message2').html(response);
            jQuery("#snv_mcwp2 #snv_mcwp_email2").val('')
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            //Error
            jQuery('#snv_mcwp2 #res_message2').html('<div class="error">Server error</div>');
        }
    });
  
      event.preventDefault();
    });
  });


// homepage model auto open after few second AJAX
jQuery(window).on("load", function () {
    var CookieValue=Cookies.get('_modelshown');
    if (CookieValue != 'true') {
        setTimeout(function () {
            var formData = {
                action: 'get_homeauto_modal',
              };
            jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                data : formData,
                success: function(response){
                    //Success
                    jQuery('#set_homeauto_modal').html(response);
                    jQuery('#homeauto-modal').modal('show'); 
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    
                }
            });
        }, 1000);
        var date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        //Cookies.set('_modelshown', 'true', { expires: date });
    }
});

function class_hide_show_7s()
{
    jQuery('.class7s_add').removeClass('hide');
}
jQuery(window).on("load", function () {
jQuery('.class7s_add').addClass('hide');
});

setInterval(empty_cart, 1000);
// product detail page related product
function empty_cart() {
    if(!jQuery( ".product-bottom-sec" ).hasClass( "slick-slider" ))
    {
        jQuery('.product-bottom-sec').slick({
            dots: false,
            infinite: true,
            arrows: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: false,
            prevArrow: '<button class="slide-arrow prev-arrow"  title="Prev arrow"><i class="fa-light fa-arrow-left"></i></button>',
            nextArrow: '<button class="slide-arrow next-arrow"  title="Next arrow"><i class="fa-light fa-arrow-right"></i></button>',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 577,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
            ]
        });
    }
}

// mini cart start
jQuery(document.body).on('wc_fragments_loaded wc_fragments_refreshed updated_cart_totals', function(){
    get_cart_data();
  });

  function get_cart_data()
  {
      var formData = {
          action: 'get_cart_data',
        };
      jQuery.ajax({
          type: "POST",
          url: ajaxurl,
          dataType: "json",
          data : formData,
          success: function(response){
              //Success
              jQuery('#cart_count').html(response.cart_count);
              jQuery('#cart_pro_list').html(response.cart_pro_list);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
              //Error
              
          }
      });
  }

jQuery(document.body).on('added_to_cart', function(){
    jQuery('#addCartPopup').modal('show');
});

// Related product
function get_related_products_aj()
{
	var  product_id = jQuery('#get_related_products_aj').attr('product_id');
	if(product_id != 'undefined')
	{
		var formData = {
			action: 'get_related_products_aj',
			product_id: product_id,
		  };
		jQuery.ajax({
			type: "POST",
			url: ajaxurl,
			data : formData,
			success: function(response){
				//Success
				jQuery('#get_related_products_aj').html(response);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				//Error
				
			}
		});
	}
}