mite.goal
===========

A simple, HTML-based app to set and visualize goals for
time or revenue tracked with [mite](http://mite.yo.lk/).

It looks like this:
![screenshot](https://raw.github.com/gr2m/mite.goal/master/screenshot.png)

The API to create this chart:

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

Demo
------

You can give it a try at http://gr2m.github.io/mite.goal?

It will ask for your mite API key, you can find it at https://<your account>.mite.yo.lk/myself.
It will be stored in your browsers cache (localStorage). No other side will be able to access it.

Now

1. go to your mite account
2. put together a nice report
3. Copy the URL (looks like https://example.mite.yo.lk/reports/time_entries#project_id=123)
4. Append the copied URL to http://gr2m.github.io/mite.goal?
5. Be amazed

License & Copyright
-------------------

© Gregor Martynus.
Licensed unter the MIT license
