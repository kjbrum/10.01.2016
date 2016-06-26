(function($) {
    // Serialize an object
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    // Display the countdown
    $('.countdown').countdown('10/01/2016 15:00:00', { elapse: true })
        .on('update.countdown', function(event) {
            var $this = $(this);
            var format = '<div class="g g-s-2 g-m-4"><div class="gi days"><div class="block"><span class="number">%D</span><span class="suffix">days</span></div></div><div class="gi hours"><div class="block"><span class="number">%H</span><span class="suffix">hours</span></div></div><div class="gi minutes"><div class="block"><span class="number">%M</span><span class="suffix">minutes</span></div></div><div class="gi seconds"><div class="block"><span class="number">%S</span><span class="suffix">seconds</span></div></div></div>';
            if (event.elapsed) {
                $this.html(event.strftime('<h3 class="heading">Happily <span>Married</span></h3>'+format));
            } else {
                $this.html(event.strftime('<h3 class="heading">Time to <span>Wait</span></h3>'+format));
            }
        });

    $('input[name=attending]').change(function() {
        resetFields();

        if(this.value == 'accept') {
            $('.personal-accept').show();
            $('.personal-decline').hide();
        } else if(this.value == 'decline') {
            $('.personal-accept').hide();
            $('.personal-decline').show();
            $('.guest-yes').hide();
        }
    });

    $('input[name=guest_attending]').change(function() {
        if(this.value == 'yes') {
            $('.guest-yes').show();
        } else if(this.value == 'no') {
            $('.guest-yes').hide();
        }
    });

    var resetFields = function() {
        // Text fields
        $('input[name=email], input[name=guests_first_name], input[name=guests_last_name], input[name=guests_email]').val('');

        // Radio fields
        $('input[name=guest_attending], input[name=shuttle], input[name=meal]').attr('checked', false);

        // Textarea fields
        $('textarea[name=comments], textarea[name=regrets]').val('');
    }

    /**
     *  Handle submitting the RSVP form to Formspree
     */
    $('.rsvp-form').submit(function(e) {
        e.preventDefault();

        var form_data = $(this).serializeObject();
        console.log(form_data);

        $.ajax({
            url: "https://formspree.io/kjbrumm@gmail.com",
            method: "POST",
            data: form_data,
            dataType: "json"
        }).done(function(data) {
            if(data.success) {
                // Hide the form
                $('.rsvp-form').hide();

                // Display the correct message
                if(form_data.attending == 'accept') {
                    console.log('attending :)');
                    $('.rsvp-form-notice').text('Thanks for RSVPing! We are excited to celebrate our big day with you!').fadeIn();
                } else {
                    console.log('butthead :(');
                    $('.rsvp-form-notice').text('Thanks for RSVPing! Sorry to see you won\'t be joining us... :(').fadeIn();
                }
            }
        });
    });

})(jQuery);
