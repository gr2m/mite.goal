// fake it until you make it!

(function() {
  'use strict';

  //
  function MiteGoal(options) {
    var apiKey = options.apiKey;
    var accountName;
    var mite;
    var params = {};
    var goal = 0;
    var startDate = Date.today();
    var endDate = Date.today().add(14).days();

    //
    function expect(url) {
      var matches = url.match(/(\w+)\.mite.yo.lk\/reports\/time_entries\/#(.*)$/);
      accountName = matches[1];
      var query = matches[2];
      query.split(/&/).forEach(function(keyAndValue) {
        keyAndValue = keyAndValue.split('=');
        var key = keyAndValue[0];
        var value = keyAndValue[1];

        params[key] = value;
      });

      return {
        toBe: toBe
      };
    }

    //
    function toBe(hours) {
      goal = hours * 60;
      return {
        by: by,
        render: render
      };
    }

    //
    function by(dateString) {
      startDate = Date.parse('2013-09-01');
      endDate = Date.parse( dateString );
      return {
        render: render
      };
    }

    //
    function render() {
      google.load("visualization", "1", {packages:["corechart"]});
      function drawChart() {
        var table = google.visualization.arrayToDataTable(chartData);

        var options = {
          chartArea: {
            top: '30%',
            left: 0,
            width: '100%',
            height: '70%'
          },
          theme: 'maximized',
          colors: ['#eee', '#FF8215'],
          legend: { position: 'none' },
          vAxis: {
            textPosition: 'none',
            gridlines: { color: 'transparent'}
          },
          hAxis: {
            textPosition: 'none'
          },
          aggregationTarget: 'auto'
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart'));
        chart.draw(table, options);
      }
      window.onresize = drawChart


      var chartData = [['Date', 'projected', 'actual']];
      google.setOnLoadCallback(function() {
        mite = new Mite({account: accountName, api_key: apiKey})
        mite.TimeEntry.all({
          at: 'this_month',
          customer_id: '180007,217866',
          group_by: 'day',
          sort: 'date ASC'
        }, function(response) {
          var miteData = response.map( function(item) { return item.time_entry_group } );
          var today = Date.today()
          var todayString = JSON.stringify(today).substr(0,11).replace(/"/g, '')

          var oneDay = 24*60*60*1000;
          var days = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(oneDay))) + 1;
          var perDay = goal / days;

          var currentDay = startDate;
          var current = 0;
          var currentTotal = 0;
          var daysLeft;

          for (var day = 1; day <= days; day++) {
            var dayString = JSON.stringify(currentDay).substr(0,11).replace(/"/g, '')
            if (! miteData.length) {
              if (! currentTotal) {
                currentTotal = current
              }
              current = null
            } else if (dayString == miteData[0].day) {
              current += miteData.shift().minutes
            }
            if (todayString >= dayString) {
              daysLeft = days - day;
            }
            chartData.push([
              dayString,
              perDay * day,
              current
            ])
            currentDay = currentDay.add(1).day()
          };

          var resultCurrent = [Math.round(currentTotal / 6) / 10, 'hours'].join(' ');
          var resultGoal = [Math.round(goal / 6) / 10, 'hours'].join(' ');
          var shouldBe = goal / days * (days - daysLeft);
          var resultShouldBe = [Math.round(shouldBe / 6) / 10, 'hours'].join(' ');
          var resultBehind = [Math.round((shouldBe - currentTotal) / 6) / 10, 'hours'].join(' ');
          var resultDaysLeft = [daysLeft, 'days'].join(' ');
          var $summary = $('<div class="summary"></div>').html(
            'You made <strong class="current">'+resultCurrent+'</strong>' +
            'out of your <strong class="goal">'+resultGoal+'</strong> goal.' +
            'By plan, you should be at <strong class="projected">'+resultShouldBe+'</strong> today.' +
            'You are behind by <strong class="missing">'+resultBehind+'</strong>.' +
            'You have <strong class="daysLeft">'+resultDaysLeft+'</strong> to catch up.'
          );
          $summary.appendTo(document.body);
          $summary.fitText();
          $('.summary').addClass('show');

          $('<div id="chart"></div>').appendTo(document.body);
          drawChart()
        });
      });
    }

    return {
      expect: expect
    };
  }

  // export
  window.MiteGoal = MiteGoal;
})();
