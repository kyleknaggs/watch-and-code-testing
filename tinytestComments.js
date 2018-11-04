/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var TinyTest = {
  // tinytest has 5 different methods stored on the TinyTest object. They are as follows:
  // 1) TinyTest.run()
  // 2) TinyTest.fail()
  // 3) TinyTest.assert()
  // 4) TinyTest.assertEquals()
  // 5) TinyTest.assertStrictEquals()

  // pass argument into TinyTest.run()
  // this argument consists of a single object
  // that contains a list of all the tests that need to be run
  run: function(tests) {
    // create a new variable called 'failures' to keep track of the total number of failures
    // and set its value to 0
    var failures = 0;
    // loop through every method in the tests object
    for (var testName in tests) {
      // and for every method stored in the object
      // create a new variable called 'testAction'
      // take the function that is stored in that test
      // and store that function in the 'testAction' variable
      var testAction = tests[testName];
      // now attempt to run the following
      try {
        // take test stored in the testAction variable
        // set the current 'this' value
        // inside of the function referenced by the 'testAction' variable
        // to the 'TinyTest' object which is the object referenced by the current 'this' variable
        // and immediately run the function once this new 'this' value has been applied
        testAction.apply(this);
        // if running the test does not produce an error
        // print a message to the console confirming the passing of the test
        console.log("Test:", testName, "OK");
        // else take the exception that was triggered
      } catch (e) {
        // increment the value stored on the failures variable by 1
        failures++;
        // log an error message
        // with the name of the test that failed and the error object itself
        console.error("Test:", testName, "FAILED", e);
        // log the stack trace associated with that error
        console.error(e.stack);
      }
    }
    // set a timer to execute a particular piece of code once a timer expires
    // setTimeout() is also always run after the DOM has been updated
    // so wait for the DOM to render
    setTimeout(function() {
      // Give document a chance to complete
      // then is the DOM in fact has been rendered
      if (window.document && document.body) {
        // change the background color of the <body> element
        // based on the value stored in the 'failures' variable
        document.body.style.backgroundColor =
          failures == 0 ? "#99ff99" : "#ff9999";
      }
    }, 0);
  },
  // used to force a test to fail
  // accepts an argument called msg
  fail: function(msg) {
    // create a user defined exception
    // that is a new error with a message
    throw new Error("fail(): " + msg);
  },
  // accepts a value and msg arguments
  assert: function(value, msg) {
    // tests if the value is truthy
    if (!value) {
      // throws an error if it is not
      throw new Error("assert(): " + msg);
    }
  },
  // used to compare two expressions
  assertEquals: function(expected, actual) {
    // if expected value is not equal to the actual value
    if (expected != actual) {
      // throw a new error
      // & log the expected and the actual values received
      throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
    }
  },
  // used to compare the data type of two expressions
  assertStrictEquals: function(expected, actual) {
    // if the value and data type of the expected value
    // is not equal to the actual value
    if (expected !== actual) {
      // create a new error object
      throw new Error(
        // and log a message with the expect and the actual values
        'assertStrictEquals() "' + expected + '" !== "' + actual + '"'
      );
    }
  }
};

// create a list of variables that enanble the application to access
// all of the methods stored in the tinytest object
var fail = TinyTest.fail.bind(TinyTest),
  assert = TinyTest.assert.bind(TinyTest),
  assertEquals = TinyTest.assertEquals.bind(TinyTest),
  // store the TinyTest.assertEquals() method in the new 'eq' variable
  eq = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  // store the TinyTets.run() method in the new 'tests' variable
  tests = TinyTest.run.bind(TinyTest);
