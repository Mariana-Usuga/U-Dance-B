require('dotenv').config();
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail")

async function sendEmail(data){

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: data.to,
    from: 'No Reply<marianausugamontoya12344@gmail.com>',
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data
  }

  try{
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    // console.log(response[0].headers)
  }catch(error){
    console.error('error'. error)
  }
}

async function sendMailNodeMailer(data) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'marianausugamontoya12344@gmail.com', //IN ENV
      pass: 'sqvxucwajozgbkte', // gIN ENV
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"U Dance 👻" <marianausugamontoya12344@gmail.com>', // sender address
    to: `sandrayanethmontoyamoreno@gmail.com, ${data.email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `
    hello world
    how are u?
    `, // plain text body
    html: `
    <b>Hello world?</b>
    <p>How are u?</p>
    <p style="color: red;" >i hope you are doing well</p>
    ` ,
    attachments:[
      {
        filename:'text1.txt',
        path:'Hello world'
      }
    ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  sendMailNodeMailer,
  sendEmail
}
