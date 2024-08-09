import handleError from "../controllers/errorControl.js";
import {transporter} from "./mail.js";

export const sendVerificationEmail = (email, token) =>{
  try{
    transporter.sendMail({
      from: "Jackson Gislason",
      to: email,
      subject: "Verify Your Email",
      html: `<p>Thank You for Siging up. Please verify your email.</p><a href="${process.env.CLIENT_URL}/login"><button>Verify</button></a>`,
    });
    
    return token;
  }catch(err){
    return handleError(err);
  }
}

export const sendResetPasswordEmail = (email, token)=>{
  try{
    transporter.sendMail({
      from: "Jackson Gislason",
      to: email,
      subject: "Reset Password Request",
      text: token,
      html: `<a href="${process.env.CLIENT_URL}/reset-password/${token}"><button>Reset</button></a>`,
    });
    return token;
  }catch(err){
    return handleError(err);
  }
}