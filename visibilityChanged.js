/**
 * Visible State Change for DOM Elements
 * https://iprodev.github.io/jquery.visibilityState/
 *
 * Copyright (c) 2017 iProDev
 * Licensed under the MIT license.
 */
(function ($) {
	var namespace = 'visibilityState',
		visibleEvent = 'visible',
		hiddenEvent = 'hidden',
		elements = [],
		length = 0,
		l = 0,
		exist, item, isVisibile, timeID;

	/*
	
		Function
	
		Function (  )
	
		Return Type:
		Void
	
		Description:
		Checks elements visibility status and call the events and callbacks.

	*/
	var checkVisibility = function () {
		if (length === 0)
			return;

		l = length;

		while(l--) {
			item = elements[l];
			isVisibile = item.$element.is(':visible');

			if (isVisibile !== item.isVisibile) {
				if (item.event) {
					if (item.event === visibleEvent && isVisibile)
						item.$element.triggerHandler(visibleEvent);
					else if (item.event === hiddenEvent && !isVisibile)
						item.$element.triggerHandler(hiddenEvent);
				}
				else
					item.fn.call(item.$element[0], isVisibile);
			}

			elements[l].isVisibile = isVisibile;
		}
	};

	/*
	
		Function
	
		Function ( $element: jQuery DOM Object, fn: Function, event: String )
	
		Return Type:
		Boolean
	
		Description:
		Add element to visibility elements check list.

	*/
	var addElement = function ($element, fn, event) {
		if (checkElement($element, fn, event) === false) {
			// Push element to visibility elements check list
			elements.push({
				$element: $element,
				fn: fn,
				isVisibile: null,
				event: event
			});

			// Calculate the length
			length = elements.length;

			// Refresh the interval timer
			clearInterval(timeID);
			timeID = setInterval(checkVisibility, 100);

			return true;
		}

		return false;
	};

	/*
	
		Function
	
		Function ( $element: jQuery DOM Object, fn: Function, event: String )
	
		Return Type:
		Boolean
	
		Description:
		Remove element from visibility elements check list.

	*/
	var removeElement = function ($element, fn, event) {
		var index = checkElement($element, fn, event);

		if (index !== false) {
			// Remove element from visibility elements check list
			elements.splice(index, 1);

			// Calculate the length
			length = elements.length;

			return true;
		}

		return index;
	};

	/*
	
		Function
	
		Function ( $element: jQuery DOM Object, fn: Function, event: String )
	
		Return Type:
		Boolean|Integer
	
		Description:
		Check is element exists in visibility elements check list.

	*/
	var checkElement = function ($element, fn, event) {
		exist = false;
		l = length;

		while(l--) {
			item = elements[l];
			if ($element[0] === item.$element[0] && fn === item.fn && event === item.event) {
				exist = l;
				break;
			}
		}

		return exist;
	};

	// Begin the plugin
	$.fn[namespace] = function (fn) {
		return this.each(function () {
			addElement($(this), fn);
		});
	};

	// Begin the visible special event
	$.event.special[visibleEvent] = {
		add: function(handleObj) {
			var elem = this;

			addElement($(this), handleObj.handler, visibleEvent);
		},

		remove: function(handleObj) {
			removeElement($(this), handleObj.handler, visibleEvent);
		}
	};

	// Begin the visible special event
	$.event.special[hiddenEvent] = {
		add: function(handleObj) {
			addElement($(this), handleObj.handler, hiddenEvent);
		},

		remove: function(handleObj) {
			removeElement($(this), handleObj.handler, hiddenEvent);
		}
	};
})(jQuery);
