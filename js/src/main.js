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
            var format = '<div class="g g-xxs-2 g-m-4"><div class="gi days"><div class="block"><span class="number">%D</span><span class="suffix">days</span></div></div><div class="gi hours"><div class="block"><span class="number">%H</span><span class="suffix">hours</span></div></div><div class="gi minutes"><div class="block"><span class="number">%M</span><span class="suffix">minutes</span></div></div><div class="gi seconds"><div class="block"><span class="number">%S</span><span class="suffix">seconds</span></div></div></div>';
            if (event.elapsed) {
                $this.html(event.strftime('<h3 class="heading">Happily <span>Married</span> for...</h3>'+format));
            } else {
                $this.html(event.strftime('<h3 class="heading">Getting <span>Married</span> in...</h3>'+format));
            }
        });

    // Handle RSVP form fields
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

    // Reset the form fields
    var resetFields = function() {
        // Text fields
        $('input[name=email], input[name=guests_first_name], input[name=guests_last_name], input[name=guests_email]').val('');

        // Radio fields
        $('input[name=guest_attending], input[name=shuttle], input[name=meal]').attr('checked', false);

        // Textarea fields
        $('textarea[name=comments], textarea[name=regrets]').val('');
    }

    // Validate the RSVP form fields
    var validateFields = function(fields) {
        var submit = true;
        var error_msgs = '';

        // Attending
        var is_attending = ((fields.attending) && (fields.attending == 'accept'));
        if (!(fields.attending)) {
            error_msgs += '<li>Let us know if you will be attending or not.</li>';
            submit = false;
        }

        // First Name
        if (!fields.first_name) {
            error_msgs += '<li>Enter your first name.</li>';
            submit = false;
        }

        // Last Name
        if (!fields.last_name) {
            error_msgs += '<li>Enter your last name.</li>';
            submit = false;
        }

        // Email
        if (is_attending && (!fields.email)) {
            error_msgs += '<li>Enter your email.</li>';
            submit = false;
        }

        // Shuttle service
        if (is_attending && (!fields.shuttle)) {
            error_msgs += '<li>Let us know if you will be using the shuttle service.</li>';
            submit = false;
        }

        // Main dish
        if (is_attending && (!fields.meal)) {
            error_msgs += '<li>Choose your main dish.</li>';
            submit = false;
        }

        // Guest attending
        var is_guest_attending = (fields.guest_attending) && (fields.guest_attending == 'yes');
        if (is_attending && (!fields.guest_attending)) {
            error_msgs += '<li>Let us know if you will be bringing a guest.</li>';
            submit = false;
        }

        // Guest first name
        if (is_guest_attending && (!fields.guests_first_name)) {
            error_msgs += '<li>Enter your guest\'s first name.</li>';
            submit = false;
        }

        // Guest last name
        if (is_guest_attending && (!fields.guests_last_name)) {
            error_msgs += '<li>Enter your guest\'s last name.</li>';
            submit = false;
        }

        // Guest main dish
        if (is_guest_attending && (!fields.guests_meal)) {
            error_msgs += '<li>Choose your guest\'s main dish.</li>';
            submit = false;
        }

        return {
            send: submit,
            errors: error_msgs
        };
    }

    // Handle submitting the RSVP form to Formspree
    $('.rsvp-form').submit(function(e) {
        e.preventDefault();

        // Serialize form data
        var form_data = $(this).serializeObject();
        var submit = validateFields(form_data);

        if (submit.send !== false) {
            $.ajax({
                url: $('.rsvp-form').attr('action'),
                method: "POST",
                data: form_data,
                dataType: "json"
            }).done(function(data) {
                if(data.success) {
                    // Hide the form
                    $('.rsvp-form').hide();

                    // Display the correct message
                    if(form_data.attending == 'accept') {
                        console.log('Attending! Yay :)');
                        $('.rsvp-form-notice').html('Thank you for RSVPing! We are excited to celebrate our big day with you!<br><strong>Attire:</strong> Casual. Please no jeans, but no suit necessary.<br><strong>Kiddo Free:</strong> Please respect our wishes for a child free occasion.').fadeIn();
                    } else {
                        console.log('Not attending. Butthead :(');
                        $('.rsvp-form-notice').html('Thank you for RSVPing! Sorry to see you won\'t be joining us... :(').fadeIn();
                    }
                }
            });
        } else {
            // Display the form errors
            $('.form-errors').html(submit.errors).slideDown();

            // Scroll to the top of the section
            $('html, body').animate({
                scrollTop: $('#rsvp').offset().top
            }, 500);
        }
    });

    // Disable enter to submit RSVP
    $('#rsvp-form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if(keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });


    // Initialize Scroll Reveal
    window.sr = ScrollReveal({
        distance: '50px',
        viewFactor: 0.75,
        scale: 1,
        duration: 1000
    });

    sr.reveal('.section--couple .gi');

    sr.reveal('.section--wedding-party .bridesmaids .gi', { origin: 'right' }, 250);
    sr.reveal('.section--wedding-party .groomsmen .gi', { origin: 'right' }, 250);
    sr.reveal('.section--wedding-party .honorable .gi', { origin: 'right' }, 250);

    sr.reveal('.section--festivities .ceremony', { origin: 'left' });
    sr.reveal('.section--festivities .cocktail');
    sr.reveal('.section--festivities .reception', { origin: 'right' });

    sr.reveal('.section--accommodations .lodging', { origin: 'left' });
    sr.reveal('.section--accommodations .transportation', { origin: 'right' });

    sr.reveal('.section--registry .gi', 250);


    // // Initialize Parallax
    // var parallax_el = document.querySelectorAll('.section--parallax');
    // var speed = 0.25;

    // // Disable if we are on a smaller screen
    // if(window.innerWidth > 1024) {
    //     window.onscroll = function() {
    //         [].slice.call(parallax_el).forEach(function(el,i){
    //             el.style.backgroundPosition = 'center ' + (-(window.pageYOffset - el.offsetTop) * speed) + 'px';
    //         });
    //     }
    // }
})(jQuery);
