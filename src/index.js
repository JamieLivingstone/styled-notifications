'use strict';

(function Notifications(window) {
	// Default notification options
	const defaultOptions = {
		closeButton: false,
		positionClass: 'notification-bottom-right',
		onclick: null,
		showDuration: 300,
		hideDuration: 1000
	};

	function validateOptions(options) {
		// Create a copy of options
		options = Object.assign({}, options);

		// Validate position class
		function validatePositionClass(className) {
			const validPositions = [
				'notification-top-left',
				'notification-top-right',
				'notification-bottom-left',
				'notification-bottom-right',
				'notification-position-override'
			];

			return validPositions.indexOf(className) > -1;
		}

		// Verify position, if invalid reset to default
		if (!validatePositionClass(options.positionClass)) {
			console.warn('An invalid notification position class has been specified.');
			options.positionClass = defaultOptions.positionClass;
		}

		// Verify onClick is a function
		if (options.onclick && typeof options.onclick !== 'function') {
			console.warn('Notification on click must be a function.');
			options.onclick = defaultOptions.onclick;
		}

		return options;
	}

	// Create a new notification instance
	function createNotification(options) {
		options = validateOptions(Object.assign({}, defaultOptions, options));

		// Return a notification function
		return function notification(message) {
			const notificationEl = document.createElement('div');

			// Display close button
			if(options.closeButton) {
				const close = document.createElement('div');
				const closeButton = document.createElement('button');
				closeButton.innerText = 'X';
				close.append(closeButton);
				closeButton.addEventListener('click', () => document.body.removeChild(notificationEl));
				notificationEl.append(close);
			}

			// Append message
			notificationEl.append(document.createElement('p').innerText = message);

			// Append to DOM
			document.body.appendChild(notificationEl);
		};
	}

	// Add Notifications to window to make globally accessible
	if (window.createNotification) {
		console.warn('Window already contains a create notification function. Have you included the script twice?');
	} else {
		window.createNotification = createNotification;
	}
})(window);