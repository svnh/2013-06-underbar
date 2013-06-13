/*jshint eqnull:true, expr:true*/

var _ = { };
console.log("inside underbar.js");

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
   var newarray = []
  if (n <= 0) {
        return [];
  }
  if (n == undefined) {
    return array[0];
  }

  for (var i = 0; i < array.length; i++) {
    newarray.push(array[i]);
      n--;
      if(n == 0)
      {
        break;
      }
    };
    return newarray;
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var newarray = []
  
  if (n <= 0) {
        return [];
     }
  if (n == undefined) {
    return(array[array.length - 1]);
     }

    var offset = array.length -n;
    if (offset < 0) { 
        offset = 0
    }
    for (var i = offset; i < array.length; i++) {
      newarray.push(array[i]);
      n--;
      if(n == 0)
      {
        break;
      }
    };
    return newarray;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
 _.each = function(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var i in collection) {
      iterator(collection[i], i, collection);
      }
    }
  };
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var newarray = []
    _.each(collection, function(value, key, obj) {
      if (!(iterator.call(value, key, obj)))
        newarray.push(value);
    });
    return newarray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.fiter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value, key, obj) {
      return !iterator(value, key, obj)}
    );
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    if (array.length == 0) {
      return [];
    }
    var found = false;
    var newarray = new Array();

//    newarray = array;
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < newarray.length; j++) {
        if (array[i] == newarray[j]) {
          found = true;
          break;
          }
        }
    if (!found) {
//      newarray.pop([i])
      newarray.push(array[i]);
      }
    found = false;  
    }
    return newarray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];
      _.each(array, function(value) {
        newArray.push(iterator.call(this, value));
    });
    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var newArray = [];

    _.each(list, function(value) {
      methodName = value[methodName] ? value[methodName] : methodName;
      newArray[newArray.length] = methodName.call(value);
    })
    return newArray;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var previousValue = 0;
    if (initialValue == undefined) {
      initialValue = 0;
    }
    previousValue = initialValue;
    _.each(collection, function(item) {
      previousValue = iterator(previousValue, item)
    });
    return previousValue; 
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (iterator == null) { 
      iterator = function(value) {
          return value;
        }
    }
    var res = _.reduce(collection, function(bool, elem){
      if(iterator(elem) != bool) {
        return false;
      }
      return bool;
    }, true);
    return res;
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (iterator == null) { 
      iterator = function(value) {
          return value;
        }
    }
    var res = !_.every(collection, function(elem) {
      return !iterator(elem);
    });
    return res;
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var newobj = Array.prototype.slice.call(arguments);
    _.each(newobj, function(stuff){
    for (var i in stuff) {
      obj[i] = stuff[i];
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var newobj = Array.prototype.slice.call(arguments);
    _.each(newobj, function(stuff){
        for (var i in stuff) {
          obj[i] = (typeof obj[i] == "undefined") ? stuff[i] : obj[i];
        }
    })
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
      var already = {};
      return function (arg) {
        if (arg in already) {
          return already[arg];
        }
        else {
          return already[arg] = func(arg);
        }
      }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [].slice.call(arguments, 2);
    return setTimeout(function () {func.apply(this, args);}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var shuffled = [];
    var len = array.length;
    var temp = [];
    var index = 0;
    while (len > 0) {
      index = Math.floor(Math.random() * len);
      len--;
      temp = array [len];
      shuffled[len] = shuffled [index];
      shuffled[index] = temp;
    }
    return shuffled;
};


}).call(this);
