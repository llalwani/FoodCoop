'use strict';
/*global angular, Date, moment*/

/* Filters */

angular.module('co-op.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }])

	.filter('currency', function() {
		return function(num) {
			if (Number(num) >= 0) return '$' + Number(num).toFixed(2);
			else if (Number(num) < 0) return "-" + '$' + Math.abs(Number(num)).toFixed(2);
			else return;
		};
	})

  .filter('blurb', function() {
	  return function(blurb) {
		  if (blurb) {
				if (blurb.length > 200) {
					return blurb.slice(0, 199);
				} else {
					return blurb;
				}
		  } else {
			  return "No description has been written yet for this product.";
		  }
	  };
  })
  .filter('forURL', function() {
	  return function(forURL) {
		  // var URLready;
		  // if (forURL) {
			//   forURL.toString();
			//   URLready = forURL.replace(/\s/g, "+");
			//   return URLready;
		  // }
      return encodeURIComponent(forURL);
	  };
  })
  .filter('shortDate', function() {
	return function(shortDate) {
		if (shortDate) {
			if ( Date.parse(shortDate).clearTime().equals(Date.today()) ) {
				return Date.parse(shortDate).toString('h:mm tt');
			}
			return Date.parse(shortDate).toString('d/M/yyyy');
		}
	};
  })
  .filter('longDate', function() {
	  return function(longDate) {
		  if (longDate) {
		  	return Date.parse(longDate).toString('ddd d MMM yyyy');
		  }
	  };
  }).filter('calendar', calendar)
  ;
	
	function calendar () {
	  return function (time) {
	    if (!time) return;

	    return moment(time).calendar(null, {
	      lastDay : '[Yesterday]',
	      sameDay : 'LT',
	      lastWeek : 'dddd',
	      sameElse : 'DD/MM/YY'
	    });
	  };
	}
