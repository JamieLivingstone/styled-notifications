'use strict';
import {
	append,
	createElement,
	createParagraph,
	isString
} from './helpers';

(function Notifications(window) {
	// Default notification options
	const defaultOptions = {
		closeOnClick: true,
		displayCloseButton: false,
		positionClass: 'notification-top-right',
		onclick: false,
		showDuration: 300
	};

	function configureOptions(options) {
		// Create a copy of options
		options = Object.assign({}, defaultOptions, options);

		// Validate position class
		function validatePositionClass(className) {
			const validPositions = [
				'notification-top-left',
				'notification-top-right',
				'notification-bottom-left',
				'notification-bottom-right'
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
		// Validate options and set defaults
		options = configureOptions(options);

		// Return a notification function
		return function notification({ title, message }) {
			if(!isString(title) && !isString(message)) {
				return console.warn('Notification must contain a title or a message!');
			}

			// Create the notification wrapper
			const notificationEl = createElement('div', 'ncf');

			// Close on click
			if(options.closeOnClick) {
				notificationEl.addEventListener('click', () => document.body.removeChild(notificationEl));
			}

			// Display close button
			if(options.displayCloseButton) {
				const closeButton = createElement('button');
				closeButton.innerText = 'X';

				// Use the wrappers close on click to avoid useless event listeners
				if(options.closeOnClick === false){
					closeButton.addEventListener('click', () => document.body.removeChild(notificationEl));
				}

				append(notificationEl, closeButton);
			}

			// Append title and message
			isString(title) && append(notificationEl, createParagraph('ncf-title')(title));
			isString(message) && append(notificationEl, createParagraph('nfc-message')(message));

			// Append to container
			const container = createNotificationContainer(options.positionClass);
			append(container, notificationEl);

			if(options.showDuration) {
				setTimeout(() => container.removeChild(notificationEl), options.showDuration);
			}
		};
	}

	function createNotificationContainer(position) {
		let container = document.querySelector(`.${position}`);

		if(!container) {
			container = createElement('div', position);
			append(document.body, container);
		}

		return container;
	}

	// Add Notifications to window to make globally accessible
	if (window.createNotification) {
		console.warn('Window already contains a create notification function. Have you included the script twice?');
	} else {
		window.createNotification = createNotification;
	}
})(window);
