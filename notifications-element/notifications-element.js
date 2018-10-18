import { html, LitElement } from '@polymer/lit-element/lit-element.js';


/**
 * `notifications-element`
 * Polymer lit-element implementation of JamieLivingstone/Notifications
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class NotificationsElement extends LitElement {
  static get properties() {
    return {
      notification: Object,
    };
  }
  constructor() {
    super();

    //initialize property values
    this.notification = {
        title: "",
        message: "",
        theme: '',          // ['default', 'info', 'error', 'success', 'warning']
        timer: 0            //milliseconds to display message
    };

    //load notifications.css into the main page head tag
    let styleEl = document.createElement('link');
    styleEl.setAttribute("rel", "stylesheet");
    styleEl.setAttribute("type", "text/css");
    styleEl.setAttribute("href", '../node_modules/styled-notifications/dist/notifications.css');
    document.getElementsByTagName("head")[0].appendChild(styleEl);

    //import notifications.js
    import('../node_modules/styled-notifications/dist/notifications.js');
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        td {
          min-width: 20vw;
        }
      </style>
      <div hidden>
        <table>
          <tr>
            <td>
              <label for="title">Title:</label>
            </td>
            <td>
              <div id="title">${this.notification.title}</div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="message">Message:</label>
            </td>
            <td>
              <div id="message">${this.notification.message}</div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="theme">Theme:</label>
            </td>
            <td>
              <div id="theme">${this.notification.theme}</div>
            </td>
          </tr>

          <tr>
            <td>
              <label for="timer">Timer:</label>
            </td>
            <td>
              <div id="timer">${this.notification.timer}</div>
            </td>
          </tr>
      </div>
    `;
  }
  updated(propMap) {
    let oldValue = propMap.get('notification');
    if (typeof oldValue === 'object') {
      this.handleNotification();
    }
  }
  handleNotification() {
    let notification = this.notification;

    let doNotification = window.createNotification({
      closeOnClick: true,
  		displayCloseButton: true,
  		positionClass: 'nfc-top-middle',
  		onclick: false,
      theme: notification.theme,
      showDuration: notification.timer
    });

    doNotification({
      title: notification.title,
      message: notification.message
    });
  }
}

window.customElements.define('notifications-element', NotificationsElement);
