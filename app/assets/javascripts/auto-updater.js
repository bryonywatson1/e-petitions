//= require jquery.countTo
//
// Check for signature count update every few seconds
// Has hardcoded threshold levels.
(function ($) {
  'use strict';

  var JSON_URL = window.location.pathname + '/count.json',
      THRESHOLD_RESPONSE = 10000,
      THRESHOLD_DEBATE = 100000,
      TIMEOUT = 10000;

  function add_commas(n) {
        return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function update_progress_bar(value) {
    var pc = value / (value >= THRESHOLD_RESPONSE ? THRESHOLD_DEBATE : THRESHOLD_RESPONSE) * 100;
    if (pc > 100) {
      pc = 100;
    } else if (pc < 1) {
      pc = 1;
    }
    $('.signature-count-current').width(pc + '%');
    if (value >= THRESHOLD_RESPONSE) {
      $('.signature-count-goal').text(add_commas(THRESHOLD_DEBATE));
    } else {
      $('.signature-count-goal').text(add_commas(THRESHOLD_RESPONSE));
    }
  }

  function fetch_count() {
    $.get(JSON_URL, function(data) {
      if (data && data.signature_count) {
        var $count = $('.signature-count-number .count');
        var current = parseInt($count.data('count'));

        if (data.signature_count != current) {
          $count.data('count', data.signature_count);
          $count.countTo({
            from: current,
            to: data.signature_count,
            refreshInterval: 50,
            formatter: add_commas,
            onUpdate: update_progress_bar,
            onComplete: update_progress_bar
          });
        }
      }
      setTimeout(fetch_count, TIMEOUT);
    });
  }
  setTimeout(fetch_count, TIMEOUT);

})(jQuery);

