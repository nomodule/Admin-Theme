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
  	var cNavbarLeftHeader = document.querySelector('.navbar-left__header'),
  			cNavbarLeftMenu = document.querySelector('.navbar-left__menu')
  			cNavbarLeftToggler = document.querySelector('.navbar-left__toggler');

    cNavbarLeftToggler.addEventListener('click', function(){
      cNavbarLeftMenu.classList.toggle('open');
      cNavbarLeftMenu.classList.toggle('stick');
    });

    // Nvaber dropdown toggle
    var cNavbarDropdowns = document.querySelectorAll('.navbar-left__menu-item.--has-dropdown');

    function cNavbarDropdownToggler(e) {
      for(var i = 0; i < cNavbarDropdowns.length; i++) {
        cNavbarDropdowns[i].classList.remove('open')
      }

      this.classList.toggle('open');
      this.querySelector('.sub-menu').classList.toggle('show');
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
    });

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

    function dropDownMenuToggler(e) {
      for (var i = 0; i < cDropdownMenus.length; i++) {
        if (this === cDropdownTogglers[i]) {
          cDropdownMenus[i].classList.toggle('show');

          // check position of dropdown and apply position styles accordingly
          if (cDropdowns[i].classList.contains('--pos-tl')) {
            console.log(cDropdownMenus[i].getBoundingClientRect(height));
            cDropdownMenus[i].setAttribute('style', 'transform.: red')
          } else if (cDropdowns[i].classList.contains('--pos-tr')) {
            console.log("--pos-tr");
            cDropdownMenus[i].setAttribute('style', 'color: red')
          } else if (cDropdowns[i].classList.contains('--pos-bl')) {
            console.log("--pos-bl");
            cDropdownMenus[i].setAttribute('style', 'color: red')
          } else if (cDropdowns[i].classList.contains('--pos-br')) {
            console.log("--pos-br");
            cDropdownMenus[i].setAttribute('style', 'color: red')
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
    var cAlerts = document.getElementsByClassName('alert'),
        cAlertCloseButtons = document.getElementsByClassName('alert-close');

    function hideAlert() {
      this.parentNode.outerHTML = "";
    }

    attachClickEventOnArrayItems(cAlertCloseButtons, hideAlert);

  })();

})();