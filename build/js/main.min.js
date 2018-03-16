"use-strict";

;(function(){

  // #GLOBAL

  function attachClickEventOnArrayItems(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', fn);
    }
  }

  function animateHeight() {
    
  }

  /**
   * ------------------------------------------------------------------------
   * #NAVBAR
   * ------------------------------------------------------------------------
   */
  (function(){

    // Navbar toggle
  	var cNavbarLeftHeader = document.querySelector('.navbar-left__header'),
  			cNavbarLeftMenu = document.querySelector('.navbar-left__menu')
  			cNavbarLeftToggler = document.querySelector('.navbar-left__toggler');

  	  cNavbarLeftToggler.addEventListener('click', function(){
  		cNavbarLeftMenu.classList.toggle('open');
  	});

    // Nvaber dropdown toggle
    var cNavbarDropdowns = document.querySelectorAll('.navbar-left__menu-item.--has-dropdown');

    function cNavbarDropdownToggler() {
      this.querySelector('.sub-menu').classList.toggle('show');
    }

    attachClickEventOnArrayItems(cNavbarDropdowns, cNavbarDropdownToggler);
  })();


  /**
   * ------------------------------------------------------------------------
   * #DROPDOWN
   * ------------------------------------------------------------------------
   */
  (function(){
    var cDropdowns = document.getElementsByClassName('dropdown'),
        cDropdownTogglers = document.getElementsByClassName('dropdown-toggler'),
        cDropdownMenus = document.getElementsByClassName('dropdown-menu'),
        cDropdownItem = document.getElementsByClassName('dropdown-item');


    // function attachClickEventOnArrayItems(arr, fn) {
    //   for (var i = 0; i < arr.length; i++) {
    //     arr[i].addEventListener('click', fn);
    //   }
    // }

    function dropDownMenuToggler() {
      for (var i = 0; i < cDropdownMenus.length; i++) {
        if (this === cDropdownTogglers[i]) {
          cDropdownMenus[i].classList.toggle('show');
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
    var cAlerts = document.getElementsByClassName('alert'),
        cAlertCloseButtons = document.getElementsByClassName('alert-close');

    function hideAlert() {
      // this.parentNode.classList.add('alert--hidden');
      this.parentNode.outerHTML = "";
    }

    attachClickEventOnArrayItems(cAlertCloseButtons, hideAlert);

  })();

})();