import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function ResetMail({email,token}:{email:string,token:string}) {
    const url = `http://localhost:3000/auth/new-password?token=${token}`
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'reinitialisation du mot de passe',
      html:`<div>
      <h3>reinitialise le mot de passe</h3>
      <p>click sur le lien <h2>
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
