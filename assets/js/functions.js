$( document ).ready(function() {
  $('.proj-voltar').removeClass('noscript');

  $(function() {
    smoothScroll(500);
    projBox();
    projLoad();
    clientSwitch();
  });

  //$('')

  //smoothScroll
  function smoothScroll(duration){
    $('a[href^="#"]').on('click', function(event){

      var target = $($(this).attr('href'));

      if(target.length){
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, duration);
      }
    });
  }


  function projBox(){
    $('.thumb-container .item').click(function(ev){
      ev.preventDefault();
      $('.proj-box').css('left','-100%');
      $('.proj-container').show();
    });

    $('.proj-voltar').click(function(ev){
      ev.preventDefault();
      $('.proj-box').css({'left': '0%'});
      $('.proj-container').hide(800);
    });
  }//ends projBox

  function projLoad(){
    //We will enable cache because our site is not dynamic
    //$.ajaxSetup({ cache:true });

    $('.thumb-container .item').click(function(){

      var $this = $(this),
          spinner = '<div class="loader">Carregando...</div>',
          novoTitle = $this.find('strong').text(),
          projIndex = $this.data('index');
          novoHTML = '../../projetos/proj-' + projIndex + '.html';

      $('.proj-load').html(spinner).load(novoHTML);
      $('.proj-title').text(novoTitle);
    });
  }

  function clientSwitch(){
    //This is a workaround to switch the client to be displayed
    //eq(0) == first()
    $('.cliente').eq(0).addClass('ativo');
    $('.cliente-logo').eq(0).addClass('ativo');
    $('.clientes-mobile-nav span').first().addClass('ativo');

    $('.cliente-logo, .clientes-mobile-nav span').click(function(){

      var $this = $(this),
          $siblings = $this.parent().children(),
          position = $siblings.index($this);

      $('.cliente').removeClass('ativo').eq(position).addClass('ativo');
      $('.cliente-logo').removeClass('ativo').eq(position).addClass('ativo');
      $siblings.removeClass('ativo').eq(position).addClass('ativo');
    });

    $('.clientes-box-controls .anterior, .clientes-box-controls .proximo').click(function(){

      var $this = $(this),
          clienteAtivo = $('.clientes-box .cliente.ativo'),
          position = $('.clientes-box .cliente').index(clienteAtivo),
          logoAtiva = $(' .clientes-logo .ativo'),
          clientNum = $('.clientes-box .cliente').length;

      if($this.hasClass('proximo')){
        if(position < clientNum-1){
          clienteAtivo.removeClass('ativo').next().addClass('ativo');
          logoAtiva.removeClass('ativo').next().addClass('ativo');
      }else{
        $('.clientes-box .cliente').removeClass('ativo').first().addClass('ativo');
        $('.cliente-logo').removeClass('ativo').first().addClass('ativo');
      }
    }else{
      if(position === 0){
        $('.clientes-box .cliente').removeClass('ativo').last().addClass('ativo');
        $('.cliente-logo').removeClass('ativo').last().addClass('ativo');
      }else{
        clienteAtivo.removeClass('ativo').prev().addClass('ativo');
        logoAtiva.removeClass('ativo').prev().addClass('ativo');
      }
    }

    });
  }//ends the client switch function

  $("h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
});

/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
