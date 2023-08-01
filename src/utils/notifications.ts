import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

const registrationToken =
  'fx_XBjNkrEbHl2Y39O7T6g:APA91bFdxpzAAVucNj94EsiTxqMTIRuHo8Y8yjj2VmE7YJbZHSpqD0AF45FCQqPTWM_tzsgB-IUUxpJTOycSVDvt-_89jQKLcWrZnRe9F6n0V5uQDhr0-w-yqvnqlnNCKTiHy4P6a4ni';

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export const sendNotification = () => {
  app
    .messaging()
    .send({
      token: registrationToken,
      notification: {
        title: 'Hello',
        body: 'Hello, world!',
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
