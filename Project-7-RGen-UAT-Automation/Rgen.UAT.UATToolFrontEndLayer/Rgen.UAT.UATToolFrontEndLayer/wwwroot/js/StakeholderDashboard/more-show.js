$(document).ready(function() {
  $('div.task:eq(0) > div').hide();  
  $('div.task:eq(0) > h1').click(function() {
    $(this).next().slideToggle('fast');
  });
});

$(document).ready(function() {
  $('div.proj:eq(0) > div').hide();  
  $('div.proj:eq(0) > h1').click(function() {
    $(this).next().slideToggle('fast');
  });
});

$(document).ready(function() {
  $('div.subproj:eq(0) > div').hide();  
  $('div.subproj:eq(0) > a.plus').click(function() {
    $(this).next().slideToggle('fast');
  });
});

/* Table Row Hover JS*/
$(function() {
  $('table tbody tr').mouseover(function() {
	 $(this).addClass('selectedRow');
  }).mouseout(function() {
	 $(this).removeClass('selectedRow');
  });
});

