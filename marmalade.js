var marmalade = {}

// blank element
class blank extends div {
  constructor() {
    super()
  }
}
customElements.define('blank', blank, {})

// marmalade helper functions
var er = function(err) {
  console.log('Marmalade error: ' + err + '.')
}

var convertBlank = function(c) {
  if(c) {
    var obj = {};

    obj.writeLine = function(text) {
      document.write('<p>' + text || 'Marmalade' + '</p>');
    }
    obj.write = function(text) {
      document.write()
    }
    obj.loadFile = function(fn, type) {
      if(type == 'script') {
        marmalade.spawn('script', '', {
          src: fn
        }, c)
      } else if(type == 'stylesheet') {
        marmalade.spawn('link', '', {
          rel: 'stylesheet',
          href: fn
        }, c)
      }
    }
    obj.object = function(data) {
      'use strict';
      var i = document.createElement('img')
      if(data.image) {
        i.setAttribute('src', data.img)
      }
      if(data.position) {
        data.position.object = i;
        obj.position(data.position);
      }
      if(data.class) {
        data.setAttribute('class', data.class);
      }
      if(data.style) {
        data.setAttribute('style', data.style);
      }
      if(data.attrs) {
        if(data.attributes) {
          Object.keys(data.attributes).forEach(function(attr) {
            i.setAttribute(attr, data.attributes[attr]);
          })
        } else if(data.attrs) {
          Object.keys(data.attrs).forEach(function(attr) {
            i.setAttribute(attr, data.attrs[attr]);
          })
        }
      }
    }
    obj.position = function(data) {
      if(data.object) {
        if(data.x) {
          if(typeof data.x == 'string') {
            data.object.style.left = data.x;
          } else {
            data.object.style.left = data.x.toString();
          }
        }
        if(data.y) {
          if(typeof data.y == 'string') {
            data.object.style.top = data.y;
          } else {
            data.object.style.top = data.y.toString();
          }
        }
        if(!data.x && !data.y) {
          var data = {};
          if(data.object.style.top) {
            data.y = data.object.style.top.toNumber()
          }
          if(data.object.style.left) {
            data.x = data.object.style.left.toNumber()
          }
          return data;
        }
      } else {
        er('data.object must be defined.')
      }
    }
    obj.button = function(data) {
      'use strict';

      var button = document.createElement('button');
      if(data.id) {
        button.setAttribute('id', data.id);
      }
      if(data.click) {
        button.setAttribute('onclick', data.click);
      }
      if(data.class) {
        button.setAttribute('class', data.class);
      }
      if(data.style) {
        button.setAttribute('style', data.style);
      }
      if(data.position) {
        data.position.object = button;
        obj.position(data.position)
      }
      if(data.attributes) {
        Object.keys(data.attributes).forEach(function(attr) {
          button.setAttribute(attr, data.attributes[attr]);
        })
      } else if(data.attrs) {
        Object.keys(data.attrs).forEach(function(attr) {
          button.setAttribute(attr, data.attrs[attr]);
        })
      }
      if(data.text) {
        button.innerHTML = data.text;
      }
      c.appendChild(button);
      return button;
    }
  } else {
    er('convertBlank requires a blank object.')
  }
}

// marmalade main functions
marmalade.spawn = function(elem, id, attrs, parent) {
  "use strict";

  var obj = document.createElement(elem);
  if(!id == '') {
    obj.setAttribute('id', id)
  }
  Object.keys(attrs).forEach(function(attr) {
    obj.setAttribute(attr, attrs[attr]);s
  })

  parent.appendChild(obj);
  return obj;
}

marmalade.scene = function(name) {
  'use strict';

  var bl = document.createElement('blank');
  bl.setAttribute('id', name);
  bl.setAttribute('width', '100%');
  bl.setAttribute('height', '100%');

  document.appendChild(bl);
  return convertBlank(bl);
}

if(typeof module == 'undefined') {
  export Marmalade = marmalade;
} else {
  module.exports = marmalade;
}
