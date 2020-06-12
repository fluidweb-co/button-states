/*!
 * Helper to set button states for `loading`, `loaded` or `disabled`
 * and auto-set loading states when its action is expected to take some time.
 */
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.ButtonStates = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';
	
	var _hasInitialized = false;

	var _settings = {
		autoLoadingButtonSelector: '[data-auto-loading-state]',
	};

	var _publicMethods = {
		// Expose state constants
		states: {
			NORMAL: '',
			DISABLED: 'disabled',
			LOADING: 'loading',
			LOADED: 'loaded',
		}
	};



	/*!
	* Merge two or more objects together.
	* (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
	* @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	* @param   {Object}   objects  The objects to merge together
	* @returns {Object}            Merged values of defaults and options
	*/
	var extend = function () {
		// Variables
		var extended = {};
		var deep = false;
		var i = 0;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					// If property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = extend(extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < arguments.length; i++) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;
	};
	
	
	
	/**
	 * Set the state of a button element
	 *
	 * @param   {HTMLElement/String}    button  Button element or selector
	 * @param   {String}                state   State to set to the button
	 */
	_publicMethods.setState = function ( button, state ) {
		if ( typeof button === 'string' ) button = document.querySelector( button );
		if ( button ) {
			button.setAttribute( 'data-button-state', state );
			button.disabled = state === _publicMethods.states.DISABLED || state === _publicMethods.states.LOADING;
		}
	};




	/**
	 * Handle document clicks and route to the appropriate function.
	 */
	var handleClick = function ( e ) {
		// Auto-loading state
		if ( e.target.closest( _settings.autoLoadingButtonSelector ) ) {
			_publicMethods.setState( e.target.closest( _settings.autoLoadingButtonSelector ), _publicMethods.states.LOADING );
		}
	};



	/**
	 * Initialize
	 */
	_publicMethods.init = function( options ) {
		if ( _hasInitialized ) return;

		_settings = extend( _settings, options );
		
		document.addEventListener( 'click', handleClick );
		
		_hasInitialized = true;
	};



	//
	// Public APIs
	//
	return _publicMethods;

});
