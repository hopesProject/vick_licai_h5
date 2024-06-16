// src/directives/autocomplete.js
export default {
  bind(el) {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.setAttribute('autocomplete', 'off');
    }
  }
};
