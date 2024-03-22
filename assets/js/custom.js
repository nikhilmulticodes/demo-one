jQuery.noConflict();
jQuery(document).ready(function () {
    
      jQuery('.btn-info').on('click', function(){
        jQuery(this).removeClass('btn-info');
        jQuery(this).addClass('disabled btn-success');
        console.log(event.target.id);
        });
    
	jQuery(".woocommerce-checkout .xoo-lwo-form").hide();
	jQuery( "#coupon" ).click(function() {
          var copyText = document.getElementById("coupon");
    
    	  copyText.select();
    	  copyText.setSelectionRange(0, 99999); 
    	  
    	  navigator.clipboard.writeText(copyText.value);
    	  
    	  if(document.getElementById("coupon").click)
    		document.getElementById("display_msg").innerHTML = "Code Copied Apply At Checkout ";
    	else
    		document.getElementById("display_msg").innerHTML = "Not Copied";
    	
    //document.getElementById('coupon_code').value = copyText.value;
    });
	
    jQuery(".ss_search_icon").click(function () {
        jQuery(".header-search-mobile").toggle();
    });
	
    jQuery(".carousel .item:first").addClass("active");
    jQuery(".nav-tabs li:first").addClass("active");
    jQuery(".wrapper .tab-content div:first").addClass("in active");
    jQuery(".checkout_coupon.woocommerce-form-coupon").ready(function () {
       var URL = location.protocol + "//" + location.host + "/auspost/auspost.php";
   
    });
	
});



