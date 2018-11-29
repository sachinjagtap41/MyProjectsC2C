
function togg(){	
if(tabpos ==1){stringref = 't1';jQuery(".t1").addClass('t1hover');jQuery(".t2").removeClass('t2hover').addClass('t2');jQuery(".t3").removeClass('t3hover').addClass('t3');	jQuery(".t4").removeClass('t4hover').addClass('t4');}		
else if(tabpos == 2){stringref = 't2';jQuery(".t1").removeClass('t1hover').addClass('t1');jQuery(".t2").addClass('t2hover');jQuery(".t3").removeClass('t3hover').addClass('t3');	jQuery(".t4").removeClass('t4hover').addClass('t4');}		
else if(tabpos == 3){stringref = 't3';jQuery(".t1").removeClass('t1hover').addClass('t1');jQuery(".t2").removeClass('t2hover').addClass('t2');jQuery(".t3").addClass('t3hover');jQuery(".t4").removeClass('t4hover').addClass('t4');}		
else if(tabpos == 4){stringref = 't4';jQuery(".t1").removeClass('t1hover').addClass('t1');jQuery(".t2").removeClass('t2hover').addClass('t2');jQuery(".t3").removeClass('t3hover').addClass('t3');jQuery(".t4").addClass('t4hover');}		
jQuery('.tab:not(#'+stringref+')').hide();
if (jQuery.browser.msie && jQuery.browser.version.substr(0,3) == "6.0") {jQuery('.tab#' + stringref).show();}
else jQuery('.tab#' + stringref).fadeIn();}


jQuery(document).ready(function(){
	jQuery(".tab:not(:first)").hide();
	//to fix u know who
	jQuery(".tab:first").show();
	jQuery(".t1").addClass('t1hover');
	jQuery(".htabs a").click(function(){
		stringref = jQuery(this).attr("href").split('#')[1];
		if(stringref =='t1')tabpos = 1;
		else if(stringref =='t2')tabpos = 2;
		else if(stringref =='t3')tabpos = 3;
		else if(stringref =='t4')tabpos = 4;
		togg();
				
		jQuery('.tab:not(#'+stringref+')').hide();
		if (jQuery.browser.msie && jQuery.browser.version.substr(0,3) == "6.0") {
			jQuery('.tab#' + stringref).show();
		}
		else 
			jQuery('.tab#' + stringref).fadeIn();
		return false;
	});

	jQuery("#navlft img").click(function(){
		if(tabpos == 1){tabpos =4;}
		else{tabpos = tabpos - 1;}
		togg();
	});

	jQuery("#navrt img").click(function(){
		if(tabpos == 4){tabpos =1;}
		else{tabpos = tabpos + 1;}
		togg();
	});
});