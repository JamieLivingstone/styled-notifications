'use strict';

// Written using ES5 JS for browser support
window.addEventListener('DOMContentLoaded', function () {
	var form = document.querySelector('form');

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		// Form elements
		var title = form.querySelector('#title').value;
		var message = form.querySelector('#message').value;
		var position = form.querySelector('#position').value;
		var duration = form.querySelector('#duration').value;
		var theme = form.querySelector('#theme').value;
		var closeOnClick = form.querySelector('#close').checked;
		var displayClose = form.querySelector('#closeButton').checked;

		if(!message) {
			message = 'You did not enter a message...';
		}

		//create the text version of the command for displaying
		let text = `
		<label> JS Command used to create this notification:</label>
		<hr>
<pre>
window.createNotification({
	closeOnClick: ${closeOnClick},
	displayCloseButton: ${displayClose},
	positionClass: ${position},
	showDuration: Number(${duration}),
	theme: ${theme}
})({
	title: ${title},
	message: ${message}
});
</pre>
		`;

		document.getElementById("cmdoutput").innerHTML =text;
		
		//create the notification
		window.createNotification({
			closeOnClick: closeOnClick,
			displayCloseButton: displayClose,
			positionClass: position,
			showDuration: Number(duration),
			theme: theme
		})({
			title: title,
			message: message
		});
	});
});