jQuery(document).ready( function () {
    var bpscd = jQuery('#billing_postcode').val();
    if(bpscd){abcb(bpscd);}
    var spscd = jQuery('#shipping_postcode').val();
    if(spscd){abcs(spscd);}
    });
    
    function abcb(bpscd){
        jQuery.ajax({
            type: 'POST',
            url: 'https://paylatershop.com.au/auspost/auspost.php', //your server side script
            dataType: 'json',
            data: {
                postcode: bpscd
            },
            success: function (data) {
                jQuery('#billing_city').empty();
                jQuery('#billing_state').val(''); 
                if(data.error){
                    //console.log('has error');
                }
                else{
                    //console.log('no error');
                    if(data.localities !=''){
                        jQuery('#billing_city').append('<option name="billing_city" value="">--Select Suburb--</option>');
                        if(data.localities.locality instanceof Array)
                            jQuery.map(data.localities.locality, function (item) {
                                jQuery('#billing_city').append('<option name="billing_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                jQuery('#billing_state').val(item.state);
                            });
                        else
                            jQuery.map(data.localities, function (item) {
                                jQuery('#billing_city').append('<option name="billing_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                jQuery('#billing_state').value = item.state;
                                return {
                                    label: item.location + ', ' + item.state + ', ' + item.postcode,
                                    value: item.postcode
                                }
                            });
                    }else{
                        jQuery.map(data.localities, function (item) {
                            jQuery('#billing_postcode').val('');
                            jQuery('#billing_city').append('<option name="billing_city" value="">-- Enter Valid Postal Code --</option>');
                            jQuery('#billing_state').val(''); 
                        });
                    }
                }
            }
        });
    }
    function abcs(spscd){
        jQuery.ajax({
            type: 'POST',
            url: 'https://paylatershop.com.au/auspost/auspost.php', //your server side script
            dataType: 'json',
            data: {
                postcode: spscd
            },
            success: function (data) {
                jQuery('#shipping_city').empty();
                jQuery('#shipping_state').val(''); 
                if(data.error){
                    //console.log('has error');
                }
                else{
                    //console.log('no error');
                    if(data.localities !=''){
                        jQuery('#shipping_city').append('<option name="shipping_city" value="">--Select Suburb--</option>');
                        if(data.localities.locality instanceof Array)
                            jQuery.map(data.localities.locality, function (item) {
                                jQuery('#shipping_city').append('<option name="shipping_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                jQuery('#shipping_state').val(item.state);
                            });
                        else
                            jQuery.map(data.localities, function (item) {
                                jQuery('#shipping_city').append('<option name="shipping_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                jQuery('#shipping_state').value = item.state;
                                return {
                                    label: item.location + ', ' + item.state + ', ' + item.postcode,
                                    value: item.postcode
                                }
                            });
                    }else{
                        jQuery.map(data.localities, function (item) {
                            jQuery('#shipping_postcode').val('');
                            jQuery('#shipping_city').append('<option name="shipping_city" value="">-- Enter Valid Postal Code --</option>');
                            jQuery('#shipping_state').val(''); 
                        });
                    }
                }
            }
        });
    }
    
    jQuery(document).ready( function () {
        jQuery('#billing_city_field').html('<p class="form-row form-row-wide address-field validate-required" id="billing_city_field" data-priority="70" data-o_class="form-row form-row-wide address-field  validate-required"><label for="billing_city" class="">Suburb&nbsp;<abbr class="required" title="required">*</abbr></label><span class="woocommerce-input-wrapper"><select class="input-text suburb" name="billing_city" id="billing_city" placeholder=""  autocomplete="address-level2"><option name="billing_city" value="">-- Enter Valid Postal Code --</option></select></span></p>');
        jQuery("#billing_postcode").autocomplete({
            // minLength:0, //minimum length of characters for type ahead to begin
            source: function (request, response) {
                jQuery.ajax({
                    type: 'POST',
                    url: 'https://paylatershop.com.au/auspost/auspost.php', //your server side script
                    dataType: 'json',
                    data: {
                        postcode: request.term
                    },
                    success: function (data) {
                        jQuery('#billing_city').empty();
                        jQuery('#billing_state').val(''); 
                        if(data.error){
                            //console.log('has error');
                        }
                        else{
                        //console.log('no error');
                        if(data.localities !=''){
                        //if multiple results are returned
                        jQuery('#billing_city').append('<option name="billing_city" value="">--Select Suburb--</option>');
                            if(data.localities.locality instanceof Array)
                                response (jQuery.map(data.localities.locality, function (item) {
                                    jQuery('#billing_city').append('<option name="billing_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                    jQuery('#billing_state').val(item.state);
                                    return {
                                        label: item.location + ', ' + item.state + ', ' + item.postcode,
                                        value: item.postcode
                                    }
                                }));
                            //if a single result is returned
                            else
                                response (jQuery.map(data.localities, function (item) {
                                    jQuery('#billing_city').append('<option name="billing_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                    jQuery('#billing_state').value = item.state;
                                    return {
                                        label: item.location + ', ' + item.state + ', ' + item.postcode,
                                        value: item.postcode
                                    }
                            }));
                        } else {
                            alert('Please enter correct postcode.');
                            jQuery('#billing_postcode').val('');
                            jQuery('#billing_city').append('<option name="billing_city" value="">-- Enter Valid Postal Code --</option>');
                            jQuery('#billing_state').val(''); 
                        }
                      }
                    }
                });
            }
        });  
        jQuery('#billing_postcode').on('autocompleteselect', function (e, ui) {
            var SelectedVal = ui.item.label;
            var array = SelectedVal.split(', ');
            jQuery('#billing_postcode').val(array[2]);
            jQuery('#billing_city').val(array[0]);
            jQuery('#billing_state').val(array[1]);
            jQuery("#billing_postcode").trigger("update_checkout");
        });
        jQuery(document.body).on('change','#billing_city',function(){
            var selectVal = jQuery("#billing_city option:selected").val();
             if(selectVal != '' ){
                var data_postcode = jQuery("#billing_city option:selected").data('postcode');
                var data_state = jQuery("#billing_city option:selected").data('state');
                jQuery('#billing_postcode').val(data_postcode);
                jQuery('#billing_state').val(data_state);
                jQuery("#billing_postcode").trigger("update_checkout");
             }else{      
             }
        });
        jQuery('#shipping_city_field').html('<p class="form-row form-row-wide address-field validate-required" id="shipping_city_field" data-priority="70" data-o_class="form-row form-row-wide address-field  validate-required"><label for="shipping_city" class="">Suburb&nbsp;<abbr class="required" title="required">*</abbr></label><span class="woocommerce-input-wrapper"><select class="input-text suburb" name="shipping_city" id="shipping_city" placeholder=""  autocomplete="address-level2"><option name="shipping_city" value="">-- Enter Valid Postal Code --</option></select></span></p>');
        jQuery("#shipping_postcode").autocomplete({
            // minLength:0, //minimum length of characters for type ahead to begin
            source: function (request, response) {
                jQuery.ajax({
                    type: 'POST',
                    url: 'https://paylatershop.com.au/auspost/auspost.php', //your server side script
                    dataType: 'json',
                    data: {
                        postcode: request.term
                    },
                    success: function (data) {
                        jQuery('#shipping_city').empty();
                        jQuery('#shipping_state').val(''); 
                        if(data.error){
                            // console.log('has error');
                        }
                        else{
                        // console.log('no error');
                        if(data.localities !=''){
                        //if multiple results are returned
                        jQuery('#shipping_city').append('<option name="shipping_city" value="">--Select Suburb--</option>');
                            if(data.localities.locality instanceof Array)
                                response (jQuery.map(data.localities.locality, function (item) {
                                    jQuery('#shipping_city').append('<option name="shipping_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                    jQuery('#shipping_state').val(item.state);
                                    return {
                                        label: item.location + ', ' + item.state + ', ' + item.postcode,
                                        value: item.postcode
                                    }
                                }));
                            //if a single result is returned
                            else
                                response (jQuery.map(data.localities, function (item) {
                                    jQuery('#shipping_city').append('<option name="shipping_city" data-postcode="'+ item.postcode +'" data-state="'+ item.state +'" value="' + item.location + '">' + item.location + '</option>');
                                    jQuery('#shipping_state').value = item.state;
                                    return {
                                        label: item.location + ', ' + item.state + ', ' + item.postcode,
                                        value: item.postcode
                                    }
                            }));
                        } else {
                            alert('Please enter correct postcode.');
                            jQuery('#shipping_postcode').val('');
                            jQuery('#shipping_city').append('<option name="shipping_city" value="">-- Enter Valid Postal Code --</option>');
                            jQuery('#shipping_state').val(''); 
                        }
                      }
                    }
                });
            }
        });
        jQuery('#shipping_postcode').on('autocompleteselect', function (e, ui) {
            var SelectedVal = ui.item.label;
            var array = SelectedVal.split(', ');
            jQuery('#shipping_postcode').val(array[2]);
            jQuery('#shipping_city').val(array[0]);
            jQuery('#shipping_state').val(array[1]);
            jQuery("#shipping_postcode").trigger("update_checkout");
        });
        jQuery(document.body).on('change','#shipping_city',function(){ 
            var selectVal = jQuery("#shipping_city option:selected").val();
             if(selectVal != '' ){
                var data_postcode = jQuery("#shipping_city option:selected").data('postcode');
                var data_state = jQuery("#shipping_city option:selected").data('state');
                jQuery('#shipping_postcode').val(data_postcode);
                jQuery('#shipping_state').val(data_state);
                jQuery("#shipping_postcode").trigger("update_checkout");
             }else{      
             }
        });
    });


 jQuery(document).ready(function () {
    jQuery("#billing_postcode").on("focusout", function () {
        // jQuery(this).trigger("update_checkout");
        var bpscd = jQuery('#billing_postcode').val();
        if(bpscd){abcb(bpscd);}
    });
});
jQuery(document).ready(function () {
    jQuery("#shipping_postcode").on("focusout", function () {
        // jQuery(this).trigger("update_checkout");
        var spscd = jQuery('#shipping_postcode').val();
        if(spscd){abcs(spscd);}
    });
}); 


jQuery(document).ready(function () {
    jQuery(".humm-price-info-widget").not(":last").remove();
});
jQuery("html").keyup(function (e) {
    if (e.keyCode == 8) jQuery(".fatch div").remove();
});
jQuery("html").keyup(function (e) {
    jQuery(".fatch div").remove();
});
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
jQuery("submitted").click(function () {
    jQuery("body").css("overflow:hidden;");
});
jQuery(document).ajaxComplete(function () {
    if (jQuery("body").hasClass("woocommerce-checkout") || jQuery("body").hasClass("woocommerce-cart")) {
        jQuery("html, body").stop();
    }
});

//////*************************************************************************/////
//                                 Search js start 								 //
//////*************************************************************************/////
// search Button click
jQuery(".instant_search").click(function () {
  jQuery('#woocommerce-product-search-field').val('');
  printData(jsonData);
  printData_cat(jsonData_cat);
  setTimeout(function(){
   document.getElementById("woocommerce-product-search-field").focus();
  }, 1000);
});
// search load js 

jQuery(".search-sg").click(function(){
  var s_tag = jQuery(this).html();
    jQuery('#woocommerce-product-search-field').val(s_tag);
     jQuery('#woocommerce-product-search-field').change();
   
});
function load_js()
{
	var head= document.getElementsByTagName('body')[0];
	var script= document.createElement('script');
	//var site_url = ajaxurl.replace('/wp-admin/admin-ajax.php', ''); 
	script.src= 'https://cdn.paylatershop.com.au/wp-content/themes/pls-shop/assets/js/search_data.js';
	script.defer="defer";
	head.appendChild(script);
}  
function search(ev) { 
    var key = ev.target.value;
    var split_data = key.toLowerCase();
    var split_data = split_data.split(" ");
    let tempArr = jsonData;
     Object.keys(split_data).forEach(item => {
     const result = tempArr.filter(x => x.content_word.find(a => a === split_data[item]) || x.title.match(split_data[item]));
     if ( result.length > 0 ) {
        tempArr = result;
	 }else{
         tempArr = result;
	 }  
   });
     let tempArr_cat = jsonData_cat;
     Object.keys(split_data).forEach(item => {
	 const result = tempArr_cat.filter(x => x.content_word.find(a => a === split_data[item]) || x.title.match(split_data[item]));
     if ( result.length > 0 ) {
        tempArr_cat = result;
      }else{
         tempArr_cat = result;
      }
   });
         printData(tempArr);
         printData_cat(tempArr_cat);
     
   }
// search Data return category
function printData_cat(Arr){
 
   var search = '';   
   var prod_count = Arr.length;
   search += '<div class="row category-wrapper" style="margin: 0px;">';
   if(Arr.length > 0) {
      for(var i=0; i<Arr.length; i++) {
           if(Arr[i] !== undefined)
           {
               var  datajs =Arr[i];
               search += '<div class="single-category">';
               search += '<a href="'+ datajs.url +'" title='+ datajs.title +'>'+ datajs.title + '</a></div>';
           }
       }
   } else {
       search += '<div> No Record Found </div>';
   }
     
   search += '</div>';    
   jQuery('#search_Categories_list').html(search);
}
// search Data return product
function printData(Arr){
   var search = '';
   jQuery('#search_product_count').html(Arr.length);
   search +='<div class="row product-grid" style="margin: 0px;">';
   if(Arr.length > 0) {
        for(var i=0; i<20; i++) {
           
           if(Arr[i] !== undefined)
           {
               var  datajs =Arr[i];
           
               search += '<div class="single-product">';
               search += '<a href="'+datajs.url+'" title="'+ datajs.title +'">';
               search += '<div class="image"><img src="'+ datajs.image +'" alt="'+ datajs.title +'"></div>';
               search += '<div class="desc"><p>'+ datajs.title +'</p></div>';
               search += '</a></div>';
           }
       }
   } else {
        search += '<div> No Record Found </div>';
   }
   search += '</div>';    
   //INSERTING ROWS INTO TABLE 
   
   jQuery('#search_product_list').html(search);
}
//////*************************************************************************/////
//                                 Search js end 								 //
//////*************************************************************************/////

// Buy now update qty
jQuery(".input-text.qty").change(function(){
    var qty = jQuery(this).val();
    var buy_now = jQuery('a.single_add_to_cart_button').attr('href');
    if(buy_now != undefined)
    {
        if(buy_now.indexOf('quantity') != -1){
          var result = buy_now.split('&');
          buy_now = result[0]+'&quantity='+qty;
      }else{
      buy_now = buy_now+'&quantity='+qty;
      }
      jQuery('a.single_add_to_cart_button').attr('href',buy_now);
   }
});