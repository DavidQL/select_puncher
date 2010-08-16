(function($){
	
	var SP = {
		init: function(){
			
			$('#user_car').select_puncher({
				p_vertical: 'bottom',
				p_horizontal: 'left',
				animation: 'default',
				animation_speed: 600
			});
			
			$('#user_number').select_puncher();
			
			//global close
			$('body').bind('click',function(){
				$('.select_puncher_btn').each(function(){
					if($(this).hasClass('down')) $(this).removeClass('down').trigger('click');
				});
			});
			
		}
	}
	
	$(document).ready(SP.init);

	window.SP = SP;

})(jQuery);