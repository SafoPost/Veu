(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require("./iframe-load"); // console.log(123);


module.exports = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector("iframe");
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load("../" + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
              textNodes.push(node);
              console.log(node);
            } else {
              recursy(node);
            }
          });
        }

        ;
        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement("text-editor");

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = "true";
        });
      });
    }
  }]);

  return Editor;
}();

},{"./iframe-load":2}],2:[function(require,module,exports){
"use strict";

/*eslint-disable */
HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var Editor = require("./editor");

window.editor = new Editor();

window.onload = function () {
  window.editor.open("index.html");
};

},{"./editor":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2VkaXRvci5qcyIsImFwcC9zcmMvaWZyYW1lLWxvYWQuanMiLCJhcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVAsQyxDQUVBOzs7QUFDQSxNQUFNLENBQUMsT0FBUDtBQUNFLG9CQUFjO0FBQUE7O0FBQ1osU0FBSyxNQUFMLEdBQWMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZDtBQUNEOztBQUhIO0FBQUE7QUFBQSx5QkFJTyxJQUpQLEVBSWE7QUFBQTs7QUFDVCxXQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLFFBQVEsSUFBekIsRUFBK0IsWUFBTTtBQUNuQyxZQUFNLElBQUksR0FBRyxLQUFJLENBQUMsTUFBTCxDQUFZLGVBQVosQ0FBNEIsSUFBekM7QUFFQSxZQUFJLFNBQVMsR0FBRyxFQUFoQjs7QUFFQSxpQkFBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCO0FBQ3hCLFVBQUEsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBQyxJQUFELEVBQVU7QUFDbkMsZ0JBQUksSUFBSSxDQUFDLFFBQUwsS0FBa0IsT0FBbEIsSUFBNkIsSUFBSSxDQUFDLFNBQUwsQ0FBZSxPQUFmLENBQXVCLE1BQXZCLEVBQStCLEVBQS9CLEVBQW1DLE1BQW5DLEdBQTRDLENBQTdFLEVBQWdGO0FBQzlFLGNBQUEsU0FBUyxDQUFDLElBQVYsQ0FBZSxJQUFmO0FBR0EsY0FBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDRCxhQUxELE1BS087QUFDTCxjQUFBLE9BQU8sQ0FBQyxJQUFELENBQVA7QUFDRDtBQUNGLFdBVEQ7QUFVRDs7QUFBQTtBQUNELFFBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUVBLFFBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsVUFBQyxJQUFELEVB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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJyZXF1aXJlKFwiLi9pZnJhbWUtbG9hZFwiKTtcclxuXHJcbi8vIGNvbnNvbGUubG9nKDEyMyk7XHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRWRpdG9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKTtcclxuICB9XHJcbiAgb3BlbihwYWdlKSB7XHJcbiAgICB0aGlzLmlmcmFtZS5sb2FkKFwiLi4vXCIgKyBwYWdlLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgIGxldCB0ZXh0Tm9kZXMgPSBbXTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHJlY3Vyc3koZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gXCIjdGV4dFwiICYmIG5vZGUubm9kZVZhbHVlLnJlcGxhY2UoL1xccysvZywgXCJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0ZXh0Tm9kZXMucHVzaChub2RlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlY3Vyc3kobm9kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJlY3Vyc3koYm9keSk7XHJcblxyXG4gICAgICB0ZXh0Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmlmcmFtZS5jb250ZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHQtZWRpdG9yXCIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICB3cmFwcGVyLmNvbnRlbnRFZGl0YWJsZSA9IFwidHJ1ZVwiO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufTsiLCIvKmVzbGludC1kaXNhYmxlICovXHJcbkhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGlmcmFtZSA9IHRoaXM7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSB1cmwgKyBcIj9ybmQ9XCIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IG1heFRpbWUgPSA2MDAwMDtcclxuICAgIGNvbnN0IGludGVydmFsID0gMjAwO1xyXG5cclxuICAgIGxldCB0aW1lckNvdW50ID0gMDtcclxuXHJcbiAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlmcmFtZSkgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgdGltZXJDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50RG9jdW1lbnQgJiYgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWVyQ291bnQgKiBpbnRlcnZhbCA+IG1heFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiSWZyYW1lIGxvYWQgZmFpbCFcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBpbnRlcnZhbCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghaWZyYW1lKSByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgIGlmIChpZnJhbWUuY29udGVudERvY3VtZW50ICYmIGlmcmFtZS5jb250ZW50RG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZXJDb3VudCAqIGludGVydmFsID4gbWF4VGltZSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKFwiSWZyYW1lIGxvYWQgZmFpbCFcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG59IiwiY29uc3QgRWRpdG9yID0gcmVxdWlyZShcIi4vZWRpdG9yXCIpO1xyXG5cclxud2luZG93LmVkaXRvciA9IG5ldyBFZGl0b3IoKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgd2luZG93LmVkaXRvci5vcGVuKFwiaW5kZXguaHRtbFwiKTtcclxufTsiXX0=
