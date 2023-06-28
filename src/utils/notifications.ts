import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getMessaging, TokenMessage } from 'firebase-admin/messaging';

const registrationToken =
  'epPNyXL900_lhM0ZqUo8HW:APA91bGEF-LTCwtuqsop0E_b_XU2lP3ES1p6xh64KSJD8LpEeTP0zfcXDTjKe0WxCu5j0eOh3FDPPCOZff2Kjvvy_M3XsjofVlB7I0so5B9r5aPbB2dC3BUcz-Jp_oNUJaIERXtGeorP';

const message: TokenMessage = {
  apns: {
    payload: {
      aps: {
        alert: {
          title: 'Hello',
          body: 'Hello, world!',
        },
      },
    },
  },
  token: registrationToken,
};

const app = initializeApp({
  credential: applicationDefault(),
});

const messaging = getMessaging(app);

export const sendNotification = () => {
  messaging
    .send(message)
    .then(response => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};
