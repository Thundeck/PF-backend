const sendNotificationMail = require("../libs/nodemailer");

const sendNotificationWithMail = async (req, res) => {
  try {
    const { subject, from, toCount, message, htmlMessage } = req.body;
    const result = await sendNotificationMail(
      subject,
      from,
      toCount,
      message,
      htmlMessage
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const sendMailValidation = async (userName, mail, token) => {
  try {
    const subject = "User account validation";
    const htmlMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GLB Music</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/bc3e252ca7.js" crossorigin="anonymous"></script>
            <style>
                *{
                    font-family: 'Roboto', sans-serif;
                    color: #fff;
                }
                body{
                    margin: 0;
                }
                .link{
                    font-weight: 700;
                    color: #b00002;
                }
                .link:hover {
                    transition: all 0.2s ease-in;
                    color: #910002;
                }
                .link:focus {
                    color: #910002;
                }
            </style>
        </head>
        <body>
            <div id="confirm-account" style="
            background-color: #0e0d15; 
            width: 100%;
            " >
                <div style="
                padding: 20px 10px 0px 10px  ;
                ">
        
                    <div style="
                    text-align: center;
                    background-color: #0e0d15;
                    padding: 10px 0px 10px 0px;
                    width: 100% ;
                    " >
                        <h1 style="text-decoration: underline #b00002 4px ;" >
                            TH Music
                        </h1>
                    </div>
                    <hr style="border-color:#bbbbbb;" >
                    <div style="
                    background-color: 0e0d15;
                    padding-top: 2Opx;
                    padding-bottom: 5px;
                    width: 100% ;
                    text-align: center;
                    ">
                        <h2>Account validation </h2>
                        <h3 id="user" style="color:#b00002;" >${userName}</h3>
                        <br/>        
                        <p>In case you are not interested in the registration, you did not have the consent of creation or for any other reason you do not wish to confirm the account, please contact us at the following address</p>
                        <a class="link" href="mailto:briangleguizamon@gmail.com">Contact</a>
                        <br/>        
                        <p>To validate your user account, paste the following ID</p>
                        <div 
                        style="text-align: center;"
                        >
        
                            <p 
                            id="token"
                            style="
                        text-align: center;
                        background-color: #b00002;
                        border-radius: 15px;
                        width: 15rem;
                        padding: 20px;
                        font-size: larger;
                        font-weight: 700;
                        letter-spacing: 3px;
                        ">n${token}</p>
                    </div>
                </div>>
                    <div style="
                        width: 100%;
                        height: 4rem;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        background-color:#b00002 ;
                        border-radius: 10px 10px 0px 0px;
                        color: #fff;
                        ">
                    <a href="https://www.facebook.com"><img src="/public/img/facebook.svg" alt="facebook"></a>
                    <a href="https://twitter.com"><img src="/public/img/twitter.svg" alt="twitter"></a>
                    <a href="https://web.whatsapp.com"<img src="/public/img/whatsapp.svg" alt="whatsapp">></a>
                    </div>
                </div>
            </div>
        </body>
        </html>
                
                `;
    const result = await sendNotificationMail(
      subject,
      "System Admin",
      mail,
      null,
      htmlMessage
    );

    return result;
  } catch (error) {
    return error;
  }
};

const sendMailBannedUser = async (userMail) => {
  try {
    const subject = "Account has been banned";
    const htmlMessage = `<h2>Account has been banned</h2>
                <p>For more information please contact the developers at the following contact form</p>
                <a href="/">Click here</a>        
                `;
    const result = await sendNotificationMail(
      subject,
      "System Admin",
      userMail,
      null,
      htmlMessage
    );

    return result;
  } catch (error) {
    return error;
  }
};

const sendMailBannedComplejo = async (userMail) => {
  try {
    const subject = "Complex banned";
    const htmlMessage = `<h2>Complejo has been banned</h2>
        <p>Your complex has been removed</p>
        <p>For more information please contact the developers at the following contact form</p>
        <a href="/">Click here</a>        
        `;
    const result = await sendNotificationMail(
      subject,
      "System Admin",
      userMail,
      null,
      htmlMessage
    );

    return result;
  } catch (error) {
    return error;
  }
};

const sendMailPasswordRestore = async (userName, mail, token) => {
  try {
    const subject = "User account validation";
    const htmlMessage = `<h2>Restore password ${userName}</h2>
        <p>To reset password please enter the following link</p>
        <a href="http://localhost:3000/forgot-password/${token}">Click here</a>        
        `;
    const result = await sendNotificationMail(
      subject,
      "System Admin",
      mail,
      null,
      htmlMessage
    );

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendNotificationWithMail,
  sendMailValidation,
  sendMailBannedUser,
  sendMailBannedComplejo,
  sendMailPasswordRestore,
};
