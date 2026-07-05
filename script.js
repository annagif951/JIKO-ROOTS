(function() {
    "use strict";

    // --------------------------------------------------------------
    //  IMAGE MAP – Replace these URLs with your own real photos.
    //  Using Unsplash Source with search terms to match descriptions.
    // --------------------------------------------------------------
   var imageMap = {
        // Hero
        hero: 'images.file/wood fixed grlled with flames.jpg',

        // Today's Special
        special: 'images.file/lamb chops.jpg',

        // Signature Dishes
        ribs: 'images.file/pexels-valeriya-8862752.jpg',
        tilapia: 'images.file/coastal tilapia.jpg',
        dawa: 'images.file/dawa sour.jpg',
        managu: 'images.file/managu and peanut crem.jpg',
        pineapple: 'images.file/grilled ineapple.jpg',

        // Gallery
        gallery1: 'images.file/wood fixed grlled with flames.jpg',
        gallery2: 'images.file/meat spices.jpg',
        gallery3: 'images.file/beef shewers.jpg',
        gallery4: 'images.file/turkana meat.jpg',
        gallery5: 'images.file/family dinner.jpg',
        gallery6: 'images.file/cocktail bar.jpg',
        gallery7: 'images.file/pple laughing.jpg',
        gallery8: 'images.file/chocolate desert.jpg',
        gallery9: 'images.file/charcaol grill line.jpg',

        // Menu items
        'menu-ribs': 'images.file/pexels-valeriya-8862752.jpg',
        'menu-nyama': 'images.file/meat spices.jpg',
        'menu-tilapia': 'images.file/coastal tilapia.jpg',
        'menu-chicken': 'images.file/charcoal chicken.jpg',
        'menu-suya': 'images.file/beef shewers.jpg',
        'menu-sukuma': 'images.file/kales.jpg',
        'menu-ugali': 'images.file/ugali.jpg',
        'menu-kachumbari': 'images.file/kachumbari.jpg',
        'menu-potato': 'images.file/rosted sweet potato.jpg',
        'menu-managu': 'images.file/managu and peanut crem.jpg',
        'menu-mbuzi': 'images.file/mbuzi.jpg',
        'menu-matoke': 'images.file/matoke.jpg',
        'menu-omena': 'images.file/omena.jpg',
        'menu-githeri': 'images.file/githeri.jpg',
        'menu-dawa': 'images.file/dawa sour.jpg',
        'menu-whiskey': 'images.file/whiskey.jpg',
        'menu-baobab': 'images.file/baobao.jpg',
        'menu-tusker': 'images.file/tusker.jpg',
        'menu-mandazi': 'images.file/mandazi.jpg',
        'menu-pineapple': 'images.file/grilled ineapple.jpg',
        'menu-mursik': 'images.file/sour drink 2.jpg',
    
        map: null
    };

    // Set all images with class "lazy-img" using their data-key
    var images = document.querySelectorAll('img.lazy-img');
    images.forEach(function(img) {
        var key = img.getAttribute('data-key');
        if (key && imageMap[key]) {
            img.src = imageMap[key];
        } else if (key === 'map') {
            // skip
        } else {
            img.src = 'https://source.unsplash.com/featured/?food,placeholder';
        }
        img.classList.remove('lazy-img');
    });

    // --------------------------------------------------------------
    //  LOAD EXACT GOOGLE MAP – zoomed in to building level
    //  Coordinates: -1.2672, 36.8027 (14 Muthithi Lane, Westlands, Nairobi)
    //  Zoom 18 = shows only the immediate area
    // --------------------------------------------------------------
    function loadRealMap() {
        var mapContainer = document.querySelector('.map-art');
        if (!mapContainer) return;

        var placeholderImg = mapContainer.querySelector('img');
        if (placeholderImg) {
            placeholderImg.remove();
        }

        var iframe = document.createElement('iframe');
        var lat = -1.2672;
        var lng = 36.8027;
        var zoom = 18; // building level
        
        iframe.setAttribute('src', 'https://www.google.com/maps/embed?q=' + lat + ',' + lng + '&z=' + zoom);
        iframe.setAttribute('title', 'Jiko Roots at 14 Muthithi Lane, Westlands, Nairobi, Kenya');
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('style', 'width:100%; height:100%; border:0; display:block;');
        iframe.setAttribute('allowfullscreen', '');
        mapContainer.appendChild(iframe);
    }

    // Call the map function
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadRealMap);
    } else {
        loadRealMap();
    }

    // --------------------------------------------------------------
    //  WHATSAPP TOGGLE (mobile)
    // --------------------------------------------------------------
    var waToggle = document.getElementById('waToggle');
    var waExtra = document.getElementById('waStepExtra');
    if (waToggle && waExtra) {
        waToggle.addEventListener('click', function() {
            var expanded = waToggle.getAttribute('aria-expanded') === 'true';
            waToggle.setAttribute('aria-expanded', String(!expanded));
            waExtra.classList.toggle('open');
            waToggle.textContent = expanded ? 'Show more' : 'Show less';
        });
        var checkDesktop = function() {
            if (window.innerWidth >= 760) {
                waExtra.style.display = 'block';
                waToggle.style.display = 'none';
            } else {
                waToggle.style.display = 'inline-block';
                if (!waExtra.classList.contains('open')) {
                    waExtra.style.display = 'none';
                } else {
                    waExtra.style.display = 'block';
                }
            }
        };
        window.addEventListener('resize', checkDesktop);
        checkDesktop();
    }

    // --------------------------------------------------------------
    //  REST OF JAVASCRIPT (menu, reservation, embers, etc.)
    //  (unchanged – keep everything below)
    // --------------------------------------------------------------
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Mobile nav */
    var toggle = document.getElementById('menuToggle');
    var closeBtn = document.getElementById('menuClose');
    var overlay = document.getElementById('mobileNav');

    function openNav() {
        overlay.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    if (toggle) { toggle.addEventListener('click', openNav); }
    if (closeBtn) { closeBtn.addEventListener('click', closeNav); }
    if (overlay) {
        overlay.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', closeNav); });
    }

    /* Embers */
    var embersHost = document.getElementById('embers');
    if (embersHost && !reducedMotion) {
        var count = window.innerWidth < 700 ? 10 : 18;
        for (var i = 0; i < count; i++) {
            var e = document.createElement('span');
            var left = Math.random() * 100;
            var delay = Math.random() * 7;
            var duration = 6 + Math.random() * 4;
            var drift = (Math.random() * 80 - 40) + 'px';
            e.style.left = left + '%';
            e.style.animationDelay = delay + 's';
            e.style.animationDuration = duration + 's';
            e.style.setProperty('--drift', drift);
            embersHost.appendChild(e);
        }
    }

    /* Grill ticker */
    var tickerMessages = [
        "Turkana goat ribs, 40 min in",
        "Coastal tilapia, wrapped and steaming",
        "Charcoal chicken, first turn done",
        "Beef skewers, 6 minutes to plate"
    ];
    var tickerEl = document.getElementById('tickerText');
    if (tickerEl) {
        var tIndex = 0;
        setInterval(function() {
            tIndex = (tIndex + 1) % tickerMessages.length;
            tickerEl.style.opacity = 0;
            setTimeout(function() {
                tickerEl.textContent = tickerMessages[tIndex];
                tickerEl.style.opacity = 1;
            }, 250);
        }, 5000);
        tickerEl.style.transition = 'opacity .25s ease';
    }

    /* Menu tabs */
    var tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.setAttribute('aria-selected', 'false'); });
            tab.setAttribute('aria-selected', 'true');
            document.querySelectorAll('.menu-panel').forEach(function(p) { p.classList.remove('active'); });
            var panel = document.getElementById(tab.getAttribute('aria-controls'));
            if (panel) { panel.classList.add('active'); }
            applyMenuFilters();
        });
    });

    /* Menu search + filters */
    var menuSearch = document.getElementById('menuSearch');
    var filterChips = document.querySelectorAll('.filter-chip');
    var activeFilter = 'all';
    var menuEmpty = document.getElementById('menuEmpty');

    function applyMenuFilters() {
        var query = menuSearch ? menuSearch.value.trim().toLowerCase() : '';
        var activePanel = document.querySelector('.menu-panel.active');
        if (!activePanel) return;
        var items = activePanel.querySelectorAll('.menu-item-card');
        var visibleCount = 0;
        items.forEach(function(item) {
            var tags = item.getAttribute('data-tags') || '';
            var nameEl = item.querySelector('.name');
            var name = nameEl ? nameEl.textContent.toLowerCase() : '';
            var matchesFilter = activeFilter === 'all' || tags.indexOf(activeFilter) !== -1;
            var matchesSearch = !query || name.indexOf(query) !== -1;
            var show = matchesFilter && matchesSearch;
            item.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });
        if (menuEmpty) { menuEmpty.hidden = visibleCount !== 0; }
    }

    filterChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            filterChips.forEach(function(c) { c.setAttribute('aria-pressed', 'false'); });
            chip.setAttribute('aria-pressed', 'true');
            activeFilter = chip.getAttribute('data-filter');
            applyMenuFilters();
        });
    });
    if (menuSearch) { menuSearch.addEventListener('input', applyMenuFilters); }

    /* Reservation form */
    var guestCount = document.getElementById('guestCount');
    var guestVal = document.getElementById('rGuestsVal');
    var stepUp = document.getElementById('stepUp');
    var stepDown = document.getElementById('stepDown');
    var count = 2;

    function renderGuests() { guestCount.textContent = count;
        guestVal.value = count; }
    if (stepUp) {
        stepUp.addEventListener('click', function() { if (count < 20) { count++;
                renderGuests(); } });
        stepDown.addEventListener('click', function() { if (count > 1) { count--;
                renderGuests(); } });
    }

    var resForm = document.getElementById('resForm');
    var resStatus = document.getElementById('resStatus');
    if (resForm) {
        resForm.addEventListener('submit', function(ev) {
            ev.preventDefault();
            if (!resForm.checkValidity()) { resForm.reportValidity(); return; }

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

            setTimeout(function() {
                window.open("https://wa.me/254700000000?text=" + encodeURIComponent(msg), "_blank", "noopener");
            }, 600);
        });
    }

    /* FAQ accordion */
    document.querySelectorAll('.faq-q').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            var answer = btn.nextElementSibling;
            btn.setAttribute('aria-expanded', String(!expanded));
            if (!expanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });

    /* Newsletter */
    var newsForm = document.getElementById('newsForm');
    var newsSuccess = document.getElementById('newsSuccess');
    if (newsForm) {
        newsForm.addEventListener('submit', function(ev) {
            ev.preventDefault();
            if (!newsForm.checkValidity()) { newsForm.reportValidity(); return; }
            newsSuccess.classList.add('show');
            newsForm.reset();
        });
    }
    var footerNews = document.getElementById('footerNews');
    if (footerNews) {
        footerNews.addEventListener('click', function(ev) {
            ev.preventDefault();
            var target = document.getElementById('newsEmail');
            target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
            target.focus();
        });
    }

    /* Gift card denominations */
    var denoms = document.querySelectorAll('#giftDenoms .denom');
    denoms.forEach(function(d) {
        d.addEventListener('click', function() {
            denoms.forEach(function(o) { o.setAttribute('data-active', 'false'); });
            d.setAttribute('data-active', 'true');
        });
    });

    /* Reveal on scroll */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reducedMotion) {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(function(el) { io.observe(el); });
    } else {
        revealEls.forEach(function(el) { el.classList.add('in'); });
    }

    /* Floating WhatsApp button */
    var floatWa = document.getElementById('floatWa');
    var heroSection = document.querySelector('.hero');
    if (floatWa && heroSection) {
        var heroHeight = heroSection.offsetHeight;
        window.addEventListener('scroll', function() {
            if (window.scrollY > heroHeight * 0.6) { floatWa.classList.add('show'); } else { floatWa.classList.remove('show'); }
        }, { passive: true });
    }

    /* Countdown timers (just for demo) */
    var specialCountdown = document.getElementById('specialCountdown');
    if (specialCountdown) {
        var totalSeconds = 2 * 3600 + 15 * 60 + 30; // 2:15:30
        setInterval(function() {
            if (totalSeconds <= 0) return;
            totalSeconds--;
            var h = Math.floor(totalSeconds / 3600);
            var m = Math.floor((totalSeconds % 3600) / 60);
            var s = totalSeconds % 60;
            specialCountdown.textContent =
                String(h).padStart(2, '0') + ':' +
                String(m).padStart(2, '0') + ':' +
                String(s).padStart(2, '0');
        }, 1000);
    }

})();