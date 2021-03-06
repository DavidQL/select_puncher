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
      function() {
        
        //disable IE <= 7
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
          var ieversion = new Number(RegExp.$1);
          if (ieversion <= 7) {
            $('select').css({'display':'block'});
            return false;
          }
        }
        
        //disable iDevices
        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
          $('select').css({'display':'block'});
          return false;
        }

        var $this = $(this),
            $s_id = '',
            $s_name = $this.attr('name'),
            $list = '',
            $btn = '',
            $selected = null,
            $tagName = $this[0].tagName;
            
        //only SELECT tags
        if ($tagName !== "SELECT") return false;
        
        //unique ID for select
        $this.attr('id') ? $s_id = $this.attr('id') : $s_id = $this.attr('name').replace(/\[/g, '_').replace(/\]/g,'');
        
        /**
         * BUILD LIST
         * - value || html
         * - # ? prepend 'val:'
         */
        $this.find('option').each(function(i, v) {
          
          var obj = $(v),
              value = obj.val(),
              html = obj.html();
          
          //prepend 'val:' to numbers
          if (value * 1 == value) value = 'val:' + value;
          
          //add list item
          $list += '<li><span name="' + value + '">' + html + '</span></li>';
          
          //set selected option
          if (obj.attr('selected') == true || obj.attr('selected') === 'selected') $selected = html;
          
        });
        
        //attach list
        $this.after('<ul id="' + $s_id + '_list" class="s_p_list">' + $list + '</ul>');
        $list = $('#' + $s_id + '_list');
        
        //remove select - add button
        $this.remove();
        $list.before('<div id="' + $s_id + '_btn" class="s_p_btn"><span class="content">' + $s_id + '</span><span class="arrow">&#8226;</span></div>');
        $list.after('<input id="' + $s_id + '" name="' + $s_name + '" type="hidden" value="" />');
        
        //define s_p_btn
        $btn = $('#' + $s_id + '_btn');

        /**
         * BIND CLICK: s_p_button
         * - position list
         * - close others
         * - animate
         */
        $btn.bind('click', function(e) {
          
          //disable body 'click'
          e.stopPropagation();
          
          var btn_pos = $btn.position(),
              list_pos = $list.position(),
              s_index = $('.s_p_btn').index($(this));
          
          //set pos of list
          s_set.p_vertical == 'top' ? list_pos.top = btn_pos.top - $list.outerHeight() : list_pos.top = btn_pos.top + $btn.outerHeight();
          s_set.p_horizontal == 'left' ? list_pos.left = btn_pos.left : list_pos.left = btn_pos.left - ($list.outerWidth() - $btn.outerWidth());
          $list.css({top:list_pos.top,left:list_pos.left});
          
          //close other open lists
          $('.s_p_btn').each(function(index) {
            if ($(this).hasClass('down') && index != s_index) {
              $(this).removeClass('down');
              $('.s_p_btn:eq(' + $('.s_p_btn').index($(this)) + ')').trigger('click');
            }
          });
          
          //animate
          if ($list.is(':visible')) {
            switch (s_set.animation) {
              case 'fade':
                $list.stop().fadeOut(s_set.animation_speed, function() {
                  $(this).css({'opacity':1})
                });
                break;
              case 'slide':
                $list.slideUp(s_set.animation_speed);
                break;
              default:
                $list.hide();
            }
            $(this).removeClass('down');
          } else {
            switch (s_set.animation) {
              case 'fade':
                $list.stop().fadeIn(s_set.animation_speed, function() {
                  $(this).css({'opacity':1});
                });
                break;
              case 'slide':
                $list.slideDown(s_set.animation_speed);
                break;
              default:
                $list.show();
            }
            $(this).addClass('down');
          }
          
        });
        
        /**
         * BIND CLICK: s_p_list span
         * - set hidden input value
         * - set s_p_btn text
         * - close list
         */
        $list.find('span').bind('click', function() {
          
          var in_val = '';
          
          //split value if number, and set input
          in_val = $(this).attr('name');
          if (in_val.split(':')[0] == 'val') in_val = in_val.split(':')[1];
          $('#' + $s_id).val(in_val);
          
          //set button text and close list
          $('#' + $s_id + '_btn .content').html( $(this).html() ).trigger('click');
          
        });
        
        //set default selected
        $('#' + $s_id + '_btn .content').html($selected);

    });
      
  };
})(jQuery);