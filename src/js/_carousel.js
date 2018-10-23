// *
// * Slideshow da entrada da escola
// * Ref.: http://codepen.io/leemark/pen/DLgbr
// *
if (!!document.querySelector(".pagelayout-frontpage")) {
  var contador    = 0, itemAtivo,
      intervalo   = 10000, intervaloRepetido, intervaloUnico,
      controles   = document.querySelectorAll("#slider-content ul.controles li"),
      slides      = document.querySelectorAll("#slider figure"), // Todos os slides
      totalSlides = slides.length, // Numero total de slides
      mudaSlide   = function() { // Funcao que controla a mudanca de slide
        // Remove a classe 'ativo' de todo elemento que a tiver
        // Ref.: http://stackoverflow.com/a/16053538/2006057
        [].forEach.call(slides, function(el) {
          el.classList.remove("ativo");
        });
        [].forEach.call(controles, function(el) {
          el.classList.remove("ativo");
        });
        // Pega o indice do slide a mostrar
        itemAtivo = Math.abs(contador%totalSlides);
        // Adiciona a classe 'ativo' ao item ativo
        slides[itemAtivo].classList.add("ativo");
        controles[itemAtivo].classList.add("ativo");
      },
      avancaSlide  = function() {
        contador++;
        mudaSlide();
      },
      voltaSlide   = function() {
        contador--;
        mudaSlide();
      },
      ligaSlider   = function() {
        intervaloRepetido = window.setInterval(avancaSlide, intervalo);
      },
      religaSlider = function() {
        intervaloUnico = window.setTimeout(ligaSlider, intervalo);
      },
      desligaSlider = function() {
        window.clearInterval(intervaloRepetido);
        window.clearTimeout(intervaloUnico);
      };
  // Define as acoes dos botoes
  document.querySelector(".anterior").onclick = function() {
    desligaSlider();
    voltaSlide();
    religaSlider();
  };
  document.querySelector(".proximo").onclick = function() {
    desligaSlider();
    avancaSlide();
    religaSlider();
  };
  // Programa os cliques nos controles
  [].forEach.call(controles, function(el, i) {
    el.onclick = function() {
      contador = i;
      desligaSlider();
      mudaSlide();
      religaSlider();
    };
  });
  // Inicia o slideshow
  ligaSlider();
}