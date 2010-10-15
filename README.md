Usage:
============

    $(<select_jQuery_selector>).select_puncher({
      p_vertical: 'bottom',
      p_horizontal: 'right',
      animation: 'default'
      animation_speed: 500
    });

**p_vertical**[top,bottom]: want the drop-down to appear *above* or *below*

**p_horizontal**[right,left]: want the drop-down to appear to the *left* or the *right*

**animation**[default,fade,slide]: how do you want drop-downs to appear / disappear

**animation_speed**[<number>]: if animation type is a jQuery animation, how many milliseconds should it last