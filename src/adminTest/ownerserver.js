import { getAuth } from "firebase-admin/auth";

export const createCustomToken = async (uid) => {
  try {
    const customToken = await getAuth().createCustomToken(uid);

    // Send token back to client or handle it as needed
    return customToken;
  } catch (error) {
    console.log("Error creating custom token:", error);
    throw error; // Optionally, rethrow the error to handle it in the caller
  }
};
