import email from 'next-auth/providers/email';
import { Resend } from 'resend';
import { string } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({email,token}:{email:string,token:string}) {
    const url = `http://localhost:3000/auth/verification-token?token=${token}`
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'confimation de la creation du compte',
      html:`<div>
            <h3>verifier le compte</h3>
            <p>click sur le lien et apres connect toi: <h2>
            <a href=${url}>je comfirme</a>
            </h1></p> 
      </div>`
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
