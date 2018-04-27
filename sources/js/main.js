"use-strict";

;(function(){

  // #GLOBAL

  function attachClickEventOnArrayItems(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', fn);
    }
  }

  function removeClassFromArrayItems(arr, cn) {
    for(var i = 0; i < arr.length; i++) {
      arr[i].classList.remove(cn);
      console.log('removed');
    }
  }

  /**
   * ------------------------------------------------------------------------
   * #NAVBAR
   * ------------------------------------------------------------------------
   */
  (function(){

    // Navbar toggle
  	var cNavbarLeftHeader = document.querySelector('.navbar-left__header');
    var cNavbarLeftMenu = document.querySelector('.navbar-left__menu');
  	var cNavbarLeftToggler = document.querySelector('.navbar-left__toggler');

    cNavbarLeftToggler.addEventListener('click', function(){
      cNavbarLeftMenu.classList.toggle('open');
      cNavbarLeftMenu.classList.toggle('stick');
    });

      var navbarPs = new PerfectScrollbar(cNavbarLeftMenu, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
      });

    // Nvaber dropdown toggle
    var cNavbarDropdowns = document.querySelectorAll('.navbar-left__menu-item.--has-dropdown');

    function cNavbarDropdownToggler(e) {
      for(var i = 0; i < cNavbarDropdowns.length; i++) {
        if (cNavbarDropdowns[i] === this) {
          continue;
        }
        this.classList.toggle('open');
        cNavbarDropdowns[i].classList.remove('open')
      }

      this.querySelector('.sub-menu').classList.toggle('show');
      console.log(this.classList);
    }

    attachClickEventOnArrayItems(cNavbarDropdowns, cNavbarDropdownToggler);
    
    // on hover navigation collapse toggle
    cNavbarLeftMenu.addEventListener('mouseover', function(){
      if(this.classList.contains('stick')) {
        return false;
      } else {
        this.classList.add('open');
      }
    });

    cNavbarLeftMenu.addEventListener('mouseout', function(){
      if(this.classList.contains('stick')) {
        return false;
      } else {
        this.classList.remove('open');
      }

      for (var i; i <= cNavbarDropdowns.length; i++) {
        cNavbarDropdowns[i].classList.remove('open');
      }
    });

    console.log(cNavbarLeftMenu);

  })();


  /**
   * ------------------------------------------------------------------------
   * #DROPDOWN
   * ------------------------------------------------------------------------
   */
  (function(){
    var cDropdowns = document.getElementsByClassName('dropdown');
    var cDropdownTogglers = document.getElementsByClassName('dropdown-toggler');
    var cDropdownMenus = document.getElementsByClassName('dropdown-menu');
    var cDropdownItem = document.getElementsByClassName('dropdown-item');

    function dropDownMenuToggler(e) {
      for (var i = 0; i < cDropdownMenus.length; i++) {
        if (this === cDropdownTogglers[i]) {
          cDropdownMenus[i].classList.toggle('show');

          const elemProps = cDropdownTogglers[i].getBoundingClientRect();
          const elemStyle = getComputedStyle(cDropdownTogglers[i]);

          // check position of dropdown and apply position styles accordingly
          if (cDropdowns[i].classList.contains('--pos-tl')) {
            cDropdownMenus[i]
            .setAttribute('style', 'position: absolute; top: auto; left: 0; bottom: 0; transform: translate3d(' + elemStyle.marginLeft + ', -' + (elemProps.height + parseInt(elemStyle.marginBottom)) + 'px, 0px);');

          } else if (cDropdowns[i].classList.contains('--pos-tr')) {
            cDropdownMenus[i]
            .setAttribute('style', 'position: absolute; top: auto; left: auto; right: 0; bottom: 0; transform: translate3d(-'  + elemStyle.marginRight + ', -' + (elemProps.height + parseInt(elemStyle.marginBottom)) + 'px, 0px);');

          } else if (cDropdowns[i].classList.contains('--pos-bl')) {
            cDropdownMenus[i]
            .setAttribute('style', 'position: absolute; top: 0; left: 0; right: auto; bottom: auto; transform: translate3d(' + elemStyle.marginLeft + ', ' + (elemProps.height + parseInt(elemStyle.marginTop)) + 'px, 0px);');

          } else if (cDropdowns[i].classList.contains('--pos-br')) {
            cDropdownMenus[i]
            .setAttribute('style', 'position: absolute; top: 0; left: auto; right: 0; bottom: auto; transform: translate3d(' + elemStyle.marginLeft + ', ' + (elemProps.height + parseInt(elemStyle.marginTop)) + 'px, 0px);');

          } else {
            cDropdownMenus[i]
            .setAttribute('style', 'position: absolute; top: 0; left: 0; right: auto; bottom: auto; transform: translate3d(' + elemStyle.marginLeft + ', ' + (elemProps.height + parseInt(elemStyle.marginTop)) + 'px, 0px);');
          }

        } else {
          cDropdownMenus[i].classList.remove('show');
        }
      }
    }

    function hideDropdown() {
      this.parentNode.classList.remove('show');
    }

    attachClickEventOnArrayItems(cDropdownItem, hideDropdown);

    attachClickEventOnArrayItems(cDropdownTogglers, dropDownMenuToggler);

    // clicked outside dropdown menu handler
    function clickedOutsideDropdownMenu() {
      document.addEventListener('click', function(e){
        if (!e.target.classList.contains('dropdown-toggler')) {
          for (var i = 0; i < cDropdownMenus.length; i++) {
            cDropdownMenus[i].classList.remove('show');
          }
        }
      });
    }

    clickedOutsideDropdownMenu();
  })();


  /**
   * ------------------------------------------------------------------------
   * #ALERTS
   * ------------------------------------------------------------------------
   */

  (function(){
    var cAlerts = document.getElementsByClassName('alert');
    var cAlertCloseButtons = document.getElementsByClassName('alert-close');

    function hideAlert() {
      this.parentNode.outerHTML = "";
    }

    attachClickEventOnArrayItems(cAlertCloseButtons, hideAlert);

  })();

    /**
   * ------------------------------------------------------------------------
   * #MODAL
   * ------------------------------------------------------------------------
   */

  (function(){
    var cModals = document.getElementsByClassName('modal');
    var cModalLaunchers = document.querySelectorAll('[data-target-modal]');
    var cModalCloseButtons = document.getElementsByClassName('js-modal-close');
    var cModalOverlay = document.createElement('div');
    cModalOverlay.classList.add('overlay');

    function hideModal() {

      try {
        this.closest('.modal').classList.remove('is-visible');
        document.querySelector('.overlay').outerHTML = "";
      } catch(e) {
        // statements
        console.error(e);
        console.error('overlay element is not available in DOM');
      }
    }

    function launchModal() {
      for ( var i = 0; i < cModals.length; i++ ) {
        if( cModals[i].id == this.getAttribute('data-target-modal') ) {
          cModals[i].classList.add('is-visible');
        }
      }

      if (document.body.contains(cModalOverlay)) {
        console.log('overlay exist!');
      } else {
        document.body.appendChild(cModalOverlay);
      }
    }
    attachClickEventOnArrayItems(cModalLaunchers, launchModal);
    attachClickEventOnArrayItems(cModalCloseButtons, hideModal);

    document.body.onkeyup = function(e) {
      console.log(e.which);
    }

  })();

})();