(function(){
  var top=document.getElementById('top'),burger=document.getElementById('burger'),nav=document.getElementById('nav');
  function setNav(open){
    nav.classList.toggle('open',open);top.classList.toggle('menu-open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');
  }
  burger.addEventListener('click',function(){setNav(!nav.classList.contains('open'))});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))setNav(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setNav(false)});

  var mob=document.getElementById('mob'),cta=document.getElementById('heroCta'),form=document.getElementById('kontakt');
  var pastCta=false,atForm=false;
  function upd(){
    var show=pastCta&&!atForm;
    mob.classList.toggle('widac',show);
    mob.setAttribute('aria-hidden',show?'false':'true');
    mob.querySelectorAll('a').forEach(function(a){a.tabIndex=show?0:-1});
  }
  if('IntersectionObserver' in window){
    // nagłówek ciemnieje po zjechaniu z góry hero; pasek na dole po minięciu przycisków hero
    var sentinel=document.createElement('div');
    sentinel.style.cssText='position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none';
    document.body.prepend(sentinel);
    new IntersectionObserver(function(en){top.classList.toggle('scrolled',!en[0].isIntersecting)}).observe(sentinel);
    new IntersectionObserver(function(en){var e=en[0];pastCta=!e.isIntersecting&&e.boundingClientRect.top<0;upd()}).observe(cta);
    new IntersectionObserver(function(en){atForm=en[0].isIntersecting;upd()},{threshold:0.1}).observe(form);
  }

  var f=document.getElementById('form'),msg=document.getElementById('formMsg');
  f.addEventListener('submit',function(e){e.preventDefault();msg.hidden=false});
})();
