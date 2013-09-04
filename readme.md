mite.goal
===========

A simple, HTML-based app to set and visualize goals for
time or revenue tracked with [mite](http://mite.yo.lk/).

It looks like this:
![screenshot](https://raw.github.com/gr2m/mite.goal/master/src/screenshot.png)

The (dream) API to create this chart:

```js
// parses the passed URL, loads it's time entries, compares to expectatiosn (50h)
// and draws a diagram (today until Sep 10th) showing my progress compared to the goal
MiteGoal({
  apiKey: '12345678'
})
.expect('https://example.mite.yo.lk/reports/time_entries#project_id=123')
.toBe(50)
.by('2013-09-10')
.render()
```

License & Copyright
-------------------

Copyright Gregor Martynus
Licensed unter the MIT license
