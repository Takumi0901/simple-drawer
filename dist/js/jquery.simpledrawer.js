(function($) {

	$.simpleDrawer = function(el, option){
	    this.defaults = {
	    	btn 			: '.simple-drawer-btn',
	    	bar 			: '.simple-drawer-fixed-bar',
	    	drawer_inner 	: '.simple-drawer-inner',
	    	overlay 		: '.simple-drawer-overlay',
	    	wrapper 		: '.simple-drawer-wrapper',
	        btnside 		: 'left',
	        drawerside 		: 'left',
	        fixed 			: true
	    };
	    this.setting = $.extend(this.defaults, option);

	    this.initialize(el);
	    this.handleEvents();

	    if(this.setting.fixed == true){
	    	this.fixedBarOnScroll();
	    }
		
	}
	$.extend($.simpleDrawer.prototype,{
        initialize : function(el){
        	this.$el = $(el);
        	this.$btn = $(this.setting.btn);
        	this.$fixed_bar = $(this.setting.bar);
        	this.$window = $(window);

        	this.start_pos = 0;

        	this.elementBtnSide();
        	this.elementDrawerSide();
        	this.drawerInnerHeight();
        	this.drawerPartsAppend();
        },

        handleEvents: function(){
        	var self = this;
		    this.$btn.on('touchstart click', function(){
		    	if(self.$el.hasClass('is-open')){
		            self.drawerSlideClose();
		            self.wrapperScrollOff();
		        }else{
		            self.drawerSlideOpen();
		            self.wrapperScrollOn();
		        }
		        return false;
		    });

		    this.$overlay.on('touchstart click', function(){
				self.drawerSlideClose();

				return false;
		    });		    	
        },
        drawerSlideOpen: function(){
	        this.$el.addClass('is-open');
	        this.$btn.addClass('is-open');
	        this.$overlay.addClass('is-fadein');
	        this.$fixed_bar.addClass('is-open');

		    return false;
		},

		drawerSlideClose: function(){
		    var self = this;

		    this.$el.removeClass('is-open');
		    this.$btn.removeClass('is-open');
		    this.$overlay.removeClass('is-fadein');

		    setTimeout(function(){
		        self.$fixed_bar.removeClass('is-open');
		    },300);

		    return false;
		},


		drawerInnerHeight: function(){
		    var $target = this.$el.children(this.setting.drawer_inner);
		    var $target_height = $target.height();
		    var $window_height = $(window).height();

		    if($window_height < $target_height){
		        $target.css('height', $window_height - 80);  
		    }
		},
		
		drawerPartsAppend: function(){
			var overlaySlice = this.setting.overlay.substr(1);
        	this.$overlayParts = '<div class="' + overlaySlice + ' c-drawer__overlay"></div>';

		    if($(this.setting.overlay).length <= 0){
		        $('body').append(this.$overlayParts);
		    }
		    this.$overlay = $(this.setting.overlay);
		},

		wrapperScrollOff: function(){
		    $(this.setting.wrapper).on('touchmove.noScroll', function(e) {
		        e.preventDefault();
		    });
		},

		wrapperScrollOn: function(){
		    $(this.setting.wrapper).off('.noScroll');
		},

		elementBtnSide: function(){
			if(this.setting.btnside == 'left'){
		    	this.$btn.addClass('is-left');

		    	return false;

		    }else if(this.setting.btnside == 'right'){
		    	this.$btn.addClass('is-right');

		    	return false;

		    }
		},

		elementDrawerSide: function(){
			if(this.setting.drawerside == 'left'){
		    	this.$el.addClass('is-left');

		    	return false;

		    }else if(this.setting.drawerside == 'right'){
		    	this.$el.addClass('is-right');

		    	return false;

		    }
		},


		fixedBarOnScroll: function(){
		    var self = this;
		    var _touch = ('ontouchstart' in document) ? 'touchmove' : 'scroll';

		    this.$window.on(_touch, function(){
		        var $current_pos = $(window).scrollTop();

		         // drawerが開いていたら動作しない
		        if(!self.$btn.hasClass('is-open')){
		            if($current_pos > 0){
		                if ($current_pos > self.start_pos) {
		                    self.fixedBarSlideOut();
		                }else{
		                    self.fixedBarSlideIn();
		                }
		            }else{
		                self.fixedBarSlideIn();
		            }
		            self.start_pos = $current_pos;   
		        }
		    });
		},

		fixedBarSlideIn: function(){
		    this.$fixed_bar.removeClass('is-slideout');
		},

		fixedBarSlideOut: function(){
		    this.$fixed_bar.addClass('is-slideout');
		}
    });
	$.fn.simpleDrawer = function(option) {
        return this.each(function() {
            new $.simpleDrawer(this, option);
        });
    };

})(jQuery);
