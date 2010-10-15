/*!
 * Quickleft Select Puncher
 * http://quickleft.com/
 * Written by Nico Valencia
 *
 * Copyright 2010, Quick Left
 * Licensed under the MIT license.
 * ./license.txt
 *
 * git@github.com:quickleft/select_puncher.git
 *
 */
(function(){
	
	var SP = {
		init: function(){

      //example 1
      $('#myform_drinks').select_puncher({
        p_vertical: 'bottom',
        p_horizontal: 'right',
        animation: 'default'
      });
      
      //example 2
      $('#myform_numbers').select_puncher({
        p_vertical: 'bottom',
        p_horizontal: 'right',
        animation: 'default'
      });
      
      //example 3
      $('#myform_colors').select_puncher({
        p_vertical: 'top',
        p_horizontal: 'left',
        animation: 'fade',
        animation_speed: 500
      });

      //global close
      $('body').bind('click',function(){
        $('.s_p_btn').each(function(){
          if($(this).hasClass('down')) $(this).removeClass('down').trigger('click');
        });
      });
			
		}
	};
	
	$(document).ready(SP.init);
	
})();