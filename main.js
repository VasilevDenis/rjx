import { ajax } from 'rxjs/ajax'
import { interval } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import './style.css'


// Check if the subject length is less than 15 characters
const reduceSubject = (subject) => {
    if (subject.length < 15) {
        return subject; // Return the subject unchanged if it's already 15 characters or less
    } else {
        return subject.slice(0, 15) + '...'; // Trim the subject to 15 characters and add ellipsis
    }
}

const url = 'https://flask-hello-world-vert-seven.vercel.app/messages/unread';

// Create an observable that emits a value every 5 seconds
const interval$ = interval(5000);

// Merge the interval with the AJAX request using switchMap
interval$.pipe(
  switchMap(() => ajax.getJSON(url)),
).subscribe({
  next: response => {
    const messages = response.messages.map((element) => {
      const date = new Date(element.received);
      const formattedDate = date.toLocaleTimeString();
      return `
      <div class="message">
        <div class="field">${element.from}</div>
        <div class="field">${reduceSubject(element.subject)}</div>
        <div class="time">${formattedDate}</div>
      </div>`;
    });

    document.querySelector('#app').innerHTML = `
      <div class="messages">
        ${Array.from(messages).join('')}
      </div>
    `;
  },
  error: error => {
    console.error('Error fetching data:', error);
    document.querySelector('#app').innerHTML = `
      <div class="messages">
        No messages
      </div>
    `;
  }
});
