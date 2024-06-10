

$(document).ready(function() {
    let vw = $(window).width();

    //nav trigger
    var navOpnFlg = 0;
    $(".hamburger").on('click', function() {
        if (navOpnFlg == 0) {
            TweenMax.to($(this).find('li:eq(0)'), 0.3, { rotation: -45, y: 9 });
            TweenMax.to($(this).find('li:eq(1)'), 0.3, { opacity: 0 });
            TweenMax.to($(this).find('li:eq(2)'), 0.3, { rotation: 45, y: -9 });
            $('.main-header').addClass('ham-active');
            $(".main-header .main-menu").addClass('active');
            navOpnFlg = 1;
        } else {
            TweenMax.to($(this).find('li:eq(0)'), 0.3, { rotation: 0, y: 0 });
            TweenMax.to($(this).find('li:eq(1)'), 0.3, { opacity: 1 });
            TweenMax.to($(this).find('li:eq(2)'), 0.3, { rotation: 0, y: 0 });
            $('.main-header').removeClass('ham-active');
            $(".main-header .main-menu").removeClass('active');
            navOpnFlg = 0;
        }
        $('html, body').toggleClass('lock-scroll');
    });

    

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.main-header').outerHeight();

    $(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > 50) {
            $('.main-header').addClass('solid');
        } else {
            $('.main-header').removeClass('solid');
        }

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('.main-header').addClass('nav-up');
            // $('.filter-wrap, .course-content-wrap .sub-nav-wrap, .filter-wrap-mobile').removeClass('push-down');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('.main-header').removeClass('nav-up');
                // $('.filter-wrap, .course-content-wrap .sub-nav-wrap, .filter-wrap-mobile').addClass('push-down');
            }
        }

        lastScrollTop = st;
    }



    $(".search-wrap input").focus(function() { 
                $('.popular-search').slideDown();
        //return false;
      });
      
    
   $('.search-wrap input').blur(function(){
      if( !$(this).val() ) {
        $('.popular-search').slideUp(); 
      }
  });
  
  $(".mid-levl-footer .icon").click(function() { 
    $(this).toggleClass("active")
    $('.mid-levl-footer .container').slideToggle();
    //return false;
    });
    //Mobile Menu script
    if(vw<969){
        $(".main-menu .has-child > a").click(function() {
            $(this).next(".mega-menu").slideToggle();
            $(this).parent().siblings(".has-child").find(".mega-menu:visible").slideUp()
            $(this).parent().toggleClass("active");
            $(this).parent().siblings(".has-child").removeClass("active");
        });
        $(".close-menu").click(function() {
            $(".main-menu").removeClass("active");
        });

        //Mobile search script


        $('.search-icon img').click(function() {
            $(".search-holder").toggleClass("active");
        });
        $('.close-icon').click(function() {
            $(".search-holder").removeClass("active");
        });


        $('.ftr-block h3').on('click', function() {
            $(".ftr-block ul").slideUp();
            $(this).next("ul").slideToggle();
            $(".ftr-block h3").removeClass("active");
            $(this).addClass("active");
        });
    }


    // like btn
    $('.like').click(function() {
        $(this).toggleClass("active");
        });
    
    // filter panel show
    $('.filter h3').click(function() {
        $(this).toggleClass("active");
        $(this).next("ul").slideToggle();
    });

//filter panel show mobile
$('.filter-tab').click(function() {
    $(".filters").toggleClass("active");
});

//tabs
    var activeIndex = $('.active-tab').index(),
        $contentlis = $('.tabs-content > li'),
        $tabslis = $('.tabs > li');
    
    // Show content of active tab on loads
    $contentlis.eq(activeIndex).show();
    $('.tabs').on('click', 'li', function (e) {
      var $current = $(e.currentTarget),
          index = $current.index();
      
        $tabslis.removeClass('active-tab');
        $current.addClass('active-tab');
        $contentlis.hide().eq(index).show();
        $('.ancillary-cont').flickity({
            wrapAround: false, 
            pageDots: true, 
            prevNextButtons: false, 
            cellAlign: "left", 
            groupCells: true, 
            contain: true,
            imagesLoaded: true
        });
    });
    
    //Accordion script 
    $(".accr-wrap .head").click(function(){
		$(this).next(".content").slideToggle().siblings(".content:visible").slideUp();
		$(this).toggleClass("active");
        $(this).siblings(".head").removeClass("active");
	});
