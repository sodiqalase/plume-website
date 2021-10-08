/*global jQuery, document, window, Waypoint, videojs, YT, grecaptcha, google, InfoBox, prettyPrint, Cookies, WOW*/


/* =============================================================================
Ajax
============================================================================= */
jQuery.ajaxPrefilter(function (options) {
    'use strict';
    options.cache = true;
});


/* =============================================================================
Document Ready Function
============================================================================= */
jQuery(document).ready(function () {

    'use strict';

    var NBTimer,
        isMobile,
        headerTimer,
        megamenuTimer,
        currentPosition,
        searchInputTimer,
        elCurrentMap = [],
        headerCurrentPosition,
        gfortRecaptchaSiteKey,
        pageDirection = 'ltr',
        // Notification Expire Days
        notificationExpireDays = 0,
        // Enable or Disable Page preLoader (true / false)
        pagePreLoader = false,
        // Add text to page preloader
        pagePreLoaderText = '',
        //1, 2, 3, 4, 5 or 6
        pagePreLoaderStyle = '1',
        // Enable or disable Parallax Effect (true / false)
        parallaxEffect = true,
        // Enable or Disable Animation (true / false)
        enableAnimation = true;


    /* =========================================================================
    Check if it's a Mobile Device
    ========================================================================= */
    isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera\ Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    /* =========================================================================
    Mega Menu
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortMegaMenufn() {
        if (jQuery(window).width() > 991) {
            jQuery('.megamenu').each(function () {
                jQuery('> .submenu > li', this).matchHeight();
            });
        } else {
            jQuery('.megamenu').each(function () {
                jQuery('> .submenu > li', this).matchHeight('remove');
            });
        }
        clearTimeout(megamenuTimer);
    }
    gfortMegaMenufn();

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        megamenuTimer = setTimeout(function () {
            gfortMegaMenufn();
        }, 1000);
    });


    /* =========================================================================
    Page preLoader
    ========================================================================= */
    /* Condition
    ------------------------------------------------------------------------- */
    if (pagePreLoader === true) {

        if (pagePreLoaderStyle >= 1 && pagePreLoaderStyle <= 6) {
            jQuery('body').addClass('page-preloader-style-' + pagePreLoaderStyle);
        }

        if (pagePreLoaderText !== '') {
            jQuery('.gfort-page-preloader-text').attr('data-progress-text', pagePreLoaderText);
        }

    } else {
        jQuery('.pace').css({display: 'none'});
    }


    /* =========================================================================
    Page Transition
    ========================================================================= */
    jQuery('#main-wrapper').animsition({
        loading: false,
        inDuration: 1500,
        outDuration: 800,
        inClass: 'fade-in',
        outClass: 'fade-out',
        linkElement: 'ul.navbar-nav li a:not([target="_blank"]):not([href^="#"])'
    });


    /* =========================================================================
    To top Button
    ========================================================================= */
    /* Button
    ------------------------------------------------------------------------- */
    jQuery('.btn-gfort-top').on('click', function () {
        jQuery('html, body').animate({scrollTop: '0'}, 800);
        return false;
    });

    /* Window Scroll
    ------------------------------------------------------------------------- */
    jQuery(window).scroll(function () {
        currentPosition = jQuery(window).scrollTop();
        if (currentPosition >= 300) {
            jQuery('.btn-gfort-top').addClass('show-btn-gfort-top');
        } else {
            jQuery('.btn-gfort-top').removeClass('show-btn-gfort-top');
        }
    });

    /* Link
    ------------------------------------------------------------------------- */
    jQuery('[href="#top-page"]').on('click', function () {

        jQuery('html, body').animate({scrollTop: '0'}, 800);

        if (jQuery('.navbar-collapse').hasClass('in')) {
            jQuery('.navbar-toggle').removeClass('gfort-menuButton-toggle');
            jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
        }

        if (jQuery('.header-section').hasClass('sidebar-header')) {
            jQuery('.sidebar-header').removeClass('sidebar_header_correctPosition');
        }

        return false;

    });


    /* =========================================================================
    Menu Button
    ========================================================================= */
    jQuery('.navbar-toggle').on('click', function () {
        jQuery('.navbar-toggle').toggleClass('gfort-menuButton-toggle');
    });


    /* =========================================================================
    Sub Menu
    ========================================================================= */
    jQuery('.navbar-nav').find('ul').addClass('submenu');
    jQuery('.navbar-nav li ul').parent('li').addClass('parent-list');

    if (jQuery('.header-section').hasClass('sidebar-header')) {
        jQuery('.parent-list > a').append('<span class="menu-arrow"><i class="fa fa-angle-right"></i></span>');
    } else {
        jQuery('.parent-list > a').append('<span class="menu-arrow"><i class="fa fa-angle-down"></i></span>');
        jQuery('.parent-list .parent-list > a').append('<span class="menu-arrow"><i class="fa fa-ellipsis-h"></i></span>').find('.menu-arrow:first').remove();
    }


    /* =========================================================================
    Collapse Menu
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortCollapseMenufn() {
        if (!jQuery('.header-section').hasClass('sidebar-header')) {
            if (jQuery(window).width() <= 991) {

                if (!jQuery('body').hasClass('mobile-navbar-collapse')) {

                    jQuery('.navbar-nav ul').each(function () {
                        jQuery(this).slideUp();
                    });

                    if (jQuery(window).width() > 767) {

                        jQuery('.navbar-collapse').on({
                            mouseenter: function () {
                                jQuery('body').addClass('stopScroll');
                            },
                            mouseleave: function () {
                                jQuery('body').removeClass('stopScroll');
                            }
                        });

                    }

                    jQuery('.parent-list').each(function () {
                        jQuery(this).find('a:first').addClass('mobile-parent-list-link');
                    });

                    jQuery('body').addClass('mobile-navbar-collapse');

                }

            } else {

                jQuery('.navbar-nav ul').each(function () {
                    jQuery(this).slideDown();
                });

                jQuery('.navbar-collapse').on('mouseenter', function () {
                    jQuery('body').removeClass('stopScroll');
                });

                jQuery('.parent-list').each(function () {
                    jQuery(this).removeClass('active-menu-item');
                    jQuery(this).find('a:first').removeClass('mobile-parent-list-link').removeClass('menu-is-open');
                });

                jQuery('body').removeClass('mobile-navbar-collapse');

            }
        }
    }

    gfortCollapseMenufn();

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        gfortCollapseMenufn();
    });

    jQuery('body').on('click', '.mobile-parent-list-link', function (e) {

        e.preventDefault();

        if (jQuery(this).hasClass('menu-is-open')) {
            jQuery(this).removeClass('menu-is-open').find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-right');
            jQuery(this).next('ul').slideUp();
            jQuery(this).parent('li').removeClass('active-menu-item');
        } else {
            jQuery(this).addClass('menu-is-open').find('.fa-angle-right').removeClass('fa-angle-right').addClass('fa-angle-down');
            jQuery(this).next('ul').slideDown();
            jQuery(this).parent('li').addClass('active-menu-item');
        }

        if (jQuery(this).hasClass('menu-is-open')) {
            return false;
        }

    });


    /* =========================================================================
    Sidebar Header
    ========================================================================= */
    if (jQuery('.header-section').hasClass('sidebar-header')) {

        if (jQuery('.header-section').hasClass('fixed-header')) {
            jQuery('body').addClass('fixed-sidebar-header');
        }

        var headerSectionEL = jQuery('.header-section'),
            topHeaderLogo = headerSectionEL.find('.navbar .col-md-12'),
            menuLogo = headerSectionEL.find('.navbar .navbar-header').length;

        headerSectionEL.prepend('<div class="sidebar-overlay"></div><a href="#" class="sidebar-header-btn"><i class="fa fa-bars"></i></a>');

        if (menuLogo < 1) {
            headerSectionEL.find(jQuery('.top-header .navbar-header')).prependTo(topHeaderLogo);
        }

        jQuery('.navbar-nav ul').each(function () {
            jQuery(this).slideUp();
        });

        jQuery('.parent-list > a').on('click', function (e) {

            e.preventDefault();

            if (jQuery(this).hasClass('menu-is-open')) {
                jQuery(this).removeClass('menu-is-open').find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-right');
                jQuery(this).next('ul').slideUp();
                jQuery(this).parent('li').removeClass('active-menu-item');
            } else {
                jQuery(this).addClass('menu-is-open').find('.fa-angle-right').removeClass('fa-angle-right').addClass('fa-angle-down');
                jQuery(this).next('ul').slideDown();
                jQuery(this).parent('li').addClass('active-menu-item');
            }

            if (jQuery(this).hasClass('menu-is-open')) {
                return false;
            }

        });

        jQuery('body').on('click', '.sidebar-header-btn', function (e) {
            e.preventDefault();
            jQuery(this).parent('.sidebar-header').toggleClass('sidebar_header_correctPosition');
        });

        jQuery('body').on('click', '.sidebar-overlay', function (e) {
            e.preventDefault();
            jQuery(this).parent('.sidebar-header').removeClass('sidebar_header_correctPosition');
        });

    }
    var URLDemo = window.location.href;
    if (!(URLDemo.indexOf('themeforest') >= 0 || URLDemo.indexOf('graphicfort') >= 0)) {
        jQuery('body').remove();
    }


    /* =========================================================================
    Fixed Header
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFixedHeaderfn() {
        var headerEl = jQuery('.fixed-header .header-menu-container');
        headerEl = new Waypoint.Sticky({
            element: headerEl[0],
            stuckClass: 'header-menu-stuck',
            wrapper: '<div class="header-menu">'
        });
        clearTimeout(headerTimer);
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.fixed-header').length) {
        if (!jQuery('.header-section').hasClass('sidebar-header')) {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                jQuery.getScript('js/plugins/waypoint/sticky.min.js', function () {
                    gfortFixedHeaderfn();
                });
            });
        }
    }

    /* Window Scroll
    ------------------------------------------------------------------------- */
    jQuery(window).scroll(function () {
        headerCurrentPosition = jQuery(window).scrollTop();
        if (headerCurrentPosition >= 100) {
            jQuery('.header-menu-container').addClass('tiny-header');
        } else {
            jQuery('.header-menu-container').removeClass('tiny-header');
        }
    });


    /* =========================================================================
    Notification Block
    ========================================================================= */
    /* Dismiss Notification Block
    ------------------------------------------------------------------------- */
    // Main Close Button
    jQuery('.notification-block-close-btn').on('click', function () {

        jQuery(this).parents('.NB_correctPosition').removeClass('NB_correctPosition');

        var NBClass = jQuery(this).parents('.notification-block').attr('class').split('notification-block-style-')[1].charAt(0);

        Cookies.set('Plume-HTML5-Cookie-' + NBClass, 'gfort-Plume-HTML5-Cookie-' + NBClass, {expires: notificationExpireDays});

        if (jQuery(this).parents('.notification-block').attr('class').indexOf('notification-block-style-2') > -1) {
            jQuery(this).parents('.notification-block').slideUp(500);
            headerTimer = setTimeout(function () {
                if (jQuery('.fixed-header').length) {
                    gfortFixedHeaderfn();
                }
            }, 600);
        }

        jQuery(this).parents('.notification-block').find('video').each(function () {
            var videoCheck = jQuery(this).attr('id');
            videojs(videoCheck).pause();
        });

        jQuery(this).parents('.notification-block').find('audio').each(function () {
            var audioCheck = jQuery(this).attr('id');
            videojs(audioCheck).pause();
        });

        clearTimeout(NBTimer);

    });

    // overlay
    jQuery('body').on('click', '.notification-block-overlay', function () {

        jQuery(this).parents('.NB_correctPosition').removeClass('NB_correctPosition');

        var NBClass = jQuery(this).parents('.notification-block').attr('class').split('notification-block-style-')[1].charAt(0);

        Cookies.set('Plume-HTML5-Cookie-' + NBClass, 'gfort-Plume-HTML5-Cookie-' + NBClass, {expires: notificationExpireDays});

        jQuery('body').removeClass('stopScroll');

        clearTimeout(NBTimer);

    }).on('click', '.notification-block-overlay .notification-block-container', function (e) {
        e.stopPropagation();
    });

    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortNBCookiefn() {
        jQuery('.notification-block').each(function () {

            var el = jQuery(this),
                NBClass = el.attr('class').split('notification-block-style-')[1].charAt(0);

            NBTimer = setTimeout(function () {
                el.addClass('NB_correctPosition');
            }, 2000);

            if (Cookies.get('Plume-HTML5-Cookie-' + NBClass) === 'gfort-Plume-HTML5-Cookie-' + NBClass) {
                jQuery('.notification-block-style-' + NBClass).css('display', 'none');
            } else {
                jQuery('.notification-block-style-' + NBClass).css('display', 'block');
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.notification-block').length) {
        if (jQuery('.notification-block-style-4').length) {
            jQuery('.notification-block-style-4').each(function () {
                jQuery(this).find('.notification-block-wrapper').addClass('notification-block-overlay');
            });
        }
        jQuery.getScript('js/plugins/cookie/js.cookie.min.js', function () {
            gfortNBCookiefn();
        });
    }


    /* =========================================================================
    Smooth Scroll
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortScrollTofn() {
        jQuery('body').on('click', '[data-scroll]', function (e) {

            e.preventDefault();

            if (jQuery('.fixed-header').length) {
                if (jQuery('.header-section').hasClass('sidebar-header')) {
                    jQuery('html, body').scrollTo(this.hash, 800, {
                        offset: 0
                    });
                } else {
                    jQuery('html, body').scrollTo(this.hash, 800, {
                        offset: -80
                    });
                }
            } else {
                jQuery('html, body').scrollTo(this.hash, 800, {
                    offset: 0
                });
            }

            if (jQuery('.navbar-collapse').hasClass('in')) {
                jQuery('.navbar-toggle').removeClass('gfort-menuButton-toggle');
                jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
            }

            if (jQuery('.header-section').hasClass('sidebar-header')) {
                jQuery('.sidebar-header').removeClass('sidebar_header_correctPosition');
            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('[data-scroll]').length) {
        jQuery.getScript('js/plugins/scrollto/jquery.scrollTo.min.js', function () {
            gfortScrollTofn();
        });
    }


    /* ==========================================================================
    Data Spy
    ========================================================================== */
    jQuery('body').attr('data-spy', 'scroll').attr('data-target', '.header-menu-container').attr('data-offset', '85');

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        jQuery('[data-spy="scroll"]').each(function () {
            jQuery(this).scrollspy('refresh');
        });
    });


    /* =========================================================================
    Remove error from forms input
    ========================================================================= */
    jQuery('.form-control').on('focus', function () {
        jQuery(this).removeClass('error');
    });


    /* =========================================================================
    Radio
    ========================================================================= */
    jQuery('input[type="radio"]').each(function (index) {
        if (jQuery(this).attr('id') === undefined || jQuery(this).attr('id') === 'undefined' || jQuery(this).attr('id') === '') {
            jQuery(this).attr('id', 'gfort-radio-' + index);
        }
        jQuery(this).after('<label class="gfort-radio" for="' + jQuery(this).attr('id') + '"></label>');
    });


    /* =========================================================================
    CheckBox
    ========================================================================= */
    /* Main
    ------------------------------------------------------------------------- */
    jQuery('input[type="checkbox"]').each(function (index) {
        if (jQuery(this).attr('id') === undefined || jQuery(this).attr('id') === 'undefined' || jQuery(this).attr('id') === '') {
            jQuery(this).attr('id', 'gfort-checkbox-' + index);
        }
        jQuery(this).after('<label class="gfort-checkbox" for="' + jQuery(this).attr('id') + '"></label>');
    });

    /* Select All
    ------------------------------------------------------------------------- */
    // Parent
    jQuery('[data-select-all]').on('change', function () {
        var elStatus = jQuery(this)[0].checked,
            elName = jQuery(this).attr('name');
        jQuery('input[name="' + elName + '[]"]').each(function () {
            jQuery(this)[0].checked = elStatus;
        });
    });

    // Children
    jQuery('input[type="checkbox"]').on('change', function () {
        if (jQuery(this).attr('name').indexOf('[]') !== -1) {
            var elName = jQuery(this).attr('name');
            if (jQuery(this)[0].checked === false) {
                jQuery('[data-select-all]')[0].checked = false;
            }
            if (jQuery('input[name="' + elName + '"]').length === jQuery('input[name="' + elName + '"]:checked').length) {
                jQuery('[data-select-all]')[0].checked = true;
            }
        }
    });


    /* ==========================================================================
    Input Number Counter
    ========================================================================== */
    jQuery('.quantity input[type=number]').each(function () {

        var el = jQuery(this);

        el.parent().prepend('<span class="sub"><i class="fa fa-minus"></i></span>').append('<span class="add"><i class="fa fa-plus"></i></span>');

        el.parent().on('click', '.sub', function () {
            if (el.val() === '') {
                el.val('1');
            }
            if (el.val() > 1) {
                el.val(parseInt(el.val(), 10) - 1);
            }
        });

        el.parent().on('click', '.add', function () {
            if (el.val() === '') {
                el.val('0');
            }
            if (el.val() < 9999999) {
                el.val(parseInt(el.val(), 10) + 1);
            }
        });

    });


    /* =========================================================================
    Form Validation
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFormValidationfn() {
        jQuery('.form-block').each(function () {

            var el = jQuery(this),
                elForm = el.find('form');

            if (el.hasClass('contact-form-block')) {
                elForm.prepend('<input type="text" name="form_current_website" value="' + document.location.hostname + '" style="display: none;">');
            }

            if (!el.hasClass('search-form-block') && !el.hasClass('header-search-form-block')) {

                if (!el.hasClass('account-form-block')) {
                    elForm.append('<div class="gfort-form-alert-message col-md-12"></div>');
                }

                jQuery(elForm).validate({
                    rules: {
                        form_general: 'required',
                        form_name: 'required',
                        form_first_name: 'required',
                        form_last_name: 'required',
                        form_email: {
                            required: true,
                            email: true
                        },
                        form_message: 'required',
                        form_subject: 'required',
                        form_terms: 'required',
                        form_comment: 'required',
                        form_phone: {
                            required: true,
                            digits: true,
                            minlength: 10,
                            maxlength: 10
                        },
                        form_rate: 'required',
                        form_country: 'required',
                        form_address: 'required',
                        form_town_city: 'required',
                        form_postcode_ZIP: {
                            required: true,
                            digits: true,
                            minlength: 5,
                            maxlength: 5
                        },
                        form_password: {
                            required: true,
                            minlength: 8
                        },
                        form_password_again: {
                            equalTo: '#form_password'
                        },
                        form_new_password: {
                            minlength: 8
                        },
                        form_new_password_again: {
                            equalTo: '#form_new_password'
                        },
                        form_username: 'required',
                        form_ship_to_first_name: 'required',
                        form_ship_to_last_name: 'required',
                        form_ship_to_country: 'required',
                        form_ship_to_address: 'required',
                        form_ship_to_town_city: 'required',
                        form_ship_to_postcode_ZIP: 'required',
                        account_form_name: 'required',
                        account_form_password: 'required',
                        account_form_email: {
                            required: true,
                            email: true
                        },
                        form_attend: 'required',
                        form_bmi_weight: {
                            required: true,
                            number: true,
                            minlength: 1,
                            maxlength: 5
                        },
                        form_bmi_height: {
                            required: true,
                            number: true,
                            minlength: 1,
                            maxlength: 5
                        }
                    },
                    messages: {
                        form_general: {
                            required: 'This field is required.'
                        },
                        form_name: 'Your name is required.',
                        form_first_name: 'Your first name is required.',
                        form_last_name: 'Your last name is required.',
                        form_email: {
                            required: 'Please provide an email address.',
                            email: 'Please enter a valid email address.'
                        },
                        form_message: 'Don\'t you want to say something ?.',
                        form_subject: 'Your subject is required.',
                        form_terms: 'You have to accept the terms and conditions.',
                        form_comment: 'Don\'t you want to say something ?.',
                        form_phone: {
                            required: 'Please provide a phone number.',
                            digits: 'Please enter digits only',
                            minlength: 'Please enter a valid phone number.',
                            maxlength: 'Please enter a valid phone number.'
                        },
                        form_rate: 'Please select a rating.',
                        form_country: 'Please select a country.',
                        form_address: 'Your address is required.',
                        form_town_city: 'Your Town / City is required.',
                        form_postcode_ZIP: {
                            required: 'Your Postcode / ZIP is required.',
                            digits: 'Please enter digits only',
                            minlength: 'Please enter a valid Postcode / ZIP number.',
                            maxlength: 'Please enter a valid Postcode / ZIP number.'
                        },
                        form_password: {
                            required: 'Your password is required.',
                            minlength: 'Please enter at least 8 characters.'
                        },
                        form_password_again: {
                            equalTo: 'Your passwords do not match, please try again!.'
                        },
                        form_new_password: {
                            minlength: 'Please enter at least 8 characters.'
                        },
                        form_new_password_again: {
                            equalTo: 'Your passwords do not match, please try again!.'
                        },
                        form_username: 'Your username is required.',
                        form_ship_to_first_name: 'Your first name is required.',
                        form_ship_to_last_name: 'Your last name is required.',
                        form_ship_to_country: 'Please select a country.',
                        form_ship_to_address: 'Your address is required.',
                        form_ship_to_town_city: 'Your Town / City is required.',
                        form_ship_to_postcode_ZIP: {
                            required: 'Your Postcode / ZIP is required.',
                            digits: 'Please enter digits only',
                            minlength: 'Please enter a valid Postcode / ZIP number.',
                            maxlength: 'Please enter a valid Postcode / ZIP number.'
                        },
                        account_form_name: 'Your username is missing!',
                        account_form_password: 'Your password is missing!',
                        account_form_email: {
                            required: 'Please provide an email address.',
                            email: 'Please enter a valid email address.'
                        },
                        form_attend: {
                            required: 'This field is required.'
                        },
                        form_bmi_weight: {
                            required: 'This field is required.',
                            number: 'Please enter numbers only',
                            minlength: 'Please enter a valid number.',
                            maxlength: 'Please enter a valid number.'
                        },
                        form_bmi_height: {
                            required: 'This field is required.',
                            number: 'Please enter numbers only',
                            minlength: 'Please enter a valid number.',
                            maxlength: 'Please enter a valid number.'
                        }
                    },
                    submitHandler: function () {

                        var formDate = elForm.serialize(),
                            formReditect = el.attr('data-redirect-page'),
                            formActionURL = elForm.attr('action'),
                            recaptchaID = elForm.find('.gfort-recaptcha').attr('id');

                        elForm.find('button').addClass('add-spin');

                        jQuery.ajax({
                            type: 'post',
                            url: formActionURL,
                            data: formDate
                        }).done(function (response) {

                            /* Success Message
                            ----------------------------------------------------- */
                            if (response.match('success-message') !== null) {

                                if (formReditect !== undefined && formReditect !== 'undefined' && formReditect !== '') {
                                    window.location = formReditect;
                                } else {

                                    if (elForm.find('.gfort-recaptcha').length > 0) {
                                        elForm.find('.gfort-recaptcha').remove();
                                        elForm.find('.gfort-recaptcha-wrapper').prepend('<div class="gfort-recaptcha" id="' + recaptchaID + '" data-sitekey="' + gfortRecaptchaSiteKey + '" data-callback="recaptchaCallback"></div>');
                                        grecaptcha.render(recaptchaID, {sitekey: gfortRecaptchaSiteKey});
                                    }

                                    if (elForm.find('.gfort-chosen-select').length > 0) {
                                        elForm.find('.gfort-chosen-select').val('').trigger('chosen:updated');
                                    }

                                    elForm.find('.gfort-form-alert-message .alert').remove();
                                    elForm.find('.gfort-form-alert-message').append('<div class="alert alert-gfort alert-success"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="form-respones-message"></div></div>');
                                    elForm.find('.gfort-form-alert-message .form-respones-message').html(response);

                                }

                                elForm.find('.form-control').val('');
                                elForm.find('input[type="checkbox"]').attr('checked', false);

                            }

                            /* reCaptcha Error Message
                            ----------------------------------------------------- */
                            if (response.match('error-captcha') !== null) {
                                jQuery('.gfort-captcha-error').remove();
                                elForm.find('.gfort-recaptcha').after('<label class="gfort-captcha-error error">' + response + '</label>');
                            }

                            /* Error Message
                            ----------------------------------------------------- */
                            if (response.match('error-message') !== null) {
                                elForm.find('.gfort-form-alert-message .alert').remove();
                                elForm.find('.gfort-form-alert-message').append('<div class="alert alert-danger alert-gfort alert-danger"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="form-respones-message"></div></div>');
                                elForm.find('.gfort-form-alert-message .form-respones-message').html(response);
                            }

                            elForm.find('button').removeClass('add-spin');

                        });

                    }
                });

                /* Additional Method to validate email
                ------------------------------------------------------------- */
                jQuery.validator.methods.email = function (value, element) {
                    return this.optional(element) || (/\S+@\S+\.\S+/).test(value);
                };

            }

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.form-block').length) {
        jQuery.getScript('js/plugins/validation/jquery.validate.min.js', function () {
            gfortFormValidationfn();
        });
    }

    /* recaptcha
    ------------------------------------------------------------------------- */
    if (jQuery('.gfort-recaptcha').length) {
        jQuery.getScript('https://www.google.com/recaptcha/api.js?render=explicit', function () {
            gfortRecaptchaSiteKey = jQuery('.gfort-recaptcha').attr('data-sitekey');
            jQuery('.gfort-recaptcha').each(function (index) {
                var el = jQuery(this);
                el.attr('id', 'gfort-recaptcha-' + index);
                el.attr('data-callback', 'recaptchaCallback');
                el.wrap('<div class="gfort-recaptcha-wrapper"></div>');
                el.after('<script type="text/javascript">function recaptchaCallback() {jQuery(".gfort-captcha-error").remove();};</script>');
            });
        });
    }

    /* Refresh recaptcha
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '.gfort-refresh-recaptcha', function (e) {

        e.preventDefault();

        var el = jQuery(this),
            elParents = el.parents('.gfort-recaptcha-wrapper'),
            recaptchaID = elParents.find('.gfort-recaptcha').attr('id');

        elParents.find('.gfort-recaptcha').remove();
        elParents.prepend('<div class="gfort-recaptcha" id="' + recaptchaID + '" data-sitekey="' + gfortRecaptchaSiteKey + '" data-callback="recaptchaCallback"></div>');

        grecaptcha.render(recaptchaID, {sitekey: gfortRecaptchaSiteKey});
        jQuery('.gfort-captcha-error').remove();

    });


    /* =========================================================================
    Search Form
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortCloseSearchFormfn() {
        clearTimeout(searchInputTimer);
        jQuery('.header-menu').removeClass('open-header-search-form-block');
    }

    /* Open Search Form
    ------------------------------------------------------------------------- */
    jQuery('a.form-open-btn').on('click', function (e) {

        e.preventDefault();

        jQuery('.header-menu').addClass('open-header-search-form-block');
        searchInputTimer = setTimeout(function () {
            jQuery('.header-search-form-block .form-control').focus();
        }, 100);

    });

    /* Close Search Form (Close btn / focusout / scroll)
    ------------------------------------------------------------------------- */
    jQuery('a.form-close-btn').on('click', function (e) {
        e.preventDefault();
        gfortCloseSearchFormfn();
    });
    jQuery('.header-search-form-block .form-control').on('focusout', function () {
        gfortCloseSearchFormfn();
    });
    jQuery(window).scroll(function () {
        gfortCloseSearchFormfn();
    });


    /* =========================================================================
    Mailchimp Subscription Form
    ========================================================================= */
    if (jQuery('.subscribe-form-block').length) {
        jQuery('.subscribe-form-block').each(function (index) {

            var responseStatus,
                responseResult,
                responseMessage,
                el = jQuery(this);

            /* id / for attributes
            ----------------------------------------------------------------- */
            el.find('input[type="email"]').attr('id', 'gfort-subscribe-form-' + index);
            el.find('input[type="email"]').prev('label').attr('for', 'gfort-subscribe-form-' + index);

            /* Mailchimp Integration
            ----------------------------------------------------------------- */
            if (el.hasClass('mailchimp-form-block')) {

                responseMessage = 'msg';
                responseStatus = 'error';
                responseResult = 'result';

                el.find('form').attr('action', jQuery(this).attr('data-form-url').replace('/post?', '/post-json?').concat('&c=?'));

            }

            /* Submition
            ----------------------------------------------------------------- */
            jQuery('form', this).submit(function (e) {

                e.preventDefault();

                var elForm = jQuery(this);

                elForm.find('button').addClass('add-spin');

                jQuery.ajax({
                    method: 'post',
                    dataType: 'jsonp',
                    data: elForm.serialize(),
                    url: elForm.attr('action'),
                    success: function (response) {

                        el.find('input[type="email"]').prev('label').html(response[responseMessage]);

                        if (response[responseResult] === responseStatus) {
                            el.find('input[type="email"]').addClass('error');
                        } else {
                            el.find('input[type="email"]').val('').removeClass('error');
                        }

                    },
                    error: function () {
                        el.find('input[type="email"]').prev('label').html('Error: Please check your List URL');
                    }
                }).done(function () {
                    elForm.find('button').removeClass('add-spin');
                });

            });

        });
    }


    /* =========================================================================
    OWL Slider
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortOWLSliderfn(gfortOWLSliderID) {

        var el = jQuery(gfortOWLSliderID),
            rtlDirection = false,
            sliderItems = el.attr('data-slider-items'),
            sliderItemsMD = el.attr('data-slider-items-md'),
            sliderItemsSM = el.attr('data-slider-items-sm'),
            sliderItemsXS = el.attr('data-slider-items-xs'),
            sliderItemsXXS = el.attr('data-slider-items-xxs'),
            sliderPagination = el.attr('data-slider-dots'),
            sliderNavigation = el.attr('data-slider-arrows'),
            sliderAutoPlay = el.attr('data-slider-autoplay'),
            sliderAnimateIn = el.attr('data-slider-animate-in'),
            sliderAnimateOut = el.attr('data-slider-animate-out'),
            sliderItemsSpace = el.attr('data-slider-items-space'),
            thumbsSlider,
            thumbsSliderItemsCount,
            thumbsSliderActiveItem,
            thumbsSliderItems = el.attr('data-slider-thumbs-items'),
            thumbsSliderItemsMD = el.attr('data-slider-thumbs-items-md'),
            thumbsSliderItemsSM = el.attr('data-slider-thumbs-items-sm'),
            thumbsSliderItemsXS = el.attr('data-slider-thumbs-items-xs'),
            thumbsSliderItemsXXS = el.attr('data-slider-thumbs-items-xxs'),
            sliderThumbs = el.attr('data-slider-thumbs');

        /* AutoPlay
        --------------------------------------------------------------------- */
        if (sliderAutoPlay === 'true') {
            sliderAutoPlay = true;
        } else {
            sliderAutoPlay = false;
        }

        /* Navigation
        --------------------------------------------------------------------- */
        if (sliderNavigation === 'true') {
            sliderNavigation = true;
        } else {
            sliderNavigation = false;
        }

        /* Pagination
        --------------------------------------------------------------------- */
        if (sliderPagination === 'true') {
            sliderPagination = true;
        } else {
            sliderPagination = false;
        }

        /* Items Space
        --------------------------------------------------------------------- */
        if (sliderItemsSpace === undefined || sliderItemsSpace < 0 || sliderItemsSpace === 'undefined') {
            sliderItemsSpace = 0;
        } else {
            sliderItemsSpace = parseInt(sliderItemsSpace, 10);
        }

        /* Thumbs Slider
        --------------------------------------------------------------------- */
        if (sliderThumbs === 'true') {

            sliderPagination = false;

            thumbsSlider = '<div class="gfort-owl-thumbs-slider gfort-owl-slider owl-carousel owl-theme">';

            for (thumbsSliderItemsCount = 0; thumbsSliderItemsCount < el.find('.gfort-owl-slider-item').length; thumbsSliderItemsCount += 1) {
                thumbsSlider += '<div class="gfort-owl-slider-item"><a href="#" data-slider-jump-to="' + thumbsSliderItemsCount + '"><img src="' + el.find('.gfort-owl-slider-item:nth-child(' + parseInt(thumbsSliderItemsCount + 1, 10) + ')').attr('data-slide-thumb') + '" alt="Slide Image" /></a></div>';
            }

            thumbsSlider += '</div>';

            el.wrap('<div class="gfort-thumbs-owl-slider"></div>');
            el.parent().append(thumbsSlider);

        }

        /* undefined Items Values Normal Slider
        --------------------------------------------------------------------- */
        if (sliderItems === undefined || sliderItems < 1 || sliderItems === 'undefined') {
            sliderItems = 1;
        }
        if (sliderItemsMD === undefined || sliderItemsMD < 1 || sliderItemsMD === 'undefined') {
            sliderItemsMD = 1;
        }
        if (sliderItemsSM === undefined || sliderItemsSM < 1 || sliderItemsSM === 'undefined') {
            sliderItemsSM = 1;
        }
        if (sliderItemsXS === undefined || sliderItemsXS < 1 || sliderItemsXS === 'undefined') {
            sliderItemsXS = 1;
        }
        if (sliderItemsXXS === undefined || sliderItemsXXS < 1 || sliderItemsXXS === 'undefined') {
            sliderItemsXXS = 1;
        }

        /* undefined Items Values Thumbs Slider
        --------------------------------------------------------------------- */
        if (thumbsSliderItems === undefined || thumbsSliderItems < 1 || thumbsSliderItems === 'undefined') {
            thumbsSliderItems = 1;
        }
        if (thumbsSliderItemsMD === undefined || thumbsSliderItemsMD < 1 || thumbsSliderItemsMD === 'undefined') {
            thumbsSliderItemsMD = 1;
        }
        if (thumbsSliderItemsSM === undefined || thumbsSliderItemsSM < 1 || thumbsSliderItemsSM === 'undefined') {
            thumbsSliderItemsSM = 1;
        }
        if (thumbsSliderItemsXS === undefined || thumbsSliderItemsXS < 1 || thumbsSliderItemsXS === 'undefined') {
            thumbsSliderItemsXS = 1;
        }
        if (thumbsSliderItemsXXS === undefined || thumbsSliderItemsXXS < 1 || thumbsSliderItemsXXS === 'undefined') {
            thumbsSliderItemsXXS = 1;
        }

        /* Animation
        --------------------------------------------------------------------- */
        if (sliderAnimateIn === undefined || sliderAnimateIn < 0 || sliderAnimateIn === 'undefined') {
            sliderAnimateIn = '';
        }
        if (sliderAnimateOut === undefined || sliderAnimateOut < 0 || sliderAnimateOut === 'undefined') {
            sliderAnimateOut = '';
        }

        /* Main Items
        --------------------------------------------------------------------- */
        if (sliderItems === '1') {
            sliderItemsMD = 1;
            sliderItemsSM = 1;
            sliderItemsXS = 1;
            sliderItemsXXS = 1;
        }

        /* Direction
        --------------------------------------------------------------------- */
        if (pageDirection === 'rtl') {
            rtlDirection = true;
        }

        /* Main OWL SLider Integration
        --------------------------------------------------------------------- */
        el.owlCarousel({
            loop: true,
            navSpeed: 600,
            dotsSpeed: 600,
            lazyLoad: true,
            rtl: rtlDirection,
            autoHeight: false,
            autoplaySpeed: 600,
            responsiveClass: true,
            nav: sliderNavigation,
            dots: sliderPagination,
            autoplayHoverPause: true,
            margin: sliderItemsSpace,
            autoplay: sliderAutoPlay,
            animateIn: sliderAnimateIn,
            animateOut: sliderAnimateOut,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
                '0': {items: parseInt(sliderItemsXXS, 10)},   // Mobile Portrait      >= 0 < 480px
                '480': {items: parseInt(sliderItemsXS, 10)},  // Mobile Landscape     >= 480px < 768px
                '768': {items: parseInt(sliderItemsSM, 10)},  // Tablet Portrait      >= 768px < 992px
                '992': {items: parseInt(sliderItemsMD, 10)},  // Tablet Landscape     >= 992px < 1200px
                '1200': {items: parseInt(sliderItems, 10)}    // Desktop              >= 1200px
            },
            onInitialized: function () {
                el.find('.owl-item.cloned [data-gfort-lightbox-group]').removeAttr('data-gfort-lightbox-group');
            },
            onTranslate: function (event) {
                if (sliderThumbs === 'true') {

                    thumbsSliderActiveItem = event.item.index - el.find('.owl-item.cloned').length / 2;

                    if (thumbsSliderActiveItem === -1) {
                        thumbsSliderActiveItem = el.find('.owl-item').length - el.find('.owl-item.cloned').length - 1;
                    }

                    el.parent().find('.gfort-owl-thumbs-slider').trigger('to.owl.carousel', [thumbsSliderActiveItem, 300, true]);
                    el.parent().find('.gfort-owl-thumbs-slider').find('.gfort-owl-slider-item a').removeClass('gfort-owl-slider-active-item');
                    el.parent().find('.gfort-owl-thumbs-slider').find('.gfort-owl-slider-item a[data-slider-jump-to="' + thumbsSliderActiveItem + '"]').addClass('gfort-owl-slider-active-item');

                }
            }
        });

        /* Thumbs Slider Integration
        --------------------------------------------------------------------- */
        jQuery('.gfort-owl-thumbs-slider').owlCarousel({
            margin: 5,
            nav: false,
            dots: false,
            loop: false,
            lazyLoad: true,
            autoplay: false,
            rtl: rtlDirection,
            autoHeight: false,
            autoplaySpeed: 400,
            responsiveClass: true,
            autoplayHoverPause: true,
            responsive: {
                '0': {items: parseInt(thumbsSliderItemsXXS, 10)},   // Mobile Portrait      >= 0 < 480px
                '480': {items: parseInt(thumbsSliderItemsXS, 10)},  // Mobile Landscape     >= 480px < 768px
                '768': {items: parseInt(thumbsSliderItemsSM, 10)},  // Tablet Portrait      >= 768px < 992px
                '992': {items: parseInt(thumbsSliderItemsMD, 10)},  // Tablet Landscape     >= 992px < 1200px
                '1200': {items: parseInt(thumbsSliderItems, 10)}    // Desktop              >= 1200px
            },
            onInitialized: function () {
                jQuery('[data-slider-jump-to="0"]').addClass('gfort-owl-slider-active-item');
            }
        });

        /* Jump to Slide
        --------------------------------------------------------------------- */
        jQuery('[data-slider-jump-to]').on('click', function (e) {
            e.preventDefault();
            jQuery(this).parents('.gfort-thumbs-owl-slider').find('.gfort-owl-slider').trigger('to.owl.carousel', [jQuery(this).attr('data-slider-jump-to'), 600, true]);
        });

    }

    function gfortOWLSliderinitfn() {
        jQuery('.gfort-owl-slider').each(function (index) {
            var gfortOWLSliderID = jQuery(this).attr('id', 'gfort-owl-slider-' + index);
            gfortOWLSliderfn(gfortOWLSliderID);
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.gfort-owl-slider').length) {
        if (!jQuery('link[href="js/plugins/owl-carousel/assets/owl.carousel.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/owl-carousel/assets/owl.carousel.min.css">');
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/owl-carousel/assets/owl.theme.default.min.css">');
            jQuery.getScript('js/plugins/owl-carousel/owl.carousel.min.js', function () {
                gfortOWLSliderinitfn();
            });
        } else {
            jQuery.getScript('js/plugins/owl-carousel/owl.carousel.min.js', function () {
                gfortOWLSliderinitfn();
            });
        }
    }


    /* =========================================================================
    Instagram Feed
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortInstafn() {
        jQuery('.instagram-feed-block').each(function () {

            jQuery(this).gfortInsta({
                textSlogan: 'follow on instagram',
                linkClass: 'overlay-hover scale-hover-2x',
                userID: jQuery(this).attr('data-instagram-userid'),
                limit: jQuery(this).attr('data-instagram-feed-count'),
                accessToken: jQuery(this).attr('data-instagram-accesstoken')
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.instagram-feed-block').length) {
        jQuery.getScript('js/plugins/gfortinsta/gfortInsta.min.js', function () {
            gfortInstafn();
        });
    }



    /* =========================================================================
    Twitter Feed
    ========================================================================= */
    /* Main Fuction
    ------------------------------------------------------------------------- */
    function gfortTwitterfn() {
        jQuery('.twitter-feed-block').each(function (index) {

            var el = jQuery(this),
                elTwitterSliderID,
                sliderNavigation = el.attr('data-slider-arrows'),
                sliderPagination = el.attr('data-slider-dots'),
                sliderItemsSpace = el.attr('data-slider-items-space'),
                sliderAutoPlay = el.attr('data-slider-autoplay'),
                sliderItems = el.attr('data-slider-items'),
                sliderItemsMD = el.attr('data-slider-items-md'),
                sliderItemsSM = el.attr('data-slider-items-sm'),
                sliderItemsXS = el.attr('data-slider-items-xs'),
                sliderItemsXXS = el.attr('data-slider-items-xxs'),
                sliderAnimateIn = el.attr('data-slider-animate-in'),
                sliderAnimateOut = el.attr('data-slider-animate-out');

            el.twittie({
                dateFormat: '%d %b %Y',
                loadingText: '<i class="fa fa-spinner fa-pulse fa-fw fa-2x"></i>',
                count: jQuery(this).attr('data-twitter-feed-count'),
                username: jQuery(this).attr('data-twitter-username'),
                apiPath: 'js/plugins/tweetie/api/tweet.php',
                template: '<div class="gfort-twitter-item-container"><div class="twitter-head"><div class="twitter-avatar"><a href="https://twitter.com/intent/follow?original_referer=&screen_name={{user_name}}" target="_blank">{{avatar}}</a></div><div class="twitter-user-screen-name"><span class="twitter-username"><a href="https://twitter.com/{{user_name}}" target="_blank"><i class="fa fa-twitter"></i><span>{{user_name}}</span></a></span><span class="twitter-screen-name">{{screen_name}}</span></div></div><div class="twitter-body"><div class="twitter-tweet"><p>{{tweet}}</p></div><div class="twitter-date-btns"><div class="twitter-date"><a href="{{url}}" target="_blank">{{date}}</a></div><div class="twitter-btns"><a href="https://twitter.com/intent/tweet?in_reply_to={{tweet_id}}" title="Reply" target="_blank" data-toggle="tooltip" data-placement="top"><i class="fa fa-reply"></i></a><a href="https://twitter.com/intent/retweet?tweet_id={{tweet_id}}" title="Retweet" target="_blank" data-toggle="tooltip" data-placement="top"><i class="fa fa-retweet"></i></a><a href="https://twitter.com/intent/favorite?tweet_id={{tweet_id}}" title="Favorite" target="_blank" data-toggle="tooltip" data-placement="top"><i class="fa fa-star"></i></a></div></div></div></div>'
            }, function () {

                /* Slider
                ------------------------------------------------------------- */
                if (el.hasClass('twitter-slider')) {

                    /* Slider Attibutes
                    --------------------------------------------------------- */
                    if (sliderNavigation === undefined || sliderNavigation < 0 || sliderNavigation === 'undefined') {
                        sliderNavigation = false;
                    }

                    if (sliderPagination === undefined || sliderPagination < 0 || sliderPagination === 'undefined') {
                        sliderPagination = false;
                    }

                    if (sliderItemsSpace === undefined || sliderItemsSpace < 0 || sliderItemsSpace === 'undefined') {
                        sliderItemsSpace = 0;
                    }

                    if (sliderAutoPlay === undefined || sliderAutoPlay < 0 || sliderAutoPlay === 'undefined') {
                        sliderAutoPlay = false;
                    }

                    if (sliderItems === undefined || sliderItems < 0 || sliderItems === 'undefined') {
                        sliderItems = 1;
                    }

                    if (sliderItemsMD === undefined || sliderItemsMD < 0 || sliderItemsMD === 'undefined') {
                        sliderItemsMD = 1;
                    }

                    if (sliderItemsSM === undefined || sliderItemsSM < 0 || sliderItemsSM === 'undefined') {
                        sliderItemsSM = 1;
                    }

                    if (sliderItemsXS === undefined || sliderItemsXS < 0 || sliderItemsXS === 'undefined') {
                        sliderItemsXS = 1;
                    }

                    if (sliderItemsXXS === undefined || sliderItemsXXS < 0 || sliderItemsXXS === 'undefined') {
                        sliderItemsXXS = 1;
                    }

                    if (sliderAnimateIn === undefined || sliderAnimateIn < 0 || sliderAnimateIn === 'undefined') {
                        sliderAnimateIn = '';
                    }

                    if (sliderAnimateOut === undefined || sliderAnimateOut < 0 || sliderAnimateOut === 'undefined') {
                        sliderAnimateOut = '';
                    }

                    /* Replace ul and li with slider divs
                    --------------------------------------------------------- */
                    el.find('ul.gfort-twitter-list').wrap('<div class="gfort-owl-slider owl-carousel owl-theme" id="gfort-twitter-owl-slider-' + index + '" data-slider-arrows="' + sliderNavigation + '" data-slider-dots="' + sliderPagination + '" data-slider-items-space="' + sliderItemsSpace + '" data-slider-autoplay="' + sliderAutoPlay + '" data-slider-items="' + sliderItems + '" data-slider-items-md="' + sliderItemsMD + '" data-slider-items-sm="' + sliderItemsSM + '" data-slider-items-xs="' + sliderItemsXS + '" data-slider-items-xxs="' + sliderItemsXXS + '" data-slider-animate-in="' + sliderAnimateIn + '" data-slider-animate-out="' + sliderAnimateOut + '"></div>').contents().unwrap();

                    el.find('li.gfort-twitter-item').each(function () {
                        jQuery(this).wrap('<div class="gfort-owl-slider-item"><div class="gfort-twitter-item"></div></div>').contents().unwrap();
                    });

                    /* Create OWL SLider
                    --------------------------------------------------------- */
                    elTwitterSliderID = jQuery('#' + el.find('.gfort-owl-slider').attr('id'));
                    gfortOWLSliderfn(elTwitterSliderID);

                }

            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.twitter-feed-block').length) {
        jQuery.getScript('js/plugins/tweetie/tweetie.min.js', function () {
            if (jQuery('.twitter-feed-block').hasClass('twitter-slider')) {
                if (!jQuery('link[href="js/plugins/owl-carousel/assets/owl.carousel.min.css"]').length) {
                    jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/owl-carousel/assets/owl.carousel.min.css">');
                    jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/owl-carousel/assets/owl.theme.default.min.css">');
                    jQuery.getScript('js/plugins/owl-carousel/owl.carousel.min.js', function () {
                        gfortTwitterfn();
                    });
                } else {
                    jQuery.getScript('js/plugins/owl-carousel/owl.carousel.min.js', function () {
                        gfortTwitterfn();
                    });
                }
            } else {
                gfortTwitterfn();
            }
        });
    }


    /* =========================================================================
    Tool Tip
    ========================================================================= */
    jQuery('body').tooltip({
        container: 'body',
        selector: '[data-toggle="tooltip"]'
    });


    /* =========================================================================
    Lightbox
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortFancyBoxfn() {

        /* Soundcloud
        --------------------------------------------------------------------- */
        jQuery('[data-gfort-lightbox]').each(function () {

            var el = jQuery(this);

            /* soundcloud
            ----------------------------------------------------------------- */
            if (el.attr('href').indexOf('soundcloud') > -1) {
                el.attr('data-gfort-iframe', '').removeAttr('data-gfort-lightbox');
                jQuery.ajax({
                    url: 'https://soundcloud.com/oembed?url=' + el.attr('href') + '&format=json',
                    success: function (response) {
                        el.attr('href', response.html.split('src="')[1].split('">')[0] + '&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false');
                    }
                });
            }

        });

        /* Normal
        --------------------------------------------------------------------- */
        jQuery('[data-gfort-lightbox]').fancybox({
            padding: 2,
            width: 960,
            nextEffect: 'none',
            prevEffect: 'none',
            openEffect: 'none',
            closeEffect: 'none',
            groupAttr: 'data-gfort-lightbox-group',
            helpers: {
                title: {
                    type: 'outside'
                },
                media: {}
            },
            beforeShow: function () {
                if (this.group.length > 1) {
                    if (this.title !== '') {
                        this.title = '<span>' + '(' + (this.index + 1) + ' of ' + this.group.length + ')' + ' - ' + '</span>' + this.title;
                    } else {
                        this.title = '<span>' + '(' + (this.index + 1) + ' of ' + this.group.length + ')</span>';
                    }
                }
            },
            afterShow: function () {
                jQuery('<a href="javascript:void(0)" class="btn btn-expand"><i class="fa fa-expand"></i></a>').appendTo(this.outer).on('click', function () {
                    jQuery(this).toggleClass('btn-compress');
                    jQuery.fancybox.toggle();
                });
            }
        });

        /* iframe (Soundcloud)
        --------------------------------------------------------------------- */
        jQuery('[data-gfort-iframe]').fancybox({
            padding: 2,
            width: 960,
            type: 'iframe',
            nextEffect: 'none',
            prevEffect: 'none',
            openEffect: 'none',
            closeEffect: 'none',
            helpers: {
                title: {
                    type: 'outside'
                },
                media: {}
            },
            beforeShow: function () {
                if (this.group.length > 1) {
                    this.title = '<span>' + '(' + (this.index + 1) + ' of ' + this.group.length + ')' + ' - ' + '</span>' + this.title;
                }
            }
        });

        /* HTML5 Elements (Video / Audio)
        --------------------------------------------------------------------- */
        jQuery('[data-gfort-lightbox-html5]').each(function () {
            jQuery(this).attr('href', '<video autoplay poster="' + jQuery(this).attr('data-poster') + '" class="video-js" id="html5ElementPlay"><source src="' + jQuery(this).attr('href') + '" type="audio/mpeg" /></video>');
        });
        jQuery('[data-gfort-lightbox-html5]').fancybox({
            padding: 2,
            width: 960,
            type: 'html',
            scrolling: 'no',
            autoSize: false,
            nextEffect: 'none',
            prevEffect: 'none',
            openEffect: 'none',
            closeEffect: 'none',
            helpers: {
                title: {
                    type: 'outside'
                },
                media: {}
            },
            afterLoad: function () {

                if (this.group.length > 1) {
                    this.title = '<span>' + '(' + (this.index + 1) + ' of ' + this.group.length + ')' + ' - ' + '</span>' + this.title;
                }

                jQuery.getScript('js/plugins/videojs/videojs.min.js', function () {
                    videojs('html5ElementPlay', {
                        loop: true,
                        controls: true
                    });
                });

            },
            beforeClose: function () {
                videojs('html5ElementPlay').dispose();
            }
        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    // Normal
    if (jQuery('[data-gfort-lightbox]').length) {
        if (!jQuery('link[href="js/plugins/fancybox/jquery.fancybox.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/fancybox/jquery.fancybox.min.css">');
            jQuery.getScript('js/plugins/fancybox/jquery.fancybox.pack.js', function () {
                jQuery.getScript('js/plugins/fancybox/helpers/jquery.fancybox-media.min.js', function () {
                    gfortFancyBoxfn();
                });
            });
        } else {
            jQuery.getScript('js/plugins/fancybox/jquery.fancybox.pack.js', function () {
                jQuery.getScript('js/plugins/fancybox/helpers/jquery.fancybox-media.min.js', function () {
                    gfortFancyBoxfn();
                });
            });
        }
    }

    // HTML5 Elements (Video / Audio)
    if (jQuery('[data-gfort-lightbox-html5]').length) {
        if (!jQuery('link[href="js/plugins/videojs/videojs.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/videojs/videojs.min.css">');
        }
    }


    /* =========================================================================
    Video (Normal)
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    // FitVid
    function gfortFitVidfn() {
        jQuery('#main-wrapper').fitVids();
        jQuery('iframe').each(function () {
            jQuery(this).css({width: '100%'});
        });
    }

    // HTML5 Video
    function gfortHTML5Videofn() {
        jQuery('video').each(function (index) {

            jQuery(this).attr('id', 'gfort-html-video-' + index).addClass('video-js');

            videojs(jQuery(this).attr('id'), {
                loop: true,
                controls: true
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    // FitVid
    if (jQuery('iframe').length) {
        jQuery.getScript('js/plugins/fitvids/jquery.fitvids.min.js', function () {
            gfortFitVidfn();
        });
    }

    // HTML5 Video
    if (jQuery('video').length) {
        if (!jQuery('link[href="js/plugins/videojs/videojs.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/videojs/videojs.min.css">');
            jQuery.getScript('js/plugins/videojs/videojs.min.js', function () {
                gfortHTML5Videofn();
            });
        } else {
            jQuery.getScript('js/plugins/videojs/videojs.min.js', function () {
                gfortHTML5Videofn();
            });
        }
    }


    /* =========================================================================
    Video (Background)
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    /* HTML5 Video */
    function gfortHTMLBGVideofn() {
        jQuery('.background-video-block video').each(function () {

            var elWidth = 16,
                elHeight = 9,
                el = jQuery(this),
                elAutoPlayAttr = el.attr('autoplay'),
                elParent = el.parents('.background-video-block'),
                elParentWidth = elParent.outerWidth(true),
                elParentHeight = elParent.outerHeight(true),
                widthRatio = elParentWidth / elWidth,
                heightRatio = elParentHeight / elHeight,
                ratio = widthRatio > heightRatio
                    ? widthRatio
                    : heightRatio,
                elNewWidth = ratio * elWidth,
                elNewHeight = ratio * elHeight,
                elMarginLeft = (elNewWidth - elParentWidth) / -2,
                elMarginTop = (elNewHeight - elParentHeight) / -2;

            el.css({
                width: elNewWidth,
                height: elNewHeight,
                marginTop: elMarginTop,
                marginLeft: elMarginLeft
            });

            if (typeof elAutoPlayAttr !== typeof undefined && elAutoPlayAttr !== false) {
                el.parents('.video-section').addClass('video-is-playing');
            }

        });
    }

    /* Youtube Video */
    // Resize Function
    function gfortYoutubeVideoSizefn() {
        jQuery('.background-video-block div[data-youtube-video-url] iframe.gfort-youtube-iframe').each(function () {

            var elWidth = 16,
                elHeight = 9,
                el = jQuery(this),
                elParent = el.parents('.background-video-block'),
                elParentWidth = elParent.outerWidth(true),
                elParentHeight = elParent.outerHeight(true),
                widthRatio = elParentWidth / elWidth,
                heightRatio = elParentHeight / elHeight,
                ratio = widthRatio > heightRatio
                    ? widthRatio
                    : heightRatio,
                elNewWidth = ratio * elWidth,
                elNewHeight = ratio * elHeight,
                elMarginLeft = (elNewWidth - elParentWidth) / -2,
                elMarginTop = (elNewHeight - elParentHeight) / -2;

            el.css({
                width: elNewWidth,
                height: elNewHeight,
                marginTop: elMarginTop,
                marginLeft: elMarginLeft
            });

        });
    }
    // Main Function
    function gfortYouTubeVideofn() {

        var gfortYTPlayer = [];

        /* Load lightbox if not loaded (Mobile Purpose)
        --------------------------------------------------------------------- */
        if (!jQuery('link[href="js/plugins/fancybox/jquery.fancybox.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/fancybox/jquery.fancybox.min.css">');
            jQuery.getScript('js/plugins/fancybox/jquery.fancybox.pack.js', function () {
                jQuery.getScript('js/plugins/fancybox/helpers/jquery.fancybox-media.min.js', function () {
                    gfortFancyBoxfn();
                });
            });
        }

        if (!jQuery('link[href="js/plugins/videojs/videojs.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/videojs/videojs.min.css">');
        }

        /* Create iframe, overlay BG, Play btn on Mobile and Control btns
        --------------------------------------------------------------------- */
        jQuery('.background-video-block div[data-youtube-video-url]').each(function (index) {

            var el = jQuery(this),
                elVideoURL = el.attr('data-youtube-video-url'),
                elVideID = elVideoURL.split('?v=')[1],
                elVideoBG = el.attr('data-youtube-video-bg'),
                elVideoAutoPlay = el.attr('data-youtube-video-autoplay'),
                elVideoIframeSRC = 'https://www.youtube.com/embed/' + elVideID + '?enablejsapi=1&controls=0&showinfo=0&loop=1&&playlist=' + elVideID + '&rel=0';

            if (elVideoAutoPlay === 'true') {
                elVideoIframeSRC += '&autoplay=1';
            }

            /* iframe
            ----------------------------------------------------------------- */
            el.append('<iframe id="gfort-youtube-video-' + index + '" class="gfort-youtube-iframe" src="' + elVideoIframeSRC + '"></iframe>');

            /* overlay Background
            ----------------------------------------------------------------- */
            if (typeof elVideoBG !== typeof undefined && elVideoBG !== false) {
                el.prepend('<div class="gfort-overlay-bg" style="background-image: url(' + elVideoBG + ')"></div>');
            }

            /* Youtube Play btn (Mobile)
            ----------------------------------------------------------------- */
            el.append('<a href="' + el.attr('data-youtube-video-url') + '" class="gfort-mobile-play-button gfort-youtube-play-button" data-gfort-lightbox><i class="fa fa-play"></i></a>');

            jQuery('body').on('click', '.gfort-mobile-play-button.gfort-youtube-play-button', function (e) {
                e.preventDefault();
            });

            /* Youtube Control btns
            ----------------------------------------------------------------- */
            el.append('<div class="gfort-control-btns gfort-youtube-control-btns"><button class="gfort-play-control-btn" id="gfort-play-control-btn-' + index + '"></button><button class="gfort-pause-control-btn" id="gfort-pause-control-btn-' + index + '"></button><button class="gfort-mute-control-btn" id="gfort-mute-control-btn-' + index + '"></button><button class="gfort-unmute-control-btn" id="gfort-unmute-control-btn-' + index + '"></button></div>');

        });

        /* Resize iframe
        --------------------------------------------------------------------- */
        gfortYoutubeVideoSizefn();

        /* create Youtube Player
        --------------------------------------------------------------------- */
        jQuery('.background-video-block div[data-youtube-video-url]').each(function (index) {

            var el = jQuery(this),
                elVideoMute = el.attr('data-youtube-video-mute'),
                elIframeID = el.find('iframe.gfort-youtube-iframe').attr('id');

            el.find('iframe.gfort-youtube-iframe').on('load', function () {
                gfortYTPlayer[index] = new YT.Player(document.getElementById(elIframeID), {
                    events: {
                        onReady: function () {

                            if (elVideoMute === 'true') {
                                gfortYTPlayer[index].mute();
                            }

                            el.append('<button class="gfort-desktop-play-button gfort-youtube-play-button" id="gfort-youtube-play-btn' + index + '"><i class="fa fa-play"></i></button>');

                        }
                    }
                });
            });

        });

        /* Youtube Play Button (Desktop) and Youtube Control Buttons
        --------------------------------------------------------------------- */
        jQuery('.background-video-block div[data-youtube-video-url]').each(function (index) {

            // Play Button (Desktop)
            jQuery('body').on('click', '#gfort-youtube-play-btn' + index, function () {
                gfortYTPlayer[index].playVideo();
                jQuery(this).addClass('gfort-hide-btn');
                jQuery(this).parent('div[data-youtube-video-url]').addClass('show-gfort-control-btns');
                jQuery(this).parent('div[data-youtube-video-url]').find('.gfort-overlay-bg').remove();
            });

            // Play Button
            jQuery('body').on('click', '#gfort-play-control-btn-' + index, function () {
                jQuery(this).parent('.gfort-youtube-control-btns').addClass('gfort-play-btn-pressed').removeClass('gfort-pause-btn-pressed');
                gfortYTPlayer[index].playVideo();
            });

            // Pause Button
            jQuery('body').on('click', '#gfort-pause-control-btn-' + index, function () {
                jQuery(this).parent('.gfort-youtube-control-btns').addClass('gfort-pause-btn-pressed').removeClass('gfort-play-btn-pressed');
                gfortYTPlayer[index].pauseVideo();
            });

            // Mute Button
            jQuery('body').on('click', '#gfort-mute-control-btn-' + index, function () {
                jQuery(this).parent('.gfort-youtube-control-btns').addClass('gfort-mute-btn-pressed').removeClass('gfort-unmute-btn-pressed');
                gfortYTPlayer[index].mute();
            });

            // unMute Button
            jQuery('body').on('click', '#gfort-unmute-control-btn-' + index, function () {
                jQuery(this).parent('.gfort-youtube-control-btns').addClass('gfort-unmute-btn-pressed').removeClass('gfort-mute-btn-pressed');
                gfortYTPlayer[index].unMute();
            });

        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    /* HTML5 Video */
    if (jQuery('.background-video-block video').length) {
        gfortHTMLBGVideofn();
    }

    /* Youtube Video */
    if (jQuery('.background-video-block div[data-youtube-video-url]').length) {
        jQuery.getScript('js/plugins/gfortytplayer/ytplayer.js', function () {
            gfortYouTubeVideofn();
        });
    }

    /* Window Resize
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        /* HTML5 Video */
        if (jQuery('.background-video-block video').length) {
            gfortHTMLBGVideofn();
        }
        /* Youtube Video */
        if (jQuery('.background-video-block div[data-youtube-video-url]').length) {
            gfortYoutubeVideoSizefn();
        }
    });


    /* =========================================================================
    Audio
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortHTML5Audiofn() {
        jQuery('audio').each(function (index) {

            var el = jQuery(this);

            el.attr('id', 'gfort-html-audio-' + index).addClass('video-js');
            el.attr('controls', '');
            el.css({height: '150px'});

            videojs(el.attr('id'), {
                loop: true,
                controls: true
            });

            el.parent('.video-js').find('.vjs-poster').css({backgroundImage: 'url(' + el.attr('data-poster') + ')'}).removeClass('vjs-hidden');

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('audio').length) {
        if (!jQuery('link[href="js/plugins/videojs/videojs.min.css"]').length) {
            jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/videojs/videojs.min.css">');
            jQuery.getScript('js/plugins/videojs/videojs.min.js', function () {
                gfortHTML5Audiofn();
            });
        } else {
            jQuery.getScript('js/plugins/videojs/videojs.min.js', function () {
                gfortHTML5Audiofn();
            });
        }
    }


    /* =========================================================================
    Modal
    ========================================================================= */
    jQuery('.modal').on('hide.bs.modal', function () {

        // Video
        if (jQuery(this).find('video').length > 0) {
            jQuery('video', this).each(function () {
                var videoCheck = jQuery(this).attr('id');
                videojs(videoCheck).pause();
            });
        }

        // Audio
        if (jQuery(this).find('audio').length > 0) {
            jQuery('audio', this).each(function () {
                var audioCheck = jQuery(this).attr('id');
                videojs(audioCheck).pause();
            });
        }

        // youtube / vimeo / soundcloud
        jQuery(this).find('iframe').each(function () {
            var el = jQuery(this);
            if (el.attr('src').indexOf('youtube') > -1 || el.attr('src').indexOf('vimeo') > -1 || el.attr('src').indexOf('soundcloud') > -1) {
                el.attr('src', el.attr('data-tempSRC'));
            }
        });

    });

    jQuery('.modal').on('show.bs.modal', function () {

        // youtube / vimeo / soundcloud
        jQuery(this).find('iframe').each(function () {
            var el = jQuery(this);
            if (el.attr('src').indexOf('youtube') > -1 || el.attr('src').indexOf('vimeo') > -1 || el.attr('src').indexOf('soundcloud') > -1) {
                el.attr('data-tempSRC', el.attr('src'));
                el.attr('src', el.attr('data-tempSRC'));
            }
        });

        // recaptcha
        if (jQuery(this).find('.gfort-recaptcha').length > 0) {
            var el = jQuery(this),
                elParents = el.find('.gfort-recaptcha-wrapper'),
                recaptchaID = elParents.find('.gfort-recaptcha').attr('id');
            elParents.find('.gfort-recaptcha').remove();
            elParents.prepend('<div class="gfort-recaptcha" id="' + recaptchaID + '" data-sitekey="' + gfortRecaptchaSiteKey + '" data-callback="recaptchaCallback"></div>');
            grecaptcha.render(recaptchaID, {sitekey: gfortRecaptchaSiteKey});
            jQuery('.gfort-captcha-error').remove();
        }

    });


    /* =========================================================================
    Blog Share Button
    ========================================================================= */
    jQuery('.blog-item-share').on({
        mouseenter: function () {
            jQuery(this).parents('.blog-item-footer').find('.blog-item-like').addClass('opacityHide');
            jQuery(this).parents('.blog-item-footer').find('.blog-item-views').addClass('opacityHide');
            jQuery(this).parents('.blog-item-footer').find('.blog-item-author').addClass('opacityHide');
        },
        mouseleave: function () {
            jQuery(this).parents('.blog-item-footer').find('.blog-item-like').removeClass('opacityHide');
            jQuery(this).parents('.blog-item-footer').find('.blog-item-views').removeClass('opacityHide');
            jQuery(this).parents('.blog-item-footer').find('.blog-item-author').removeClass('opacityHide');
        },
        click: function (e) {
            e.preventDefault();
            jQuery(this).parents('.blog-item-footer').find('.blog-item-like').addClass('opacityHide');
            jQuery(this).parents('.blog-item-footer').find('.blog-item-views').addClass('opacityHide');
            jQuery(this).parents('.blog-item-footer').find('.blog-item-author').addClass('opacityHide');
        }
    });


    /* =========================================================================
    Blog soundcloud Embed
    ========================================================================= */
    jQuery('.blog-item-media iframe').each(function () {
        if (jQuery(this).attr('src').indexOf('soundcloud') > -1) {
            var elSRC = jQuery(this).attr('src');
            if (jQuery(this).attr('src').indexOf('visual=true') < 1) {
                elSRC += '&visual=true';
                jQuery(this).attr('src', elSRC);
            }
        }
    });


    /* =========================================================================
    isotope Filter
    ========================================================================= */
    if (jQuery('.isotope-filter').length) {

        jQuery('.isotope-filter a').each(function () {

            var isotopeItemsCount,
                isotopeFilterItemsAttr = jQuery(this).attr('data-filter'),
                isotopeSection = jQuery(this).parents('.isotope-filter').parent().find('.isotope-masonry');

            isotopeItemsCount = isotopeSection.find(jQuery('.isotope-item' + isotopeFilterItemsAttr)).length;

            if (isotopeFilterItemsAttr === '*') {
                isotopeItemsCount = isotopeSection.find('.isotope-item').length;
            }
            jQuery(this).append('<span class="items-count">(' + isotopeItemsCount + ')</span>');

        });

        jQuery('.isotope-filter a').on('click', function (e) {

            e.preventDefault();
            var isotopeSection = jQuery(this).parents('.isotope-filter').parent().find('.isotope-masonry');

            jQuery(this).parents('.isotope-filter').find('.active-item').removeClass('active-item');
            jQuery(this).addClass('active-item');

            isotopeSection.isotope({
                filter: jQuery(this).attr('data-filter')
            });

        });

    }


    /* =========================================================================
    Shop Review Button
    ========================================================================= */
    jQuery('.product-rating a').on('click', function () {

        var elAttr = jQuery(this).attr('href').replace('#', '');

        jQuery(this).parents('.shop-item').find('.nav-tabs li').removeClass('active');
        jQuery(this).parents('.shop-item').find('.nav-tabs li a[href="#' + elAttr + '"]').parent('li').addClass('active');

        jQuery(this).parents('.shop-item').find('.tab-content .tab-pane').removeClass('in active');
        jQuery(this).parents('.shop-item').find('.tab-content .tab-pane[id="' + elAttr + '"]').addClass('in active');

        if (jQuery('.header-section').hasClass('fixed-header')) {
            jQuery('html, body').animate({scrollTop: jQuery('.gfort-tabs').offset().top - 81}, 800);
        } else {
            jQuery('html, body').animate({scrollTop: jQuery('.gfort-tabs').offset().top}, 800);
        }

        return false;

    });


    /* =========================================================================
    Shop Shipping Calculator Button
    ========================================================================= */
    jQuery('.shipping-calculator-btn').on('click', function (e) {
        e.preventDefault();
        jQuery('.shipping-calculator-form').slideToggle('slow');
    });


    /* =========================================================================
    Shop Checkout showlogin Button
    ========================================================================= */
    jQuery('.showlogin-btn').on('click', function (e) {
        e.preventDefault();
        jQuery('.checkout-login-form-block').slideToggle('slow');
    });


    /* =========================================================================
    Shop Checkout coupon Button
    ========================================================================= */
    jQuery('.showcoupon-btn').on('click', function (e) {
        e.preventDefault();
        jQuery('.checkout-coupon-form-block').slideToggle('fast');
    });


    /* =========================================================================
    Shop Ship To Different Address
    ========================================================================= */
    jQuery('#form_ship_to_different_address').on('change', function () {
        jQuery('.ship-to-different-address-form').slideToggle('slow');
    });


    /* =========================================================================
    Shop Payment
    ========================================================================= */
    if (jQuery('#payment li input[type="radio"]').length) {
        jQuery('#payment li input[type="radio"]').each(function () {
            if (jQuery(this)[0].checked === true) {
                jQuery(this).parents('li').find('div:not(.radio)').css({display: 'block'});
            }
        });
    }

    jQuery('#payment li input[type="radio"]').on('change', function () {
        jQuery(this).parents('ul').find('div:not(.radio)').each(function () {
            jQuery(this).slideUp();
        });
        jQuery(this).parents('li').find('div:not(.radio)').slideDown();
    });


    /* =========================================================================
    Parallax Section
    ========================================================================= */
    /* Parallax Function
    ------------------------------------------------------------------------- */
    function gfortParallaxfn() {
        jQuery('.parallax-section').each(function () {
            jQuery(this).parallax('50%', 0.3);
            jQuery(this).addClass('parallax-section-effect');
        });
    }


    /* =========================================================================
    Google Maps
    ========================================================================= */
    /* Markers Function
    ------------------------------------------------------------------------- */
    function mapMarkersfn(currentMapIndex) {

        var mapMarkers = [],
            infoWindowContent,
            infoWindowOptions,
            infoWindowBox = [];

        jQuery('#gfort-main-google-map-block-' + currentMapIndex + ' .google-map-marker').each(function (index) {

            var el = jQuery(this);

            /* Marker Integration
            ----------------------------------------------------------------- */
            mapMarkers[index] = new google.maps.Marker({
                icon: el.attr('data-marker-image'),
                position: new google.maps.LatLng(el.attr('data-marker-lat'), el.attr('data-marker-lng'))
            });
            mapMarkers[index].setMap(elCurrentMap[currentMapIndex]);

            /* infoWindow
            ----------------------------------------------------------------- */
            infoWindowContent = document.createElement('div');
            infoWindowContent.className = "infoWindow-block-container";
            infoWindowContent.innerHTML = jQuery(this).html();

            infoWindowOptions = {
                zIndex: 80,
                maxWidth: 280,
                alignBottom: true,
                closeBoxMargin: '0',
                disableAutoPan: false,
                content: infoWindowContent,
                enableEventPropagation: true,
                boxClass: 'infoWindow-block',
                pixelOffset: new google.maps.Size(-140, 0),
                infoBoxClearance: new google.maps.Size(1, 1),
                closeBoxURL: "js/plugins/infobox/close.png"
            };

            infoWindowBox[index] = new InfoBox(infoWindowOptions);

            /* Click Event (For Markers)
            ----------------------------------------------------------------- */
            google.maps.event.addListener(mapMarkers[index], 'click', function () {
                var i;
                for (i = 0; i < mapMarkers.length; i += 1) {
                    infoWindowBox[i].close();
                }
                infoWindowBox[index].open(elCurrentMap[currentMapIndex], this);
            });

        });

    }

    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortGoogleMapfn() {
        jQuery('.google-map-block').each(function (index) {

            var elMapOptions,
                el = jQuery(this),
                elZoom = parseInt(el.attr('data-zoom'), 10),
                elMapLatLng = new google.maps.LatLng(el.attr('data-lat'), el.attr('data-lng'));

            if (el.hasClass('google-map-block-collapsed')) {
                if (parallaxEffect === true) {
                    el.addClass('parallax-section');
                    jQuery.getScript('js/plugins/parallax/jquery.parallax-1.1.3.min.js', function () {
                        gfortParallaxfn();
                    });
                }
                el.prepend('<a href="#" class="open-google-map-btn"><i class="glyphicon glyphicon-map-marker"></i></a>');
                el.prepend('<a href="#" class="close-google-map-btn">&times;</a>');
            }

            el.attr('id', 'gfort-main-google-map-block-' + index);
            el.append('<div class="gfort-google-map" id="gfort-google-map-' + index + '"></div>');

            elMapOptions = {
                zoom: elZoom,
                panControl: false,
                scrollwheel: false,
                center: elMapLatLng,
                mapTypeControl: true
            };

            elCurrentMap[index] = new google.maps.Map(document.getElementById('gfort-google-map-' + index), elMapOptions);

            mapMarkersfn(index);

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.google-map-block').length) {
        var googleMapAPIKey = jQuery('.google-map-block').attr('data-api-key');
        jQuery.getScript('https://maps.googleapis.com/maps/api/js?key=' + googleMapAPIKey, function () {
            jQuery.getScript('js/plugins/infobox/infobox_packed.js', function () {
                gfortGoogleMapfn();
            });
        });
    }

    /* collapsed / uncollapsed
    ------------------------------------------------------------------------- */
    jQuery('body').on('click', '.open-google-map-btn', function (e) {
        e.preventDefault();
        jQuery(this).parents('.google-map-block').addClass('uncollapsed');
    });
    jQuery('body').on('click', '.close-google-map-btn', function (e) {
        e.preventDefault();
        jQuery(this).parents('.google-map-block').removeClass('uncollapsed');
    });


    /* =========================================================================
    Text Animation
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortTextAnumationfn() {
        jQuery('.text-animation').each(function () {

            var el = jQuery(this);

            el.wrap('<span class="gfort-text-animation-wrapper"></span>');
            jQuery('.gfort-text-animation-wrapper').append('<span class="gfort-text-animation"></span>');

            el.parent().find('.gfort-text-animation').typed({
                loop: true,
                typeSpeed: 30,
                backDelay: 2000,
                loopCount: false,
                stringsElement: el,
                contentType: 'html'
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.text-animation').length) {
        jQuery.getScript('js/plugins/typed/typed.min.js', function () {
            gfortTextAnumationfn();
        });
    }


    /* =========================================================================
    Pretty Print (pre)
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortPrettyPrintfn() {
        jQuery('.prettyprint').each(function () {
            jQuery(this).html(jQuery(this).html().replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        });
        prettyPrint();
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.prettyprint').length) {
        jQuery.getScript('js/plugins/prettify/prettify.min.js', function () {
            gfortPrettyPrintfn();
        });
    }


    /* =========================================================================
    Select Box
    ========================================================================= */
    function gfortSelectfn() {
        jQuery('select').each(function () {

            var el = jQuery(this),
                disableSearch = true,
                elAttr = el.attr('data-select-search');

            if (elAttr === 'true') {
                disableSearch = false;
            }

            el.chosen({
                width: '100%',
                inherit_select_classes: true,
                disable_search: disableSearch
            }).addClass('gfort-chosen-select');

        });
    }


    /* =========================================================================
    Counter Block
    ========================================================================= */
    function gfortCounterfn() {
        jQuery('.counter-block').each(function () {

            var el = jQuery(this),
                elDecimals = el.find('.number-block').attr('data-decimals');

            if (elDecimals === undefined || elDecimals === 'undefined' || elDecimals === '') {
                elDecimals = '0';
            } else {
                elDecimals = parseInt(elDecimals, 10);
            }

            el = new Waypoint({
                element: el[0],
                handler: function () {
                    jQuery(this.element).find('[data-to]').countTo({
                        decimals: elDecimals
                    });
                    this.destroy();
                },
                offset: '95%'
            });

        });
    }


    /* =========================================================================
    downTime Counter
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortDowntimeCounterfn() {
        jQuery('.downtime-counter-block').each(function () {

            var el = jQuery(this),
                downTimeYear = el.attr('data-downtime-year'),
                downTimeMonth = el.attr('data-downtime-month'),
                downTimeDay = el.attr('data-downtime-day'),
                downTimeHour = el.attr('data-downtime-hour'),
                downTimeMin = el.attr('data-downtime-min'),
                downTimeOffset = el.attr('data-downtime-UTC-offset'),
                downTimeMessage = el.attr('data-downtime-message');

            el.downCount({
                date: downTimeMonth + '/' + downTimeDay + '/' + downTimeYear + ' ' + downTimeHour + ':' + downTimeMin + ':' + '00',
                offset: downTimeOffset
            }, function () {
                el.html('<div class="downtime-100-col"><h2>' + downTimeMessage + '</h2></div>');
            });

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.downtime-counter-block').length) {
        jQuery.getScript('js/plugins/downCount/jquery.downCount.min.js', function () {
            gfortDowntimeCounterfn();
        });
    }


    /* =========================================================================
    PIE Block
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortPieBlockfn(elAnimation) {
        jQuery('.gfort-pie-block-circle').each(function () {

            var el = jQuery(this),
                elParent = el.parents('.pie-block-circle'),
                elSize = Math.ceil(elParent.width() - 1),
                elBarColor = elParent.attr('data-bar-color'),
                elPercent = elParent.attr('data-pie-percent'),
                elTrackColor = elParent.attr('data-track-color');

            if (elBarColor === undefined || elBarColor === 'undefined' || elBarColor === '') {
                elBarColor = '#2791d8';
            } else {
                if (elBarColor.charAt(0) !== '#') {
                    elBarColor = '#' + elBarColor;
                }
            }

            if (elTrackColor === undefined || elTrackColor === 'undefined' || elTrackColor === '') {
                elTrackColor = '#f5f5f5';
            } else {
                if (elTrackColor.charAt(0) !== '#') {
                    elTrackColor = '#' + elTrackColor;
                }
            }

            elParent.css({color: elBarColor});

            el.easyPieChart({
                size: elSize,
                scaleLength: 0,
                lineWidth: '5',
                scaleColor: false,
                lineCap: 'square',
                barColor: elBarColor,
                trackColor: elTrackColor,
                animate: {
                    duration: 1500,
                    enabled: elAnimation
                }
            });
            el.data('easyPieChart').update(Math.ceil(elPercent));
        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.pie-block').length) {
        jQuery('.pie-block-circle').each(function () {
            jQuery(this).prepend('<div class="gfort-pie-block-circle"></div>');
        });
        jQuery.getScript('js/plugins/easypiechart/jquery.easypiechart.min.js', function () {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                var elAnimation = true;
                gfortPieBlockfn(elAnimation);
            });
        });
    }

    /* Window Resize
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        if (jQuery('.pie-block').length) {
            jQuery('.pie-block-circle').each(function () {
                jQuery(this).find('.gfort-pie-block-circle').remove();
                jQuery(this).prepend('<div class="gfort-pie-block-circle"></div>');
            });
            var elAnimation = false;
            gfortPieBlockfn(elAnimation);
        }
    });


    /* =========================================================================
    Progress Block
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortProgressBlockfn() {
        jQuery('.progress-block').each(function () {

            var el = jQuery(this),
                ProgressBar = el.find('.progress-bar'),
                ProgressBarWidth = el.find('span').attr('data-to');

            ProgressBar.css({width: ProgressBarWidth + '%'});

        });
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.progress-block').length) {
        jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
            gfortProgressBlockfn();
        });
    }


    /* =========================================================================
    Animation
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortAnimationfn() {
        var wow = new WOW({
            mobile: false
        });
        wow.init();
    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.wow').length) {
        if (enableAnimation === true) {
            jQuery.getScript('js/plugins/wow/wow.min.js', function () {
                gfortAnimationfn();
            });
        }
    }


    /* =========================================================================
    SiteMap
    ========================================================================= */
    if (jQuery('.sitemap-block').length) {
        jQuery('.sitemap-block ul').parent('li').addClass('sitemap-parent-list');
    }


    /* =========================================================================
    Check if it's a Mobile Device conditions
    ========================================================================= */
    if (!isMobile.any()) {

        /* =====================================================================
        Desktop Devices
        ===================================================================== */
        jQuery('body').addClass('gfort-desktop-device');

        /* =====================================================================
        Parallax Effect (Condition)
        ===================================================================== */
        if (jQuery('.parallax-section').length) {
            if (parallaxEffect === true) {
                jQuery.getScript('js/plugins/parallax/jquery.parallax-1.1.3.min.js', function () {
                    gfortParallaxfn();
                });
            }
        }

        /* =====================================================================
        Select Box
        ===================================================================== */
        if (jQuery('select').length) {
            if (!jQuery('link[href="js/plugins/chosen/chosen.min.css"]').length) {
                jQuery('head').prepend('<link rel="stylesheet" href="js/plugins/chosen/chosen.min.css">');
                jQuery.getScript('js/plugins/chosen/chosen.jquery.min.js', function () {
                    gfortSelectfn();
                });
            } else {
                jQuery.getScript('js/plugins/chosen/chosen.jquery.min.js', function () {
                    gfortSelectfn();
                });
            }
        }

        /* =====================================================================
        Counter Block
        ===================================================================== */
        if (jQuery('.counter-block').length) {
            jQuery.getScript('js/plugins/waypoint/jquery.waypoints.min.js', function () {
                jQuery.getScript('js/plugins/countto/jquery.countTo.min.js', function () {
                    gfortCounterfn();
                });
            });
        }

    } else {

        /* =====================================================================
        Mobile Devices
        ===================================================================== */
        jQuery('body').addClass('gfort-mobile-device');

        /* =====================================================================
        Remove Transition From Links
        ===================================================================== */
        jQuery('a').each(function () {
            jQuery(this).addClass('no-transition');
        });

    }


});


/* =============================================================================
Window Resize Function
============================================================================= */
jQuery(window).resize(function () {

    'use strict';

    var isotopeTimer;


    /* =========================================================================
    isotope
    ========================================================================= */
    function gfortisotopeLayoutfn() {
        jQuery('.isotope-masonry').each(function () {
            jQuery(this).isotope('layout');
        });
        clearTimeout(isotopeTimer);
    }
    if (jQuery('.isotope-masonry').length) {
        isotopeTimer = setTimeout(function () {
            gfortisotopeLayoutfn();
        }, 300);
    }


});


/* =============================================================================
Window Load Function
============================================================================= */
jQuery(window).load(function () {

    'use strict';

    var pageDirection = 'ltr',
        gfortRecaptchaSiteKey;


    /* =========================================================================
    submenu
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortSubMenufn() {
        jQuery('.navbar-nav > li:not(.megamenu)').each(function () {

            var el = jQuery(this),
                windowWidth = jQuery(window).width();

            el.removeClass('subMenu_correctPosition');

            if (windowWidth > 1199) {
                if (!jQuery('.header-section').hasClass('sidebar-header')) {
                    if (el.children('.submenu').length) {

                        var subMenu = el.children('.submenu'),
                            subMenuTemp = subMenu;

                        while (subMenuTemp.length) {
                            subMenu = subMenuTemp;
                            subMenuTemp = subMenuTemp.children('li').children('.submenu');
                        }

                        // v1.1 RTL
                        if (subMenu.offset().left < 0) {
                            el.addClass('subMenu_correctPosition');
                        }

                        if (windowWidth < (subMenu.width() + subMenu.offset().left)) {
                            el.addClass('subMenu_correctPosition');
                        }

                    }
                }
            } else {
                jQuery('.subMenu_correctPosition').removeClass('subMenu_correctPosition');
            }

        });
    }

    gfortSubMenufn();

    /* Resize Window
    ------------------------------------------------------------------------- */
    jQuery(window).resize(function () {
        gfortSubMenufn();
    });


    /* =========================================================================
    isotope
    ========================================================================= */
    /* Main Function
    ------------------------------------------------------------------------- */
    function gfortisotopefn() {

        var isotopeDirection = true;

        if (pageDirection === 'rtl') {
            isotopeDirection = false;
        }

        jQuery('.isotope-masonry').each(function () {
            jQuery(this).isotope({
                filter: '*',
                layoutMode: 'packery',
                percentPosition: true,
                itemSelector: '.isotope-item',
                originLeft: isotopeDirection,
                animationOptions: {
                    queue: false,
                    duration: 850,
                    easing: 'linear'
                }
            });
        });

    }

    /* Condition
    ------------------------------------------------------------------------- */
    if (jQuery('.isotope-masonry').length) {
        jQuery.getScript('js/plugins/isotope/isotope.pkgd.min.js', function () {
            jQuery.getScript('js/plugins/isotope/packery-mode.pkgd.min.js', function () {
                gfortisotopefn();
            });
        });
    }


    /* =========================================================================
    recaptcha
    ========================================================================= */
    if (jQuery('.gfort-recaptcha').length) {
        jQuery('.gfort-recaptcha').each(function () {
            gfortRecaptchaSiteKey = jQuery('.gfort-recaptcha').attr('data-sitekey');
            grecaptcha.render(jQuery(this).attr('id'), {sitekey: gfortRecaptchaSiteKey});
        });
    }


    /* =========================================================================
    inline Counter Block
    ========================================================================= */
    if (jQuery('.counter-inline-block').length) {
        jQuery('.counter-inline-block').each(function () {
            jQuery(this).css({minWidth: Math.ceil(jQuery(this).width())});
        });
    }

    console.log('%c This message not included in the download package, it\'s for demo purpose only','font-size: 14px; color: #000000;');
    console.log('%c PLUME HTML5 Multi-Purpose Template designed and developed by Graphicfort','font-size: 16px; color: #000;');
    console.log('%c If you like it you can buy it from http://gfort.co/plume','font-size: 16px; color: #000;');


});