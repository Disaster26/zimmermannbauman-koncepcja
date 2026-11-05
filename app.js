(function(){
  var top=document.getElementById('top');
  var burger=document.getElementById('burger');
  var nav=document.getElementById('nav');
  function closeNav(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu')}
  burger.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');
  });
  nav.addEventListener('click',function(e){if(e.target.closest('a'))closeNav()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeNav()});

  function onScroll(){top.classList.toggle('scrolled',window.scrollY>4)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // dolny pasek na telefonie: dopiero po przewinięciu za przyciski z hero, chowany przy formularzu
  var mob=document.getElementById('mob');
  var cta=document.getElementById('heroCta');
  var form=document.getElementById('kontakt');
  var pastCta=false,atForm=false;
  function upd(){
    var show=pastCta&&!atForm;
    mob.classList.toggle('widac',show);
    mob.setAttribute('aria-hidden',show?'false':'true');
    mob.querySelectorAll('a').forEach(function(a){a.tabIndex=show?0:-1});
  }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){
      var e=en[0];pastCta=!e.isIntersecting&&e.boundingClientRect.top<0;upd();
    }).observe(cta);
    new IntersectionObserver(function(en){atForm=en[0].isIntersecting;upd()},{threshold:0.15}).observe(form);
  }

  // formularz w podglądzie: bez wysyłki
  var f=document.getElementById('form'),msg=document.getElementById('formMsg');
  f.addEventListener('submit',function(e){e.preventDefault();msg.hidden=false});
})();
