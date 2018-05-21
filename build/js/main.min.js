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

    cModalOverlay.classList.add('js-modal-overlay');
    // this variable will contain elemnt which has focus while opening modal dialog
    var focusedElem;
    global.focusableElms;
    var modalState = 'inactive';
    var TAB_KEY = 9;
    var SHIFT_KEY = 16;

    function launchModal(e) {
      if (modalState === 'inactive') {
        // get that element which has focus while opening modal dialog
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

      cVisibleModal.addEventListener('keydown', function(e){
        if (e.which === TAB_KEY) {
          handleTabIncreament();
        }
        if (e.shiftKey && e.which === TAB_KEY) {
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
          document.querySelector('.js-modal-overlay').outerHTML = "";
          } catch(e) {
          // statements
          console.error(e);
          console.error('overlay element is not available in DOM');
        }

        modalState = 'inactive';
      }
    }

    function handleTabIncreament() {
      if(document.activeElement === focusableElms[focusableElms.length - 1]) {
        console.log(global.focusableElms[0]);
        global.focusableElms[0].focus();
      }
    }

    function handleTabDicrement() {
      if(document.activeElement === focusableElms[0]) {
        focusableElms[focusableElms.length - 1].focus();
      }
    }

    attachEventOnArrayItems(cModalLaunchers, launchModal, 'click');
    attachEventOnArrayItems(cModalCloseButtons, hideModal, 'click');

    // #Switcher
    // all input (checkboxes) with the class of `js-checkbox-swicth`
    var cCheckboxSwitcher = document.getElementsByClassName('js-checkbox-swicth');

    // remove inputs (checkboxed) from DOM
    function removeSwitcherGarbage() {
      for (var i = cCheckboxSwitcher.length - 1; i > -1; i--) {
        cCheckboxSwitcher[i].outerHTML = "";
      };
    };

    // construct checkbox switcher html
    function switcher() {
      for (var i = 0; i < cCheckboxSwitcher.length; i++) {
        // here we are generating random id to use in `for` and `id` attribute of `label` and `input` respectively
        var cRandomId = Math.random().toString(36).substr(2, 9);
        // create HTML structure and replace with `<input type="checkbox" class="js-checkbox-swicth">` elements in DOM
        var cCheckboxSwitcherInnerElement = document.createElement('div');
        cCheckboxSwitcherInnerElement.classList.add('switch');

        if(cCheckboxSwitcher[i].classList.contains('switch--small')) {
          cCheckboxSwitcherInnerElement.classList.add('switch--small');
        }

        if ((cCheckboxSwitcher[i].classList.contains('switch--large'))) {
          cCheckboxSwitcherInnerElement.classList.add('switch--large');
        }
        
        var cCheckboxSwitcherInnerHTML = "";
        cCheckboxSwitcherInnerHTML += '<input type="checkbox" class="switch-checkbox" id="switcher-';
        cCheckboxSwitcherInnerHTML += cRandomId;
        cCheckboxSwitcherInnerHTML += '"';
        // add `checked` attribute in input if is applied in HTML
        if (cCheckboxSwitcher[i].checked) {
          cCheckboxSwitcherInnerHTML += 'checked="checked"';
        }
        cCheckboxSwitcherInnerHTML += '> <label class="switch-label" for="switcher-';
        cCheckboxSwitcherInnerHTML += cRandomId;
        cCheckboxSwitcherInnerHTML += '" ></label>';
        cCheckboxSwitcherInnerElement.innerHTML = cCheckboxSwitcherInnerHTML;
        cCheckboxSwitcher[i].parentNode.insertBefore(cCheckboxSwitcherInnerElement, cCheckboxSwitcher[i]);
      };

      removeSwitcherGarbage();
    };

    switcher();

    // #Tab
    // all clickable links
    var cTabBtn = document.querySelectorAll('.tab-tab');
    // tabs data
    var cTabContent = document.querySelectorAll('.tab-content');

    function tabInitialize(e) {
      // prevent id to be visible in url
      e.preventDefault();
      for (let i = 0, length1 = cTabBtn.length; i < length1; i++){
        cTabBtn[i].classList.remove('active');

        // We are using try catch becaue might be user will forget to make
        // both tab links and tab data equaly
        try {
          // hide and show tab data when tab is clicked
          if (this.getAttribute('href').slice(1) == cTabContent[i].id) {
            for(let i = 0, length1 = cTabContent.length; i < length1; i++){

              cTabContent[i].style.display = 'none';
            }
            cTabContent[i].style.display = 'block';
          }
        } catch(e) { }
      }

      // add active class on clicked tab
      this.classList.add('active');

    }
    
    // 1.By default view firt tab
    // 2.Disable those tabs which has class of disabled.
    function tabsIntialTasks() {
      for(let i = 0, length1 = cTabBtn.length; i < length1; i++){
        // 1
        if (i === 0) {
          console.log('i is zero')
          cTabContent[0].style.display = 'block';
        }
        // 2
        // make unclickable those links which has disabled class
        if (cTabBtn[i].classList.contains('disabled')) {
          console.log(cTabBtn[i].classList.value);
          // set disabled attribute dynamically
          cTabBtn[i].setAttribute('disabled', 'disabled');
          // remove click event handler
          cTabBtn[i].removeEventListener('click', tabInitialize);
          // prevent id to be visible in url whwn tab is clicked
          cTabBtn[i].style.pointerEvents = 'none';
          cTabBtn[i].addEventListener('click', function(e){
            e.preventDefault();
          });
        }
      }
    }

    attachEventOnArrayItems(cTabBtn, tabInitialize, 'mousedown');
    // `tabsIntialTasks()` should be below `tabInitialize()` otherwise
    // disabling tab links will not work.
    tabsIntialTasks();

}(window));