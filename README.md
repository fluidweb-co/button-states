# Button States

[![npm version](https://badge.fury.io/js/button-states.svg)](https://badge.fury.io/js/button-states)
[![DragsterJS gzip size](http://img.badgesize.io/https://raw.githubusercontent.com/fluidweb-co/button-states/master/dist/button-states.min.js?compression=gzip
)](https://raw.githubusercontent.com/fluidweb-co/button-states/master/dist/button-states.min.js)

Helper functions to set button states for `loading`, `loaded` or `disabled` and auto-set loading states when its action is expected to take some time giving visual instant feedback to the user.



## Installation

Setting up is pretty straight-forward. Just download the script from __dist__ folder and include it in your HTML:

```html
<script type="text/javascript" src="path/to/dist/button-states.min.js"></script>
```

### NPM

Button States is also available on NPM:

```sh
$ npm install button-states
```




## Initialization

Once the Button States script is loaded all functions will be available through the global variable `window.ButtonStates`, however to enable the auto-set loading state feature you need to call the function `init`:

Call the function `ButtonStates.init( options );` passing the parameters:
- `options`: Any of the script available options can be changed from the default settings by passing the new values here as an object.



## Options Available

Currently Button States only accept one option:

```js
var options = {
    autoLoadingButtonSelector: '[data-auto-loading-state]', // Any valid css selector to target buttons which use auto-set loading state
}
ButtonStates.init( options );
```


## Basic Usage

Keep in mind Button States will only set the states of the button and your theme or page should provide the css code necessary to style the button for each of its state and add animations is necessary.

### 1. Auto set button to `loading` state when clicked

Usefull when you know the action of a button will likelly take a few seconds do process, to make it auto-set the `loading` state all you need to do is add an attribute to the button `data-auto-loading-state`, this will also disable to button click while on `loading` state:

```html
<button type="submit" data-auto-loading-state>Submit</button>
```

To use this method you first need to initialize the script as explained above in the section ["Initialization"](#initialization)above.

### 2. Set button state programatically

You can set any of these states to a button by passing it as a parameter to the function `ButtonStates.setStates()` and are available to use through the variable `ButtonStates.states` (see examples below):

- NORMAL
- DISABLED
- LOADING
- LOADED

In the example below we make every button on the page change it's state to `loading`when clicked, this can be achieve individually be using the auto-set method as described above. This is a simple example to show how to use the function `ButtonStates.setState( button, state )` where `button` is an html element and `state` is one of the states defined at `ButtonStates.states`.

```js
// Set `loading` state to any button on the page when clicked
var button = document.querySelector( '.submit' );
button.addEventListener( 'click', function( e ) {
    ButtonStates.setState( e.target, ButtonStates.states.LOADING );
} )
```

Another useful way to use Button States would be to enable a button once a script finishes loading and is ready to process user input, like a mobile menu button:

```js
( function() {
    // Enable a mobile menu button when the page finish loading
    var init = function() {
        var button document.querySelector( '.mobile-menu-button' );
        ButtonStates.setState( button, ButtonStates.states.NORMAL );
    }

    // Call init on page load
    window.addEventListener( 'load', init );
})();
```



## Contributing to Development

This isn't a large project by any means, but you are definitely welcome to contribute.

### Development environment

Clone the repo and run [npm](http://npmjs.org/) install:

```
$ cd path/to/button-states
$ npm install
```

Run the build command:

```
$ gulp build
```

Build on file save:

```
$ gulp
$ gulp watch
```



## License

Licensed under MIT.
