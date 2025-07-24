import { getApps, ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin";
import { Auth, getAuth } from "firebase-admin/auth";

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_FIREBASE_TYPE!,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID!,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!,
  client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID!,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URL!,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URL!,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CERT_URL!,
  client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CERT_URL!,
  universe_domain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN!,
};

let auth: Auth;
const currentApps = getApps();

if (!currentApps.length) {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
  auth = getAuth(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
}

export { auth };
