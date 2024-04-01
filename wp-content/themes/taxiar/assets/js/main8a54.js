(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06.Set Background & Mask Image
    07. Global Slider
    08. Custom Animaiton For Slider
    09. Ajax Contact Form
    10. Popup Sidemenu  
    11. Search Box Popup
    12. Magnific Popup
    13. Filter
    14. Date Time Picker
    15. Counter Up
    16. VS Tab
    17. Progress Bar Animation
    18. Section Position
    19. Shape Mockup
    00. Inspect Element Disable
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });

 // $('select').niceSelect(); 
 if ($('.nice-select').length) {
  $('.nice-select').niceSelect();
} 

  /*---------- 02. Preloader ----------*/
  if ($('.preloader').length > 0) {
    $('.preloaderCls').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.preloader').css('display', 'none');
      })
    });
  };

  /*---------- 03. Mobile Menu Active ----------*/ 
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
      menuToggleBtn: '.th-menu-toggle ',
      bodyToggleClass: 'th-body-visible',
      subMenuClass: 'th-submenu',
      subMenuParent: 'th-item-has-children', 
      subMenuParentToggle: 'th-active',
      meanExpandClass: 'th-mean-expand',
      appendElement: '<span class="th-mean-expand"></span>',
      subMenuToggleClass: 'th-open', 
      toggleSpeed: 400,
    }, options);

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none')
            $(this).parent().removeClass(opt.subMenuParentToggle);
          };
        });
      };

      // Class Set Up for every submenu
      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').append(opt.appendElement);
        submenu.next('a').append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next('ul').slideToggle(opt.toggleSpeed);
          $($element).next('ul').toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev('ul').slideToggle(opt.toggleSpeed);
          $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
        };
      };

      // Submenu toggle Button
      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        })
      })

      // Hide Menu On out side click
      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle()
      })

      // Stop Hide full menu on menu click
      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });

    });
  };

  $('.th-menu-wrapper').vsmobilemenu();


   /*---------- 04. Sticky fix ----------*/
   $(window).on("scroll", function () {
    var topPos = $(this).scrollTop();
    sticky()
    if (topPos > 150) {
        $('.sticky-wrapper.yes-sticky').addClass('will-sticky')
        sticky()
    } else {
        $('.sticky-wrapper.yes-sticky').removeClass('sticky')
        $('.sticky-wrapper.yes-sticky').removeClass('will-sticky')
    }

    function sticky() {
        if (topPos > 400) {
            $('.sticky-wrapper.yes-sticky').addClass('sticky')
            $('.sticky-wrapper.yes-sticky').removeClass('will-sticky')
        }
    }
})

 /*---------- 05. Scroll To Top ----------*/
 if ($('.scroll-top').length > 0) {

  var scrollTopbtn = document.querySelector('.scroll-top');
  var progressPath = document.querySelector('.scroll-top path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 750;
  jQuery(window).on('scroll', function () {
      if (jQuery(this).scrollTop() > offset) {
          jQuery(scrollTopbtn).addClass('show');
      } else {
          jQuery(scrollTopbtn).removeClass('show');
      }
  });
  jQuery(scrollTopbtn).on('click', function (event) {
      event.preventDefault();
      jQuery('html, body').animate({
          scrollTop: 0
      }, duration);
      return false;
  })
}

/*---------- 06. Set Background Image ----------*/
if ($("[data-bg-src]").length > 0) {
  $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
  });
}


  /*---------- 06.Set Background & Mask Image ----------*/


  /*----------- 07. Global Slider ----------*/


  /*----------- 08. Custom Animaiton For Slider ----------*/



  /*----------- 09. Ajax Contact Form ----------*/
  var form = '.ajax-contact';
  var invalidCls = 'is-invalid';
  var $email = '[name="email"]';
  var $validation = '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
  var formMessages = $('.form-messages');

  function sendContact() {
    var formData = $(form).serialize();
    var valid;
    valid = validateContact();
    if (valid) {
      jQuery.ajax({
          url: $(form).attr('action'),
          data: formData,
          type: "POST"
        })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          formMessages.removeClass('error');
          formMessages.addClass('success');
          // Set the message text.
          formMessages.text(response);
          // Clear the form.
          $(form + ' input:not([type="submit"]),' + form + ' textarea').val('');
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass('success');
          formMessages.addClass('error');
          // Set the message text.
          if (data.responseText !== '') {
            formMessages.html(data.responseText);
          } else {
            formMessages.html('Oops! An error occured and your message could not be sent.');
          }
        });
    };
  };

  function validateContact() {
    var valid = true;
    var formInput;

    function unvalid($validation) {
      $validation = $validation.split(',')
      for (var i = 0; i < $validation.length; i++) {
        formInput = form + ' ' + $validation[i];
        if (!$(formInput).val()) {
          $(formInput).addClass(invalidCls)
          valid = false;
        } else {
          $(formInput).removeClass(invalidCls)
          valid = true;
        };
      };
    };
    unvalid($validation);

    if (!$($email).val() || !$($email).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
      $($email).addClass(invalidCls)
      valid = false;
    } else {
      $($email).removeClass(invalidCls)
      valid = true;
    };
    return valid;
  };

  $(form).on('submit', function (element) {
    element.preventDefault();
    sendContact();
  });

  if ($(".ajax-booking").length > 0) {
    var form = ".ajax-booking";
    var $email = '[name="email"]';
    var invalidCls = "is-invalid";
    var $validation =
    '[name="name"],[name="number"],[name="email"],[name="s-destination"],[name="e-destination"],[name="passenger"],[name="date"],[name="time"],[name="vehicle"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery
                .ajax({
                    url: $(form).attr("action"),
                    data: formData,
                    type: "POST",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                            ' input:not([type="submit"]),' +
                            form +
                            " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);
        if (!$($email).val() || !$($email).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
          $($email).addClass(invalidCls)
          valid = false;
        } else {
          $($email).removeClass(invalidCls)
          valid = true;
        };
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });
  }


  /*---------- 11. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on('click', function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on('click', function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox).find('form').on('click', function (e) {
      e.stopPropagation();
      $($searchBox).addClass($toggleCls);
    });
    $($searchCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  };
  popupSarchBox('.popup-search-box', '.searchBoxToggler', '.searchClose', 'show');

    /*---------- 12. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
      // Sidebar Popup
      $($sideMunuOpen).on('click', function (e) {
          e.preventDefault();
          $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on('click', function (e) {
          e.stopPropagation();
          $($sideMenu).removeClass($toggleCls)
      });
      var sideMenuChild = $sideMenu + ' > div';
      $(sideMenuChild).on('click', function (e) {
          e.stopPropagation();
          $($sideMenu).addClass($toggleCls)
      });
      $($sideMenuCls).on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          $($sideMenu).removeClass($toggleCls);
      });
  };
  popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');
  
/*---------- 12. Popup Sidemenu ----------*/
function popupSideMenu($sideMenu2, $sideMunuOpen2, $sideMenuCls2, $toggleCls2) {
  // Sidebar Popup
  $($sideMunuOpen2).on('click', function (e) {
      e.preventDefault();
      $($sideMenu2).addClass($toggleCls2);
  });
  $($sideMenu2).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu2).removeClass($toggleCls2)
  });
  var sideMenuChild = $sideMenu2 + ' > div';
  $(sideMenuChild).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu2).addClass($toggleCls2)
  });
  $($sideMenuCls2).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu2).removeClass($toggleCls2);
  });
};
popupSideMenu('.shopping-cart', '.sideMenuToggler2', '.sideMenuCls', 'show'); 


  /*----------- 12. Magnific Popup ----------*/
  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  /* magnificPopup video view */
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });

  /* magnificPopup content view */
  $('.popup-content').magnificPopup({
    type: 'inline',
    midClick: true,
  });

  /*----------- 13. Filter ----------*/
  $('.filter-active').imagesLoaded(function () {
    var $filter = '.filter-active',
      $filterItem = '.filter-item',
      $filterMenu = '.filter-menu-active';

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1
        }
      });

      // filter items on button click
      $($filterMenu).on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
      });

      // Menu Active Class 
      $($filterMenu).on('click', 'button', function (event) {
        event.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.active').removeClass('active');
      });
    };
  });


  // Active specifix
  $('.filter-active-cat1').imagesLoaded(function () {
    var $filter = '.filter-active-cat1',
      $filterItem = '.filter-item',
      $filterMenu = '.filter-menu-active';

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '.cat1',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1
        }
      });

      // filter items on button click
      $($filterMenu).on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
      });

      // Menu Active Class 
      $($filterMenu).on('click', 'button', function (event) {
        event.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.active').removeClass('active');
      });
    };
  });

  /*----------- 14. Date Time Picker ----------*/
  // Only Date Picker
  $('.date-pick').datetimepicker({
    timepicker: false,
    datepicker: true,
    format: 'd-m-y',
    step: 10
  });

  // Only Time Picker
  $('.time-pick').datetimepicker({
    datepicker:false,
    format:'H:i',
    step:30
  });

     //======wow js======= 
     new WOW().init();


  /*----------- 15. Counter Up ----------*/ 
  $('.counter-number').counterUp({
    delay: 10,
    time: 1000
  });

  /*---------- 16. VS Tab ----------*/


  // Call On Load


  /*----------- 17. Progress Bar Animation ----------*/
  $('.progress-bar').waypoint(function() {
    $('.progress-bar').css({
    animation: "animate-positive 1.8s",
    opacity: "1"
    });
  }, { offset: '75%' });

  /*---------- 18. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10)
  }

  $.fn.sectionPosition = function (mainAttr, posAttr) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posData = section.attr(mainAttr), // where to position
          posFor = section.attr(posAttr), // On Which section is for positioning  
          topMark = 'top-half', // Pos top
          bottomMark = 'bottom-half', // Pos Bottom
          parentPT = convertInteger($(posFor).css('padding-top')), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css('padding-bottom')); // Default Padding of  parent

        if (posData === topMark) {
          $(posFor).css('padding-bottom', parentPB + sectionHeight + 'px');
          section.css('margin-top', "-" + sectionHeight + 'px');
        } else if (posData === bottomMark) {
          $(posFor).css('padding-top', parentPT + sectionHeight + 'px');
          section.css('margin-bottom', "-" + sectionHeight + 'px');
        }
      }
      setPosition(); // Set Padding On Load
    })
  }

  var postionHandler = '[data-sec-pos]';
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function () {
      $(postionHandler).sectionPosition('data-sec-pos', 'data-pos-for');
    });
  }

  /*----------- 19. Shape Mockup ----------*/ 


  // Set position when click on bootstrap Tab
  $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    $('.th-carousel').slick('setPosition');
  })

    /*----------- 00. Woocommerce Toggle ----------*/
    // Ship To Different Address
    $("#ship-to-different-address-checkbox").on("change", function () {
      if ($(this).is(":checked")) {
          $("#ship-to-different-address")
              .next(".shipping_address")
              .slideDown();
      } else {
          $("#ship-to-different-address").next(".shipping_address").slideUp();
      }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function (e) {
      e.preventDefault();
      $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
      e.preventDefault();
      $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function (e) {
      e.preventDefault();
      $(this).next(".shipping-calculator-form").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
      .siblings(".payment_box")
      .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
      $(this).on("change", function () {
          $(".payment_box").slideUp();
          $(this).siblings(".payment_box").slideDown();
      });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function () {
      $(this).on("click", function (e) {
          e.preventDefault();
          $(this).siblings().removeClass("active");
          $(this).parent().parent().addClass("selected");
          $(this).addClass("active");
      });
  });

    // Quantity Plus Minus ---------------------------/
    $(document).on('click', '.quantity-plus, .quantity-minus', function (e) {
      e.preventDefault();
      // Get current quantity values
      var qty = $(this).closest('.quantity, .product-quantity').find('.qty-input');
      var val = parseFloat(qty.val());
      var max = parseFloat(qty.attr('max'));
      var min = parseFloat(qty.attr('min'));
      var step = parseFloat(qty.attr('step'));

      // Change the value if plus or minus
      if ($(this).is('.quantity-plus')) {
          if (max && (max <= val)) {
              qty.val(max);
          } else {
              qty.val(val + step);
          }
      } else {
          if (min && (min >= val)) {
              qty.val(min);
          } else if (val > 0) {
              qty.val(val - step);
          }
      }
      $('.cart_table button[name="update_cart"]').prop('disabled', false);
  });

   /*----------- Blog Post Gallery Slider ----------*/
   $('.th-blog-carousel ').slick({
    dots: false,
    infinite: true, 
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    // prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-arrow-left"></i></button>',
    // nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-arrow-right"></i></button>',
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 992,
        settings: {
            slidesToShow: 1,
            arrows: false,
        }
    }]
});

/*----------- 15. Search Masonary ----------*/
$('.search-active').imagesLoaded(function () {
    var $filter = '.search-active',
    $filterItem = '.filter-item';

    if ($($filter).length > 0) {
    var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '*',
        // masonry: {
        // // use outer width of grid-sizer for columnWidth
        //     columnWidth: 1
        // }
    });
    };
});

//Product Slider for single product
$('.product-img-slider').slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
});

 // Related Product Slider 
 $('.related-products-carousel').slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                arrows: false,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                arrows: false,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                arrows: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                arrows: false,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                arrows: false,
            }
        }
    ]
});


// /*----------- 00. Right Click Disable ----------*/
//   window.addEventListener('contextmenu', function (e) {
//     // do something here... 
//     e.preventDefault();
//   }, false);


// /*----------- 00. Inspect Element Disable ----------*/
//   document.onkeydown = function (e) {
//     if (event.keyCode == 123) {
//       return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//       return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//       return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//       return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//       return false;
//     }
//   }
 
})(jQuery);