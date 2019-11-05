import sendGrid from "@sendgrid/mail";

// Method for sending emails
const sendMail = (emailBody, linkType, res) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  sendGrid
    .send(emailBody)
    .then(() => res.status(200).json({
      message: `${linkType} link sent successfully. Please check your email`
    }))
    .catch(err => console.log(err));
};

// Email content functions

const verificationEmail = (user, token) => ({
  to: user.email,
  from: process.env.AUTH_EMAIL,
  subject: "Ekalaamu email verification",
  text: "Verify your email to complete registration.",
  html: `
<h1 
style="
background-color:black; color:white;
padding: 5px; text-align:center;
">Ekalaamu
</h1>
<hr />
<h2>Hello, ${user.firstname}</h2>
${ user.verified  ? `<h3> Please click link below to reset password</h3>` : `<h3> Please verify your email by clicking the link below</h3>`}   
<br/>
<a href="${process.env.MAIL_RETURN_URL}/?code=${token}"> ${user.verified ? `<h3> click to reset password</h3>`:`
<h3>Verify your Email</h3>`}</a>
</h3>
`
});

export { sendMail, verificationEmail };
