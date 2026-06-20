import { OAuth2Client } from "google-auth-library";
import {ENV_VAR} from "../utils/env.js";

const googleClientAuth = new OAuth2Client(ENV_VAR.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token, next) => {
  try {
    const ticket = await googleClientAuth.verifyIdToken({ // Verify the token with Google's OAuth2Client
      idToken: token, // idToken: "token" is the token received from the client after Google authentication
      audience: ENV_VAR.GOOGLE_CLIENT_ID, // audience: ENV_VAR.GOOGLE_CLIENT_ID ensures that the token is intended for our application
    });
    const payload = ticket.getPayload(); // payload contains the user's information extracted from the token, such as email, name, and Google ID (sub)

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    next(error);
  }
};


export { verifyGoogleToken, googleClientAuth };