import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

const registrationToken =
  'ePYHp6iNRkCijSM7WuQDit:APA91bFekAj5KYno1DQBPFN7d57TIChpBgv28X3JQwGnGM8Zu34UMropJmVFrzEGLuUIp_9Y_Uf83Mw1hktfuSQPUkK_2fHxtOlLVG44vh9J2Uos9Qqo1fIpEPpfQAGeE3-p-tUEpYVr';

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
        sound: 'default',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
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
