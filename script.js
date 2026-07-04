(function(){
  "use strict";

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('menuToggle');
  var closeBtn = document.getElementById('menuClose');
  var overlay = document.getElementById('mobileNav');

  function openNav(){
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav(){
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  if(toggle){ toggle.addEventListener('click', openNav); }
  if(closeBtn){ closeBtn.addEventListener('click', closeNav); }
  overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });

  /* ---------- Embers (hero ambient particles) ---------- */
  var embersHost = document.getElementById('embers');
  if(embersHost && !reducedMotion){
    var count = window.innerWidth < 700 ? 10 : 18;
    for(var i=0;i<count;i++){
      var e = document.createElement('span');
      var left = Math.random()*100;
      var delay = Math.random()*7;
      var duration = 6 + Math.random()*4;
      var drift = (Math.random()*80-40) + 'px';
      e.style.left = left + '%';
      e.style.animationDelay = delay + 's';
      e.style.animationDuration = duration + 's';
      e.style.setProperty('--drift', drift);
      embersHost.appendChild(e);
    }
  }

  /* ---------- Grill ticker ---------- */
  var tickerMessages = [
    "Turkana goat ribs, 40 min in",
    "Coastal tilapia, wrapped and steaming",
    "Charcoal chicken, first turn done",
    "Beef skewers, 6 minutes to plate"
  ];
  var tickerEl = document.getElementById('tickerText');
  if(tickerEl){
    var tIndex = 0;
    setInterval(function(){
      tIndex = (tIndex+1) % tickerMessages.length;
      tickerEl.style.opacity = 0;
      setTimeout(function(){
        tickerEl.textContent = tickerMessages[tIndex];
        tickerEl.style.opacity = 1;
      }, 250);
    }, 5000);
    tickerEl.style.transition = 'opacity .25s ease';
  }

  /* ---------- Menu tabs ---------- */
  var tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.setAttribute('aria-selected','false'); });
      tab.setAttribute('aria-selected','true');
      document.querySelectorAll('.menu-panel').forEach(function(p){ p.classList.remove('active'); });
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      if(panel){ panel.classList.add('active'); }
    });
  });

  /* ---------- Reservation form ---------- */
  var guestCount = document.getElementById('guestCount');
  var guestVal = document.getElementById('rGuestsVal');
  var stepUp = document.getElementById('stepUp');
  var stepDown = document.getElementById('stepDown');
  var count = 2;
  function renderGuests(){ guestCount.textContent = count; guestVal.value = count; }
  if(stepUp){
    stepUp.addEventListener('click', function(){ if(count < 20){ count++; renderGuests(); } });
    stepDown.addEventListener('click', function(){ if(count > 1){ count--; renderGuests(); } });
  }

  var resForm = document.getElementById('resForm');
  var resStatus = document.getElementById('resStatus');
  if(resForm){
    resForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      if(!resForm.checkValidity()){ resForm.reportValidity(); return; }

      var name = document.getElementById('rName').value.trim();
      var phone = document.getElementById('rPhone').value.trim();
      var date = document.getElementById('rDate').value;
      var time = document.getElementById('rTime').value;
      var occasion = document.getElementById('rOccasion').value;
      var notes = document.getElementById('rNotes').value.trim();

      resStatus.classList.add('show');
      resStatus.textContent = 'Sent — we\'ll confirm on WhatsApp shortly.';

      var msg = "Hi Jiko Roots, I'd like to reserve a table.\n" +
        "Name: " + name + "\n" +
        "Party size: " + count + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time +
        (occasion ? ("\nOccasion: " + occasion) : "") +
        (notes ? ("\nNotes: " + notes) : "") +
        "\nPhone: " + phone;

      setTimeout(function(){
        window.open("https://wa.me/254700000000?text=" + encodeURIComponent(msg), "_blank", "noopener");
      }, 600);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!expanded));
      if(!expanded){
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = 0;
      }
    });
  });

  /* ---------- Newsletter ---------- */
  var newsForm = document.getElementById('newsForm');
  var newsSuccess = document.getElementById('newsSuccess');
  if(newsForm){
    newsForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      if(!newsForm.checkValidity()){ newsForm.reportValidity(); return; }
      newsSuccess.classList.add('show');
      newsForm.reset();
    });
  }
  var footerNews = document.getElementById('footerNews');
  if(footerNews){
    footerNews.addEventListener('click', function(ev){
      ev.preventDefault();
      var target = document.getElementById('newsEmail');
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
      target.focus();
    });
  }

  /* ---------- Gift card denominations ---------- */
  var denoms = document.querySelectorAll('#giftDenoms .denom');
  denoms.forEach(function(d){
    d.addEventListener('click', function(){
      denoms.forEach(function(o){ o.setAttribute('data-active','false'); });
      d.setAttribute('data-active','true');
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reducedMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Floating WhatsApp button ---------- */
  var floatWa = document.getElementById('floatWa');
  var heroSection = document.querySelector('.hero');
  if(floatWa && heroSection){
    var heroHeight = heroSection.offsetHeight;
    window.addEventListener('scroll', function(){
      if(window.scrollY > heroHeight * 0.6){ floatWa.classList.add('show'); }
      else { floatWa.classList.remove('show'); }
    }, { passive:true });
  }

})();