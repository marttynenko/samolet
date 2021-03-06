$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//?????????????????? ??????????????????, ????????????????????????????
jQuery.extend(jQuery.validator.messages, {
  required: "???????????????????????? ????????",
  email: "???????????????????????? email",
  url: "???????????????????????? URL",
  number: "???????????????????????? ??????????",
  digits: "?????? ???????? ???????????????????????? ???????????? ??????????",
  equalTo: "???????? ???? ??????????????????",
  maxlength: jQuery.validator.format('???????????????????????? ?????????? ???????? {0} ??????????????(????)'),
  minlength: jQuery.validator.format('?????????????????????? ?????????? ???????? {0} ??????????????(????)'),
  require_from_group: jQuery.validator.format('???????????????? ???????????????? {0} ???? ???????? ??????????')
});
//?????????????????? ???????????? ????????????????????
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-Z??-????-??\s]+$/i.test(value);
}, "???????????? ??????????");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "???????????????????????? ????????????"); 



const FARBA = {
	galleryCurrentIndex: 0,

	//?????????????? ?????? ?????????????????????? ?????????????????????? ??????????
	backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.ui-backgrounded-bg').attr('src');
			if($this.find('.ui-backgrounded-bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	},

	//lazy load ?????? ?????????????????? ??????
	lazyLibraryLoad(scriptSrc,linkHref,callback) {
		let script
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`)

    if (!domScript) {
      script = document.createElement('script');
      script.src = scriptSrc;
      document.querySelector('#wrapper').after(script);
    }
		
	
		if (linkHref !== '') {
			let style = document.createElement('link');
			style.href = linkHref;
			style.rel = 'stylesheet';
			document.querySelector('link').before(style);
		}
    
    if (!domScript) {
      script.onload = callback
    } else {
      domScript.onload = callback
    }
	}
}


jQuery(document).ready(function($){
	if ($('.gifts-slick-slide').length > 1) {
		$('.gifts-slick').slick({
			dots: true,
			arrows: false,
			adaptiveHeight: true
		})
	}


	const swiperPodcasts = new Swiper(".podcasts-slider", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		loop: true,
		slidesPerView: "auto",
		coverflowEffect: {
			rotate: 0,
			stretch: 100,
			depth: 100,
			scale: 0.85,
			modifier: 1,
			slideShadows: false,
		},
		navigation: {
			nextEl: ".podcasts-slider-next",
			prevEl: ".podcasts-slider-prev",
		}
	});


	swiperPodcasts.on('slideChange', function () {
		$(".podcasts-slider iframe").remove();
	});


	$(document).on('click','.podcasts-card-play',function(e){
		e.preventDefault();
		const id = $(this).attr('data-video') || null;
		const card = $(this).closest('.podcasts-card');

		if (id) {
			card.append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" autoplay="1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
		}
	})


	//?????????????????????????? MFP popup ?????? ????????
	$(document).on('click','.mfp-link',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 800,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Error. Not valid url',
			},
			callbacks: {
				ajaxContentAdded: function () {
					setTimeout(function(){
						$('.mfp-wrap, .mfp-bg').addClass('not_delay');
						$('.mfp-popup').addClass('not_delay');
					},700);
				}
			}
		});
		return false;
	});

	
	$(document).on('click','.ui-video-play',function(e){
		e.preventDefault();
		const video = $(this).prev('video').get(0) || null;
		if (video) {
			video.controls = true
			video.play()
			$(this).remove()
		}
		return false;
	})


	$(document).on('change','.ui-uploader input',function(e){
		const previews = $(this).parent('.ui-uploader').next('.ui-uploader-previews');
		if (e.target.files.length) {
			previews.html('<strong>?????????????????? ??????????: </strong>'+fileParser(e.target.files))
		} else {
			previews.html('')
		}
	})

	function fileParser(files) {
		if (!files.length) return
		let output = ''
		for (let i=0; i<files.length; i++) {
			output += `<div class="ui-uploader-preview">
				<span class="ui-uploader-preview-name">${files[i].name}</span>
				<span class="ui-uploader-preview-size">????????????: <strong>${(files[i].size / 1024 / 1024).toFixed(2)} Mb</strong></span>
			</div>`
		}
		return output
	}

	
	$(document).on('click','.mfp-gallery',function(e){
		e.preventDefault()
		const _this = $(this)

		$.magnificPopup.open({
			items: { src: _this.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 800,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Error. Not valid url',
			},
			callbacks: {
				ajaxContentAdded: function () {
					setTimeout(function(){
						$('.mfp-wrap, .mfp-bg').addClass('not_delay');
						$('.mfp-popup').addClass('not_delay');
					},700);
				}
			}
		})

		FARBA.galleryCurrentIndex = $(this).closest('.col-us-6').index()
		console.log(FARBA.galleryCurrentIndex)
	});


	$('header#header .navigation').after('<div class="mm-toggler" onclick=""><div class="mm-1"></div><div class="mm-2"></div><div class="mm-3"></div></div>')

	$(document).on('click','.mm-toggler',function(e){
		e.preventDefault()
		$('header#header').toggleClass('nav-opened');
		$(this).toggleClass('opened');
	})
	

});//ready close