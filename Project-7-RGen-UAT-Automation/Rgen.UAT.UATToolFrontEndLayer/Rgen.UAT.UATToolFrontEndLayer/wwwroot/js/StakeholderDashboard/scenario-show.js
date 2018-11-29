// hover effect
$(document).ready(function() {
  $('div.scenario h3').add('div.scenario2 h3').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });
});

// independently show and hide
$(document).ready(function() {
  $('div.scenario:eq(0) > div').hide();  
  $('div.scenario:eq(0) > h3').click(function() {
    $(this).next().slideToggle('fast');
	if($(this).css("background-image").substr($(this).css("background-image").length-13,11) == "arrow-u.jpg")
		$(this).css("background-image", "url(images/arrow-d.jpg)");  	
	else
		$(this).css("background-image", "url(images/arrow-u.jpg)");  		
  });
});


//simultaneous showing and hiding

$(document).ready(function() {
  $('div.scenario2:eq(0) > div').hide();
  $('div.scenario2:eq(0) > h3').click(function() {
    $(this).next('div').slideToggle('fast')
    .siblings('div:visible').slideUp('fast');
  });
});

