var iDOM = require('incremental-dom');

var arraySlice = Array.prototype.slice;
var temp = document.createElement('div');

var decodeHTML = function( str ) {
  temp.innerHTML = str;
  return temp.innerHTML;
};

var renderIdom = function( node ) {

  if (Array.isArray(node)) {
    node.forEach(renderIdom);
    return;
  } else if (typeof node === 'function') {
    // Render function
    node(); //  atts, children
    return;
  } else if ( typeof node !== 'object' ) {
    // String or number
    iDOM.text( decodeHTML( node ) );
    return;
  }

  var tag = node.tag,
      attrs = node.attrs,
      children = node.children;

  //console.log('renderIdom', tag, attrs, children);

  var argsArray = [ tag, null, null ];

  // Convert attributes object into flat array
  for (var attr in attrs ) {
    argsArray.push( attr );
    argsArray.push( attrs[attr] );
  }

  if ( children == null || children.length === 0 ) {
    iDOM.elementVoid.apply( null, argsArray );
    return;
  }

  iDOM.elementOpen.apply( null, argsArray );
  children.forEach(renderIdom);
  iDOM.elementClose( tag );
};


var jsxidom = function() {
  var node = {
    tag: arguments[0],
    attrs: arguments[1],
    children: 3 <= arguments.length ? arraySlice.call(arguments, 2) : []
  };

  return function() {
    return renderIdom(node);
  };
};

// Provide render method to HTML element
window.HTMLElement.prototype.render = function( obj ) {
  iDOM.patch( this, obj );
};

// Define global jsxidom to build incremental DOM from JSX
global.jsxidom = jsxidom;
