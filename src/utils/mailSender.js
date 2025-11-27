import nodemailer from 'nodemailer';


// function to send mail
export const sendMail = async (to, subject, text) => {

   try {
       // create transporter
       const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || "smtp.gmail.com",
            auth: {
                 user: process.env.EMAIL_USER || "",
                 pass: process.env.EMAIL_PASSWORD || "",
            }
       });
  
       // send mail
      const response = await transporter.sendMail({
            from: process.env.EMAIL_USER || "",
            to,
            subject,
            html : text,
      })
      // console.log("Email sent:", response);
        return response;
   } catch (error) {
        console.error("Error sending email:", error.message);
   }
}