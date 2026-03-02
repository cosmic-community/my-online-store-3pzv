(function() {
  if (window.self === window.top) return;

  var logs = [];
  var MAX_LOGS = 500;

  var originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  function sendToParent(data) {
    try {
      window.parent.postMessage(data, '*');
    } catch (e) {}
  }

  function captureLog(level, args) {
    var timestamp = new Date().toISOString();
    var message = args.map(function(arg) {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, function(key, value) {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');

    var logEntry = {
      timestamp: timestamp,
      level: level,
      message: message,
      url: window.location.href
    };

    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }

    sendToParent({
      type: 'console-log',
      log: logEntry
    });
  }

  console.log = function() {
    var args = Array.prototype.slice.call(arguments);
    captureLog('log', args);
    originalConsole.log.apply(console, args);
  };

  console.warn = function() {
    var args = Array.prototype.slice.call(arguments);
    captureLog('warn', args);
    originalConsole.warn.apply(console, args);
  };

  console.error = function() {
    var args = Array.prototype.slice.call(arguments);
    captureLog('error', args);
    originalConsole.error.apply(console, args);
  };

  console.info = function() {
    var args = Array.prototype.slice.call(arguments);
    captureLog('info', args);
    originalConsole.info.apply(console, args);
  };

  console.debug = function() {
    var args = Array.prototype.slice.call(arguments);
    captureLog('debug', args);
    originalConsole.debug.apply(console, args);
  };

  window.addEventListener('error', function(event) {
    captureLog('error', ['Unhandled Error: ' + event.message + ' at ' + event.filename + ':' + event.lineno]);
  });

  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', ['Unhandled Promise Rejection: ' + String(event.reason)]);
  });

  function sendReady() {
    sendToParent({
      type: 'console-capture-ready',
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  }

  function sendRouteChange() {
    sendToParent({
      type: 'route-change',
      route: {
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
        href: window.location.href
      },
      timestamp: new Date().toISOString()
    });
  }

  // Monitor route changes
  var originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    sendRouteChange();
  };

  var originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    sendRouteChange();
  };

  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);

  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  }
})();