// fake it until you make it!

(function() {
  'use strict';

  //
  function MiteGoal() {
    return {
      expect: expect
    };
  }

  //
  function expect() {
    return {
      toBe: toBe
    };
  }

  //
  function toBe() {
    return {
      by: by,
      render: render
    };
  }

  //
  function by() {
    return {
      render: render
    };
  }

  //
  function render() {

  }

  // export
  window.MiteGoal = MiteGoal;
})();
