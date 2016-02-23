(function($) {
    // Display the countdown
    $('.countdown').countdown('2016/10/01', { elapse: true })
        .on('update.countdown', function(event) {
            var $this = $(this);
            var format = '<div class="g g-s-2 g-m-4"><div class="gi days"><div class="block">%D<span>days</span></div></div><div class="gi hours"><div class="block">%H<span>hours</span></div></div><div class="gi minutes"><div class="block">%M<span>minutes</span></div></div><div class="gi seconds"><div class="block">%S<span>seconds</span></div></div></div>';
            if (event.elapsed) {
                $this.html(event.strftime('<h3 class="heading">Happily Married</h3>'+format));
            } else {
                $this.html(event.strftime('<h3 class="heading">Time to Wait</h3>'+format));
            }
        });

    $('input[name=attending]').change(function() {
        if(this.value == 'accept') {
            $('.personal-accept').show();
            $('.personal-decline').hide();
        } else if(this.value == 'decline') {
            var inputs = ['guest_attending', 'guests_first_name', 'guests_last_name', 'guests_email', 'comments', 'regrets']
            $.each(inputs, function(idx, val) {
                $('input[name='+val+']').val();
            });

            $('.personal-accept').hide();
            $('.personal-decline').show();
        }
    });

    $('input[name=guest_attending]').change(function() {
        if(this.value == 'yes') {
            $('.guest-yes').show();
        } else if(this.value == 'no') {
            $('.guest-yes').hide();
        }
    });

})(jQuery);
