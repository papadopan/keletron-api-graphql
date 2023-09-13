import { Resend } from 'resend';

export const sendEmail = async (email: string, html: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const details = {
    from: 'Keletron-No Response <noresponse@oakeletron.gr>',
    to: email.toLowerCase(),
    subject: 'Keletron Tennis Academy',
    html,
  };

  try {
    await resend.emails.send(details);
  } catch (error) {
    console.error('EEE', error);
  }
};
