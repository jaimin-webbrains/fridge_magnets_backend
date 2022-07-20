const { getCurrentTime } = require("../helpers/helpers");
const nodemailer = require("nodemailer");

class contactus {
  constructor() {}

  // Fetching all brands.

  // Add new Brands.
  async addContactUs(input) {
    try {
      const htmldata = `<html><body>
      <h4>Contact Information</h4>
      <p><b>Name&nbsp;:</b>&nbsp;${input.name}</p>
      <p><b>Mobile&nbsp;:</b>&nbsp;${input.mobile}</p>
      <p><b>Message&nbsp;:</b>&nbsp;${input.messages}</p>
      </body></html>`;
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `${input.email}`, // sender address
        to: "bilalpatel@yopmail.com", // list of receivers
        subject: "Contact Information", // Subject line
        // text: "Hello world?", // plain text body
        html: `${htmldata}`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return info.messageId;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new contactus();
