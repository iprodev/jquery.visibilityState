# jquery.visibilityState
Executes a callback when an element's visibility changes

Example: https://iprodev.github.io/jquery.visibilityState/

``` JavaScript
// Using plugin mode
$("#tester").visibilityState(function(isVisible) {
    if (isVisible) {
        // do something here when element visibled.
    } else {
        // do something here when element hidden.
    }
});

// Using event mode
$("#tester").on('visible', function() {
    // do something here when element visibled.
});
$("#tester").on('hidden', function() {
    // do something here when element hidden.
});
```