//select box styling

(function()
{
   var _class = "FormSelect"; 
   
   // check env 
   if( !window || window[ _class ] ) return; 

   // class 
   window[ _class ] = function( parent, options ) 
   {
      this._parent    = parent; 
      this._options   = options; 
      this._list      = document.createElement( "ul" );
      this._input     = null; 
      this._select    = null; 
      this._index     = 0; 
      this._onClick   = this._onClick.bind( this ); 
      this._onDone    = this._onDone.bind( this ); 
      this._setActive = this._setActive.bind( this ); 
      this._init(); 
   }; 
   
   // prototype
   window[ _class ].prototype = {
      constructor: window[ _class ],
       
      // init class on a container 
      _init: function()
      {
         if( typeof this._parent === "object" )
         {
            this._input  = this._parent.querySelector( "input" );
            this._select = this._parent.querySelector( "select" );
            this._index  = this._select.selectedIndex || 0;

            if( this._input && this._select )
            {
               for( var i=0; i < this._select.options.length; ++i )
               {
                  var li = document.createElement( "li" );
                  li.setAttribute( "data-index", i );
                  li.addEventListener( "click", this._onClick );
                  li.innerHTML = this._select.options[ i ].innerHTML || "...";
                  li.className = ( this._index === i ) ? "active" : "";
                  this._list.appendChild( li );
               }
               this._parent.appendChild( this._list );
               this._setActive(); 
            }
         }
      }, 
      
      // on list item click 
      _onClick: function( e )
      {
         this._index = e.target.getAttribute( "data-index" ) || 0;
         this._setActive( this._index );
         setTimeout( this._onDone, 60 ); 
      }, 
      
      // close select menu 
      _onDone: function()
      {
         this._parent.blur(); 
         this._input.blur(); 
      }, 
      
      // set new active menu item by index
      _setActive: function( index )
      {
         index = ( index || index === 0 ) ? index : this._select.selectedIndex;

         var active = this._list.querySelector( ".active" );
         if( active ) active.className = "";

         this._select.selectedIndex = index;
         this._input.value = this._select.options[ index ].innerHTML || "";
         this._list.children[ index ].className = "active";
      },
   }; 
   
})();

/**
 * Usage 
 */
var items = document.querySelectorAll( "form .select" ); 

for( var i = 0; i < items.length; i++ ) 
{
   new FormSelect( items[ i ] ); 
}








    $("#trigger").trigger('click');

    //Signup show hide password icon
    $('.eye-hidden').on('click', function(){
        $(this).hide();
        $('.eye-visible').show();
        $('.login-password').attr('type', 'text');
    });
    $('.eye-visible').on('click', function(){
        $(this).hide();
        $('.eye-hidden').show();
        $('.login-password').attr('type', 'password');
    });

    $('#open-login-form').on('click', function(){
        $('.login-signup-popup-wrap .right-content .bind').addClass('no-display');
        $('#login-form').removeClass('no-display');
    });
    $('#open-signup-form').on('click', function(){
        $('.login-signup-popup-wrap .right-content .bind').addClass('no-display');
        $('#signup-form').removeClass('no-display');
    });
    $('#open-login-signup-popup').on('click', function(){
        $('.login-signup-popup-wrap').fadeIn();
    });
    $('.login-signup-popup-wrap .close').on('click', function(){
        $('.login-signup-popup-wrap').fadeOut();
    });


    var UpBtn = document.querySelector(".file-up-btn");
var UpOrgBtn = document.querySelector(".file-up");
UpBtn.addEventListener("click", () => {
  UpOrgBtn.click();
});
UpOrgBtn.addEventListener("change", (e) => {
  UpBtn.innerHTML = UpOrgBtn.files[0].name;
  UpBtn.classList.add("uploaded");
  let fsize = UpOrgBtn.files[0].size;
  if (fsize > 2000000) {
    e.preventDefault();
    UpBtn.innerHTML = "maximum filesize should upder 2MB ";
  }
});


  });//end
  