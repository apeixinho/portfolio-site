import VanillaScrollspy from 'vanillajs-scrollspy';
import './autotype';

document.addEventListener('DOMContentLoaded', function () {
  const topHeader = document.querySelector('header');
  const my_face = document.getElementById('my_face');
  const about_section = document.getElementById('about');
  const emailContact = document.getElementById('emailContact');
  const contactButtons = document.getElementById('contactButtons');
  const resumeDownload = document.getElementById('resumeDownload');

  // Attach email obfuscation listeners once
  const emailEncoded = emailContact ? emailContact.getAttribute('href') : null;

  if (emailContact && emailEncoded) {
    ['click', 'mouseenter', 'touchstart', 'pointerover'].forEach(function (evt) {
      emailContact.addEventListener(evt, function () {
        const cleanEmail = this.getAttribute('href').replace(/y|u|k/g, '');
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
  let mobileMenuInitialized = false;

  // Scroll handler — only visibility checks and class toggles, no addEventListener
  window.addEventListener('scroll', function () {
    // Sticky header
    if (typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth > 560) {
      const topHeaderHeight = topHeader.offsetHeight;
      const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
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
      const userDataContent = document.querySelector('.user-data-content');
      if (userDataContent) {
        const items = userDataContent.getElementsByTagName('li');
        for (let it = 0; it < items.length; it++) {
          items[it].classList.add("animated", "fadeInRight", "delay-" + (it + 1) + "s");
        }
        const continuate = document.getElementsByClassName("continuate");
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
    const activeNavLink = document.querySelector('nav ul li.active a');
    const allNavLinks = document.querySelectorAll('nav ul li a');
    for (let a = 0; a < allNavLinks.length; a++) {
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

        const menuNav = document.getElementById('menu-nav');
        const navContainer = document.querySelector('.nav-container');

        menuNav.addEventListener('click', function () {
          const navLabel = document.querySelector('label[for="menu-nav"]');
          if (menuNav.checked) {
            navContainer.classList.add("sticky");
            navLabel.setAttribute('aria-expanded', 'true');
          } else {
            navContainer.classList.remove("sticky");
            navLabel.setAttribute('aria-expanded', 'false');
          }
        });

        const navLinks = navContainer.getElementsByTagName('a');
        for (let i = 0; i < navLinks.length; i++) {
          navLinks[i].addEventListener('click', function () {
            menuNav.checked = false;
            navContainer.classList.remove("sticky");
          });
        }

        const sections = document.getElementsByTagName('section');
        for (let it = 0; it < sections.length; it++) {
          sections[it].addEventListener('click', function () {
            if (menuNav.checked) {
              menuNav.checked = false;
              navContainer.classList.remove("sticky");
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
    const rect = elem.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  // Initialize ScrollSpy
  const navbar = document.querySelector('nav');
  const scrollspy = new VanillaScrollspy(navbar, 875);
  scrollspy.init();
});
