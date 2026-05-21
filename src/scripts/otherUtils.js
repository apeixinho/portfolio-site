import VanillaScrollspy from 'vanillajs-scrollspy';
import './autotype';

document.addEventListener('DOMContentLoaded', function () {
  var topHeader = document.querySelector('header');
  var my_face = document.getElementById('my_face');
  var about_section = document.getElementById('about');
  var skill_grid = document.getElementById('skill_grid');
  var emailContact = document.getElementById('emailContact');
  var contactButtons = document.getElementById('contactButtons');
  var resumeDownload = document.getElementById('resumeDownload');

  // Attach skill_grid event listeners once (if skills section exists)
  if (skill_grid) {
    var skillItems = skill_grid.getElementsByTagName('li');
    var isDesktop = typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth > 560;

    if (isDesktop) {
      for (var i = 0; i < skillItems.length; i++) {
        skillItems[i].addEventListener('mouseenter', function () {
          this.classList.add("animated", "tada");
        });
        skillItems[i].addEventListener('mouseleave', function () {
          this.classList.remove("animated", "tada");
        });
      }
    } else {
      for (var j = 0; j < skillItems.length; j++) {
        skillItems[j].addEventListener('touchstart', function () {
          this.classList.add("animated", "tada");
        });
        skillItems[j].addEventListener('touchend', function () {
          this.classList.remove("animated", "tada");
        });
      }
    }
  }

  // Attach email obfuscation listeners once
  var emailEncoded = emailContact ? emailContact.getAttribute('href') : null;

  if (emailContact && emailEncoded) {
    ['click', 'mouseenter', 'touchstart', 'pointerover'].forEach(function (evt) {
      emailContact.addEventListener(evt, function () {
        var cleanEmail = this.getAttribute('href').replace(/y|u|k/g, '');
        this.setAttribute('href', cleanEmail);
      });
    });

    ['blur', 'mouseleave', 'touchend', 'pointerleave'].forEach(function (evt) {
      emailContact.addEventListener(evt, function () {
        this.setAttribute('href', emailEncoded);
      });
    });
  }

  // Mobile menu initialization flag
  var mobileMenuInitialized = false;

  // Scroll handler — only visibility checks and class toggles, no addEventListener
  window.addEventListener('scroll', function () {
    // Sticky header
    if (typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth > 560) {
      var topHeaderHeight = topHeader.offsetHeight;
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollPosition > topHeaderHeight) {
        topHeader.classList.add("sticky");
      } else {
        topHeader.classList.remove("sticky");
      }
    }

    // Profile photo animation
    if (isVisibleOnScreen(my_face)) {
      my_face.classList.add("animated", "bounceIn", "slow");
    } else {
      my_face.classList.remove("animated", "bounceIn", "slow");
    }

    // About section animation
    if (isVisibleOnScreen(about_section)) {
      var userDataContent = document.querySelector('.user-data-content');
      if (userDataContent) {
        var items = userDataContent.getElementsByTagName('li');
        for (var it = 0; it < items.length; it++) {
          items[it].classList.add("animated", "fadeInRight", "delay-" + (it + 1) + "s");
        }
        var continuate = document.getElementsByClassName("continuate");
        if (continuate.length > 0) {
          continuate[0].classList.add("animated", "fadeIn", "delay-5s", "slower");
        }
      }
    }

    // Contact buttons animation
    if (contactButtons && isVisibleOnScreen(contactButtons)) {
      resumeDownload.classList.add("animated", "fadeInRight", "slow");
      emailContact.classList.add("animated", "fadeInLeft", "slow");
    } else {
      resumeDownload.classList.remove("animated", "fadeInRight", "slow");
      emailContact.classList.remove("animated", "fadeInLeft", "slow");
    }

    // Update aria-current on nav links (ScrollSpy adds 'active' to li)
    var activeNavLink = document.querySelector('nav ul li.active a');
    var allNavLinks = document.querySelectorAll('nav ul li a');
    for (var a = 0; a < allNavLinks.length; a++) {
      allNavLinks[a].removeAttribute('aria-current');
    }
    if (activeNavLink) {
      activeNavLink.setAttribute('aria-current', 'page');
    }
  });

  // Resize handler
  window.addEventListener('resize', function () {
    if (typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth < 561) {
      if (!mobileMenuInitialized) {
        mobileMenuInitialized = true;

        document.getElementById('menu-nav').addEventListener('click', function () {
          if (document.getElementById('menu-nav').checked) {
            document.querySelector('.nav-container').classList.add("sticky");
          } else {
            document.querySelector('.nav-container').classList.remove("sticky");
          }
        });

        var navLinks = document.querySelector('.nav-container').getElementsByTagName('a');
        for (var i = 0; i < navLinks.length; i++) {
          navLinks[i].addEventListener('click', function () {
            document.getElementById('menu-nav').checked = false;
            document.querySelector('.nav-container').classList.remove("sticky");
          });
        }

        var sections = document.getElementsByTagName('section');
        for (var it = 0; it < sections.length; it++) {
          sections[it].addEventListener('click', function () {
            if (document.getElementById('menu-nav').checked) {
              document.getElementById('menu-nav').checked = false;
              document.querySelector('.nav-container').classList.remove("sticky");
            }
          });
        }
      }
    } else {
      mobileMenuInitialized = false;
    }
  });

  function isVisibleOnScreen(elem) {
    if (Object.is(elem, null)) {
      return false;
    }
    var rect = elem.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  // Initialize ScrollSpy
  const navbar = document.querySelector('nav');
  const scrollspy = new VanillaScrollspy(navbar, 875);
  scrollspy.init();
});
