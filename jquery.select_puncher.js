(function($) {
	jQuery.fn.select_puncher = function(options)
	{
		var s_set = jQuery.extend({
			p_vertical: 'bottom',
			p_horizontal: 'right',
			animation: 'fade',
			animation_speed: 200
		}, options);
		return this.each(
			function(){
    		// browser detect
    		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
    			var ieversion=new Number(RegExp.$1);
    			if (ieversion <= 7){
    			  return false;
    			}
    		}
				var s_id = $(this).attr('id'),
						s_name = $(this).attr('name'),
						list = '',
						selected = null,
						build_own = false;
				// if there is no list > build one
				if($('#'+s_id+'_list').length == 0) build_own = true;
				$(this).find('option').each(function(){
					// if we are building our own list
					if(build_own){
						// set span name to value you want stored in the input
						// if the value is a number > add val: for markup validation
						var name = $(this).val();
						if(name*1 == name) name = 'val:'+name;
						list += '<li><span name="'+name+'">'+$(this).html()+'</span></li>';
					}
					// set already selected option
					if($(this).attr('selected') == true) selected = $(this).val();
				});
				// if we are building our own list
				// build up the list
				if(build_own) $(this).after('<ul id="'+s_id+'_list" class="select_puncher_list">' + list + '</ul>');
				list = $('#'+s_id+'_list');
				// replace select with input > add button
				$('#'+s_id).remove();
				list.before('<div id="'+s_id+'_btn" class="select_puncher_btn"><span class="content">'+s_id+'</span><span class="arrow">&#8226;</span></div>');
				list.after('<input id="'+s_id+'" name="'+s_name+'" type="hidden" value="" />');
				var btn = $('#'+s_id+'_btn'),
						btn_pos = btn.position(),
						list_pos = list.position();
				// position list
				s_set.p_vertical == 'top' ? list_pos.top = btn_pos.top - list.outerHeight() : list_pos.top = btn_pos.top + btn.outerHeight();
				s_set.p_horizontal == 'left' ? list_pos.left = btn_pos.left : list_pos.left = btn_pos.left - (list.outerWidth() - btn.outerWidth());
				list.css({top:list_pos.top,left:list_pos.left});
				// bind button
				$('#'+s_id+'_btn').bind('click',function(event){
					// bad bubbles bad!
					event.stopPropagation();
					//close others
					var s_index = $('.select_puncher_btn').index($(this));
					$('.select_puncher_btn').each(function(ind){
						if($(this).hasClass('down') && ind != s_index){
							$(this).removeClass('down');
							$('.select_puncher_btn:eq('+$('.select_puncher_btn').index($(this))+')').trigger('click');
						}
					});
					// animate
					var active_list = $('#'+s_id+'_list');
					if(active_list.is(':visible')){
						// hide it
						switch(s_set.animation){
							case 'fade':
								active_list.stop().fadeOut(s_set.animation_speed,function(){$(this).css({'opacity':1})});
								break;
							case 'slide':
								active_list.slideUp(s_set.animation_speed);
								break;
							default:
								active_list.hide();
						}
						$(this).removeClass('down');
					} else {
						// show it
						switch(s_set.animation){
							case 'fade':
								active_list.stop().fadeIn(s_set.animation_speed,function(){$(this).css({'opacity':1})});
								break;
							case 'slide':
								active_list.slideDown(s_set.animation_speed);
								break;
							default:
								active_list.show();
						}
						$(this).addClass('down');
					}
				});
				// bind links
				$('#'+s_id+'_list span').bind('click',function(){
					// set input
					var in_val = '';
					if($(this).attr('name')){
						in_val = $(this).attr('name');
					} else {
						in_val = $(this).html();
					}
					if(in_val.split(':')[0] == 'val') in_val = in_val.split(':')[1];
					$('#'+s_id).val(in_val);
					// set button and trigger click
					var btn_val = '';
					$(this).parent().attr('name') ? btn_val = $(this).parent().attr('name') : btn_val = $(this).html();
					$('#'+s_id+'_btn .content').html(btn_val).trigger('click');
				});
				// set btn value
				if(selected){
					var selected_obj = null,
							name_bit = null;
					$('#'+s_id+'_list span').each(function(){
						if($(this).attr('name')){
							name_bit = $(this).attr('name');
							if(name_bit.split(':')[0] == 'val') name_bit = name_bit.split(':')[1];
							if(selected == name_bit) selected_obj = $(this);
						} else {
							if(selected == $(this).html()) selected_obj = $(this);
						}
					});
					// set input
					if(selected_obj){
						var in_val = '',
								btn_val = '';
						selected_obj.attr('name') ? in_val = selected_obj.attr('name') : in_val = selected_obj.html();
						if(in_val.split(':')[0] == 'val') in_val = in_val.split(':')[1];
						$('#'+s_id).val(in_val);
						selected_obj.parent().attr('name') ?  btn_val = selected_obj.parent().attr('name') : btn_val = selected_obj.html();
						$('#'+s_id+'_btn .content').html(btn_val);
					}
				}
			}
		);
	};
})(jQuery);