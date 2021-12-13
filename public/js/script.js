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
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 



const FARBA = {
	//функция для навешивания изображений фоном
	backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.ui-backgrounded-bg').attr('src');
			if($this.find('.ui-backgrounded-bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	},

	//lazy load для сторонних либ
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


const Store = {
	files: [],
	removeFile: function(index) {
	  this.files.splice(index, 1);
	},
	addFiles: function(files) {
	  this.files = this.files.concat(files);
	},
	readURL: function(e,input,block) {
		const that = this;
		if (!e.target.files.length) { return }
	  const files = Object.keys(e.target.files).map((i) => e.target.files[i]);
	  that.addFiles(files);

	  for (var i = 0; i < that.files.length; i++) {
			var reader = new FileReader();
			$(block).find('.ui-files-preview').remove();
			reader.onload = function (e) {
				var image = document.createElement('img');
				var span = document.createElement('span');
				image.setAttribute('src',e.target.result);
				span.setAttribute('class','ui-files-preview');
				span.setAttribute('data-index',i);
				span.appendChild(image);
				$(span).append('<i class="ui-files-preview-delete"></i>');
				$(block).append(span);
			};
			reader.readAsDataURL(that.files[i]);
		}
	  e.target.value = '';
	},
	generateFormData: function(formData) {
		// const formData = new FormData();
		this.files.map((file, index) => {
				formData.append(`file${index + 1}`, file);
		});
		// return formData;
	}
}


jQuery(document).ready(function($){
	$('.gifts-slick').slick({
		dots: true,
		arrows: false
	})


	


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


	$(document).on('click','.podcasts-card-play',function(e){
		e.preventDefault();
		const src = $(this).attr('data-source') || null;
		const player = $('#podcasts_audio').get(0);

		if (src) {
			player.src = src
			// player.play()
			
			if ($(this).hasClass('playing')) {
				player.pause()
				$(this).removeClass('playing')
			} else {
				player.play()
				$(this).addClass('playing')
			}
		}
	})


	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	//инициализация MFP popup для форм
	$(document).on('click','.mfp-link',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Error. Not valid url',
			},
			callbacks: {
				ajaxContentAdded: function () {
					setTimeout(function(){
						$('.mfp-wrap, .mfp-bg').addClass('delay-back');
						$('.mfp-popup').addClass('delay-back');
					},700);
				}
			}
		});
		return false;
	});
	

});//ready close



if (document.querySelector('.ux-share')) {
	FARBA.lazyLibraryLoad(
		'//yastatic.net/share2/share.js',
		'',
		() => {
			var myShare = document.querySelector('.ux-share')
			var share = Ya.share2(myShare)
		}
	)
}