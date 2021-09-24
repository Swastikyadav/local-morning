const nodeMailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");
const getEnvVariable = require("../environments/env");

class NodeMailer {
  static sendEmail({to, subject, html}) {
    const initializeTransport = nodeMailer.createTransport(sendGrid({
      auth: {
        api_key: getEnvVariable().sendGridApiKey,
      },
    }))

    return initializeTransport.sendMail({
      from: "8020lessons@gmail.com",
      to,
      subject,
      html,
    });
  }
}

module.exports = NodeMailer;