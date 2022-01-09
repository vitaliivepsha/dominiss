// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/catalog.html');
    require('./assets/templates/layouts/product.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Slider = require('_modules/slider');
var Popup = require('_modules/popup');
var Fancy_select = require('_modules/fancyselect');
var Jscrollpane = require('_modules/jscrollpane');
var LightGallery = require('_modules/lightgallery');
var Jslider = require('_modules/jslider');
var Fancybox = require('_modules/fancybox');
require('../node_modules/sumoselect/jquery.sumoselect.min');
require('../node_modules/ion-rangeslider/js/ion.rangeSlider');
import PerfectScrollbar from 'perfect-scrollbar';

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new Fancy_select();
    new Jscrollpane();
    new LightGallery();
    new Slider();
    new Jslider();
    new Fancybox();

    setTimeout(function () {
        $('body').trigger('scroll');
    }, 100);

    setTimeout(function () {
        $('body').trigger('resize');
        $('.slick-slider').slick('setPosition');
    }, 200);

    // catalog filters

    $('.catalog-filters__btn').click(function () {
        var btn_txt = $(this).find('.catalog-filters__btn-txt');
        $(this).toggleClass('active');
        $('.catalog-main__wrapper').toggleClass('opened-filters');
        if (!$(this).hasClass('active-filters')) {
            btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Фильтры товаров') : btn_txt.html('Скрыть фильтры');
        }
    });

    $('.catalog-filters__close').click(function () {
        $('.catalog-main__wrapper').removeClass('opened-filters');
        $('.catalog-filters__btn:not(.active-filters)').find('.catalog-filters__btn-txt:not(.filters-shown)').html('Фильтры товаров');
    });

    $('.catalog-filter__title').click(function () {
        $(this).toggleClass('active').next('.catalog-filter__body').slideToggle();
    });

    if ($('.filter-item.active').length) {
        $('.catalog-filters__bar-wrapper').addClass('checked-filters');
    }
    else {
        $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
    }
    var checked_filters_couner = $('.filter-item.active').length;
    $('.catalog-filters__counter').html(checked_filters_couner);

    $('.filter-item').click(function () {
        var name = $(this).data('name');
        $(this).toggleClass('active');
        if ($('.filter-item.active').length) {
            $('.catalog-filters__bar-wrapper').addClass('checked-filters');
        }
        else {
            $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
        }
        var checked_filters_couner = $('.filter-item.active').length;
        $('.catalog-filters__counter').html(checked_filters_couner);
        if ($(this).hasClass('active')) {
            $('.catalog-filters__checked-list').append('<div class="catalog-filters__checked-item" data-id="' + name + '">\n' +
                '                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '                                    <path d="M1.46309 8.53276C3.37569 10.5245 6.54095 10.5887 8.5327 8.67609C10.5245 6.76349 10.5886 3.59823 8.67603 1.60647C6.76344 -0.385282 3.59817 -0.449455 1.60642 1.46314C-0.385336 3.37574 -0.449508 6.541 1.46309 8.53276ZM3.3112 2.06138L5.09293 3.91685L6.9484 2.13512L8.0778 3.31126L6.22233 5.09299L8.00406 6.94846L6.82792 8.07785L5.04619 6.22238L3.19072 8.00411L2.06132 6.82797L3.91679 5.04624L2.13506 3.19077L3.3112 2.06138Z" fill="#211F1F"/>\n' +
                '                                </svg>\n' +
                '                                <span>' + name + '</span>\n' +
                '                            </div>');
        }
        else {
            $('.catalog-filters__checked-item').each(function () {
                var id = $(this).data('id');
                if (id === name) {
                    $(this).remove();
                }
            });
        }
    });

    $(document).delegate('.catalog-filters__checked-item', 'click', function (e) {
        var id = $(this).data('id');
        $(this).remove();
        $('.filter-item').each(function () {
            var name = $(this).data('name');
            if (id === name) {
                $(this).removeClass('active');
                if ($('.filter-item.active').length) {
                    $('.catalog-filters__bar-wrapper').addClass('checked-filters');
                }
                else {
                    $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
                }
                var checked_filters_couner = $('.filter-item.active').length;
                $('.catalog-filters__counter').html(checked_filters_couner);
            }
        });
    });

    $('.catalog-filters__clear').click(function () {
        $('.catalog-filters__bar-wrapper').removeClass('checked-filters');
        $('.filter-item').removeClass('active');
        $('.catalog-filters__checked-list').html('');
    });

    setTimeout(function () {
        var filters_bar_pos = $('.catalog-filters__bar-wrapper').offset().top,
            wh = $(window).height();

        $(window).scroll(function () {
            var scrolled = $(window).scrollTop(),
                height_to_top = $('.catalog-filters__bar-wrapper').offset().top - $(window).scrollTop(),
                height_to_bot = wh - height_to_top;
            console.log(filters_bar_pos, wh, height_to_top, height_to_bot);
            if ($('.catalog-filters__bar-wrapper').hasClass('checked-filters')) {
                $('.catalog-filters__main').addClass('checked-filters');
            }
            else {
                $('.catalog-filters__main').removeClass('checked-filters');
            }
            if (scrolled > filters_bar_pos) {
                $('.catalog-filters__bar-wrapper').addClass('fixed');
                $('.catalog-filters__main').addClass('fixed');
                $('.catalog-filters__list').removeAttr('style');
            } else {
                $('.catalog-filters__bar-wrapper').removeClass('fixed');
                $('.catalog-filters__main').removeClass('fixed');
                if ($('.catalog-filters__main').hasClass('checked-filters')) {
                    $('.catalog-filters__list').css('max-height', height_to_bot - 152);
                }
                else {
                    $('.catalog-filters__list').css('max-height', height_to_bot - 127);
                }
            }
        });
    }, 1000);

    // show more tetx

    setTimeout(function () {
        $('.txt-hidden').each(function () {
            var txt_height = $(this).height();
            $('.txt-more__btn').click(function () {
                $(this).hide().closest('.txt-main__wrapper').find('.txt-main').css({ 'height': txt_height, 'max-height': 'unset', 'overflow': 'unset' });
            });
        });
    }, 1000);

    // scroll

    $('.scroll-wrapper').each(function () {
        const ps = new PerfectScrollbar($(this)[0], {
            wheelSpeed: 1,
            wheelPropagation: true,
            useBothWheelAxes: false,
            suppressScrollX: true
        });
        ps.update();
        $(window).resize(function () {
            ps.update();
        });
    });

    $('.scroll-wrapper__prop-false').each(function () {
        const ps1 = new PerfectScrollbar($(this)[0], {
            wheelSpeed: 1,
            wheelPropagation: false,
            useBothWheelAxes: false,
            suppressScrollX: true
        });
        ps1.update();
        $(window).resize(function () {
            ps1.update();
        });
        $('.catalog-filters__btn').click(function () {
            setTimeout(function () {
                $(window).trigger('scroll');
            }, 100);
            setTimeout(function () {
                ps1.update();
            }, 200);
        });
        $('.catalog-filter__title').click(function () {
            setTimeout(function () {
                $(window).trigger('scroll');
            }, 100);
            setTimeout(function () {
                ps1.update();
            }, 200);
        });
        $('.catalog-filters__checked-item').click(function () {
            setTimeout(function () {
                $(window).trigger('scroll');
            }, 100);
            setTimeout(function () {
                ps1.update();
            }, 200);
        });
    });

    // fixed header
    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 100) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        scrollPrev = scrolled;
    });

    // select

    $('.select').SumoSelect();

    $('.search-select').SumoSelect({
        search: true,
        searchText: ''
    });

    $('.SumoSelect>.optWrapper>.options').each(function () {
        $(this).addClass('sumo-scroll__wrapper');
        $('.sumo-scroll__wrapper').each(function () {
            const ps3 = new PerfectScrollbar($(this)[0], {
                wheelSpeed: 1,
                wheelPropagation: false,
                useBothWheelAxes: false,
                suppressScrollX: true
            });
            ps3.update();
            $(window).resize(function () {
                ps3.update();
            });
            $('.SumoSelect').click(function () {
                setTimeout(function () {
                    $('body').trigger('scroll');
                }, 100);
                setTimeout(function () {
                    ps1.update();
                }, 200);
            });
        });
    });

    // tabs

    $('.tabs').on('click', 'li:not(.active)', function () {
        $(this).addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active')
            .closest('.tabs-wrapper').find('.tabs-content__additional').removeClass('active').eq($(this).index()).addClass('active');
    });

    // main screen hover menu

    $('.main-categories__menu li').on('mouseover', function () {
        $(this).addClass('active').siblings().removeClass('active')
            .closest('.main-categories__left').find('.main-categories__pic').removeClass('active').eq($(this).index()).addClass('active');
    });

    // main page catalog hover menu

    $('.main-catalog__list li').on('mouseover', function () {
        $(this).addClass('active').siblings().removeClass('active')
            .closest('.main-catalog__wrapper').find('.main-catalog__categories').removeClass('active').eq($(this).index()).addClass('active');
    });

    // custom slider navigation

    $('.custom-nav__slider').each(function () {
        var $slider = $(this);

        $slider.closest('.custom-nav__slider-wrapper').find('.slider-next').click(function () {
            $slider.slick('slickNext');
        });

        $slider.closest('.custom-nav__slider-wrapper').find('.slider-prev').click(function () {
            $slider.slick('slickPrev');
        });
    });

    // subscribe form

    $('.subscribe-form').submit(function () {
        let form = $(this);
        $.ajax({
            url: '/api.php',
            type: 'POST',
            data: form.serialize()
        }).done(function () {
            setTimeout(function () {
                $('.subscribe-form__main').hide();
                $('.subscribe-form__success').show();
                form.trigger('reset');
            }, 300);
        });
        return false;
    });

    // main menu

    $('.menu-btn').click(function () {
        $('body').addClass('show-menu');
    });

    $(document).click(function () {
        $('body').removeClass('show-menu');
    });

    $('.side-menu__close').click(function () {
        $('body').removeClass('show-menu');
    });

    $(document).on('click', '.menu-btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.side-menu', function (e) {
        e.stopPropagation();
    });


    // search

    /*if ($('.search-form input[type="search"]').val().length) {
      $('.search-form button').css('pointer-events', 'auto');
    }
    else {
      $('.search-form button').css('pointer-events', 'none');
    }
  
    $('.search-form input[type="search"]').on('keyup', function() {
      if ($('.search-form input[type="search"]').val().length) {
        $('.search-form button').css('pointer-events', 'auto');
      }
      else {
        $('.search-form button').css('pointer-events', 'none');
      }
    });
  
    $('.search-form input[type="search"]').bind('keyup keypress', function(e) {
      var code = e.keyCode || e.which;
      if (code  == 13) {
        if ($(this).val() == '') {
          e.preventDefault();
          return false;
        }
      }
    });
  
    $('.search-form input[type="search"]').on('keyup', function(e) {
      if ($(this).val().length > 1) {
        $('.search-examples').hide();
        $('.search-results').show();
        $('.search-form__clear').addClass('active');
      }
      else {
        $('.search-examples').show();
        $('.search-results').hide();
        $('.search-form__clear').removeClass('active');
      }
    });
  
    $('.search-form__clear').click(function() {
      $(this).removeClass('active');
      $('.search-form input[type="search"]').val('');
    });*/

    // main slider
    if ($(window).width() < 574) {
        $('.main-content').slick({
            arrows: false,
            dots: false,
            slidesToShow: 1,
            variableWidth: true,
            swipeToSlide: true,
            infinite: false,
        });
    }

    // custom gallery controls

    $('.light-item').click(function () {
        $('.lg-actions .lg-prev').html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M9.0001 5.15137L2.15158 11.9999L9.0001 18.8484L9.84863 17.9999L3.84863 11.9999L9.84863 5.9999L9.0001 5.15137Z" fill="#111111"/>\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.5996 11.3999H3.39961V12.5999H21.5996V11.3999Z" fill="#111111"/>\n' +
            '</svg>');

        $('.lg-actions .lg-next').html('<svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M34.9999 5.15137L41.8484 11.9999L34.9999 18.8484L34.1514 17.9999L40.1514 11.9999L34.1514 5.9999L34.9999 5.15137Z" fill="#111111"/>\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M2.40039 11.3999H40.6004V12.5999H2.40039V11.3999Z" fill="#111111"/>\n' +
            '</svg>');
    });

    // product size

    $('.product-main__size').click(function () {
        $(this).toggleClass('active').next('.product-main__size-options').fadeToggle();
    });

    $('.product-main__size-options li:not(.not-available)').click(function () {
        var val = $(this).data('val');
        $(this).addClass('current').siblings().removeClass('current');
        $('.product-main__size').removeClass('active');
        $(this).closest('.product-main__size-options').fadeOut();
        $(this).closest('.product-main__size-wrapper').find('.product-main__size-val').html(val);
    });

    $(document).click(function () {
        $('.product-main__size').removeClass('active').next('.product-main__size-options').fadeOut();
    });

    $(document).on('click', '.product-main__size', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.product-main__size-options', function (e) {
        e.stopPropagation();
    });

    // product fitting

    $('#fitting').change(function () {
        if (this.checked) {
            $('.product-main__btn-cart').addClass('fitting');
        }
        else {
            $('.product-main__btn-cart').removeClass('fitting');
        }
    });

    $(document).delegate('.product-main__btn-cart:not(.fitting)', 'click', function () {
        $.magnificPopup.open({
            items: {
                src: '#cart-popup'
            },
            type: 'inline'
        });
    });

    $(document).delegate('.product-main__btn-cart.fitting', 'click', function () {
        $.magnificPopup.open({
            items: {
                src: '#cart-popup'
            },
            type: 'inline',
            mainClass: 'fitting'
        });
    });

    // accordion

    $('.accordion-item__header').click(function () {
        $(this).next('.accordion-item__body').slideToggle().closest('.accordion-item').toggleClass('active');
    });

    // product cart items

    $('.product-cart__item').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
    });

    // cart color and size

    $('.cart-item__color-main').click(function () {
        $(this).toggleClass('active').next('.cart-item__color-list').fadeToggle();
        $('.cart-item__color-main').not(this).removeClass('active').next('.cart-item__color-list').fadeOut();
        $('.cart-item__size-main').removeClass('active').next('.cart-item__size-list').fadeOut();
    });

    $('.cart-item__color-list li').click(function () {
        var $val = $(this).find('img').clone();
        $(this).addClass('current').siblings().removeClass('current');
        $(this).closest('.cart-item__color-list').fadeOut();
        $(this).closest('.cart-item__color').find('.cart-item__color-main').removeClass('active');
        $(this).closest('.cart-item__color').find('.cart-item__color-main > span').html($val);
    });

    $(document).click(function () {
        $('.cart-item__color-main').removeClass('active');
        $('.cart-item__color-list').fadeOut();
    });

    $(document).on('click', '.cart-item__color-main', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.cart-item__color-list', function (e) {
        e.stopPropagation();
    });

    $('.cart-item__size-main').click(function () {
        $(this).toggleClass('active').next('.cart-item__size-list').fadeToggle();
        $('.cart-item__size-main').not(this).removeClass('active').next('.cart-item__size-list').fadeOut();
        $('.cart-item__color-main').removeClass('active').next('.cart-item__color-list').fadeOut();
    });

    $('.cart-item__size-list li').click(function () {
        var val = $(this).data('val');
        $(this).addClass('current').siblings().removeClass('current');
        $(this).closest('.cart-item__size-list').fadeOut();
        $(this).closest('.cart-item__size').find('.cart-item__size-main').removeClass('active');
        $(this).closest('.cart-item__size').find('.cart-item__size-main > span').html(val);
    });

    $(document).click(function () {
        $('.cart-item__size-main').removeClass('active');
        $('.cart-item__size-list').fadeOut();
    });

    $(document).on('click', '.cart-item__size-main', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.cart-item__size-list', function (e) {
        e.stopPropagation();
    });

    // remove cart item

    $('.cart-item__del').click(function () {
        $(this).closest('.cart-item').remove();
    });

    // checkout items show/hide

    $('.checkout-items__header').click(function () {
        $(this).toggleClass('opened').next('.checkout-items__body').slideToggle();
    });

    // checkout item remove

    $('.checkout-item__del').click(function () {
        $(this).closest('.checkout-item').remove();
    });

    // checkout delivery

    $('.delivery-type__np').change(function () {
        if (this.checked) {
            $('.delivery-field__np').show();
            $('.delivery-field__np-courier').hide();
        }
    });

    $('.delivery-type__np-courier').change(function () {
        if (this.checked) {
            $('.delivery-field__np-courier').show();
            $('.delivery-field__np').hide();
        }
    });

    // checkout messangers

    $('#messanger').change(function () {
        $('.checkout-payment__messangers').toggleClass('active');
    });

    //Brands filter

    $('.section-brands__nav li').click(function () {
        let brandsBlock = $('.row_brands .block-brands');
        // $('.section-brands__nav').addClass('activate');
        brandsBlock.addClass('hide');
        $(this).toggleClass('active');
        let activeBrands = $('.section-brands__nav li.active');
        activeBrands.map((i, item) => {
            let brandLetter = $(item).data('brand');
            brandsBlock.map((i, brand) => {
                if ($(brand).data('brand') == brandLetter) {
                    $(brand).removeClass('hide');
                }
            });
        });
    });
    $('.btn-all-brands').click(function () {
        $('.section-brands__nav li').removeClass('active');
        $('.row_brands .block-brands').removeClass('hide');
    });

    // menu dropdown

    $('.menu-drpodown .top').click(function () {
        $(this).toggleClass('open');
        $(this).next().slideToggle(200);
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});

// video

$('.video-inner').on('click', function (e) {
    $(this).find('img').hide();
    $(this).find('svg').hide();
    $(this).find('iframe').show();
    $(this).find('iframe')[0].src += '?autoplay=1';
    e.preventDefault();
});


