import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

const registrationToken =
  'c42B58qm-UgGtWmq4CyDD0:APA91bH-YIhM7B0Qr3ZsfQtROA-Zpq4GDaUUhAQijU3ObzZX0LU48YETfO3w6W1Vx3JUnyuGT2SSe6YI5AXTpRxKAHLp0cRuj9cA-N6HlrRrYpcgdF_6vyKYT0tuaGDMd-_1AEbwSkfG';

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export const sendNotification = (
  admins: string[],
  notification: {
    title: string;
    body: string;
  } = {
    title: 'Hello',
    body: 'Hello World',
  }
) => {
  app
    .messaging()
    .sendEachForMulticast({
      tokens: admins,
      notification: notification,
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
    })
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};
