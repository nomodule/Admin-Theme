"use-strict";

;(function(global){

  // #GLOBAL

  function attachEventOnArrayItems(arr, fn, eventName) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener(eventName, fn);
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

    attachEventOnArrayItems(cNavbarDropdowns, cNavbarDropdownToggler, 'click');
    
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


  /**
   * ------------------------------------------------------------------------
   * #DROPDOWN
   * ------------------------------------------------------------------------
   */

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

    attachEventOnArrayItems(cDropdownItem, hideDropdown, 'click');

    attachEventOnArrayItems(cDropdownTogglers, dropDownMenuToggler, 'click');

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


  /**
   * ------------------------------------------------------------------------
   * #ALERTS
   * ------------------------------------------------------------------------
   */

    var cAlerts = document.getElementsByClassName('alert');
    var cAlertCloseButtons = document.getElementsByClassName('alert-close');

    function hideAlert() {
      this.parentNode.outerHTML = "";
    }

    attachEventOnArrayItems(cAlertCloseButtons, hideAlert, 'click');

    /**
   * ------------------------------------------------------------------------
   * #MODAL
   * Modal code is inpired by: https://bitsofco.de/accessible-modal-dialog/
   * ------------------------------------------------------------------------
   */

    var cModals = document.getElementsByClassName('modal');
    var cModalLaunchers = document.querySelectorAll('[data-target-modal]');
    var cModalCloseButtons = document.getElementsByClassName('js-modal-close');
    var cModalOverlay = document.createElement('div');

    cModalOverlay.classList.add('overlay');
    // this variable will contain elemnt which has focus while opening modal dialog
    var focusedElem;
    var focusableElms;
    var modalState = 'inactive';
    var TAB_KEY = 9;
    var SHIFT_KEY = 16;

    function launchModal(e) {
      if (modalState === 'inactive') {
        // get that element which has focus while opeinig modal dialog
        focusedElem = document.activeElement;
        for ( var i = 0; i < cModals.length; i++ ) {
          if( cModals[i].id == this.getAttribute('data-target-modal') ) {
            // get all of the focusable elements inside modal diablog
            focusableElms = cModals[i].querySelectorAll('a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
            // set focus on first focusable element in modal dialog
            focusableElms[0].focus();
            cModals[i].classList.add('is-visible');
          }
        }
        // don't append modal dialog background overlay again if it is already exist in dom
        if (document.body.contains(cModalOverlay)) {
          console.log('overlay exist!');
        } else {
          // append modal dialog background overlay in dom and prevent it from getting focus
          document.body.appendChild(cModalOverlay).setAttribute('tabindex', -1);
        }

        // get current visible modal
        cVisibleModal = document.querySelector('.modal.is-visible');
        modalState = 'active';
      }

      cVisibleModal.addEventListener('keyup', function(e){
        if (e.which === TAB_KEY) {
          handleTabIncreament();
        }
        if (e.which === SHIFT_KEY) {
          handleTabDicrement();
        }
      });
    }


    function hideModal() {
      if (modalState === 'active') {
        // set focus on the elemnt which has it before opeinig modal
        focusedElem.focus();
        try {
          this.closest('.modal').classList.remove('is-visible');
          document.querySelector('.overlay').outerHTML = "";
          } catch(e) {
          // statements
          console.error(e);
          console.error('overlay element is not available in DOM');
        }

        modalState = 'inactive';
      }
    }

    function handleTabIncreament(e) {
      console.log(focusableElms);
      if(document.activeElement === focusableElms[focusableElms.length - 1]) {
        focusableElms[0].focus();
      }
    }

    function handleTabDicrement(e) {
      if(document.activeElement === focusableElms[0]) {
        focusableElms[focusableElms.length - 1].focus();
      }
    }

    attachEventOnArrayItems(cModalLaunchers, launchModal, 'click');
    attachEventOnArrayItems(cModalCloseButtons, hideModal, 'click');

})(this);