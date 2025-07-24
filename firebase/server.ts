import { getApps, ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin";
import { Auth, getAuth } from "firebase-admin/auth";

const serviceAccount = {
  type: "service_account",
  project_id: "fir-auth-3f61a",
  private_key_id: "6edd6e70048c4c221b30c9e7db7ff396b22ba1b5",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRBrsloR8dF/Mn\nlWOeABxYJMVIDho4x3umiLv7GpY4NXVU/c6/780XvQKIwU9MkLTwjN58O8iUr+AI\nPPG+9ftqUTWxhTaCrmqWFA6eLmBUQPECItP4GouWXLDc+e5XryukH59Ar75BDMXi\nBbhIKbVv0iEEf5jccvqkBKbuIk6aY6ueL0oefZmcpRDSgi6fPTAVOW8vUvsvn1FQ\nakrmYmPxguoHUgDhykJbUdbW5PH4bWX+xW8TxgYs2hEhtfIyq+6xbYUzBIUSfRO3\nEv0KR5H/JWCuhbsCrI9yJbbvw0xObgkYBXP6TMR8VRZ5N5fIFOPQh2LyvPHNJfvW\n63y/7MA1AgMBAAECggEAOLAAIjDjnMLJhWMs3IVAKqFyRVvZvatP+/aaMHvh4IWS\n+AVLRF92+iie3tK6PFQEVjaGAiA+giB+fA13LGhOkmNK0gWEJoXBz0jKPBjss/zW\nv9MNNHySfalOp+c6Pdp6VezjhioDSWX65pTRiPSSyawtmyg1nxeppMDEOtHgCltf\nAHrSnCmEP8Mj7dHdsSBdwX1l56o6Ps5KT0Ily9eXkWnc7PX/RF4PvH+fWoY1hG4i\nsurq1xijwEr3O/bctOGlp9AxH5uRSay42cpcSIfUEtfGF+oVUYJ0eXVIeXtfvebD\ndgOzgnrDyB2I4FBuFkVnlgmJTfvEdbxvPnFkieqrkwKBgQDuh0RTqLfw1dP0NDda\nuiGb3xsz0qKVOgWjbeZUSAnVsDK7uGnOn4Uyl8lITNj7MsjBZ7tSST9MopDi5sIm\nUozYoSTAHW5pEZSZLXWpFwyDFB4LGFqgIF6OgRj+SdMP8Exog84GXnwxnq+vA0Cy\nPjSwxAdosKjQTprvTPX8xAL7DwKBgQDgVkJ0ji8k87xTKFo7Z9NXDm1YLN/1tnKj\nES7uhEjSOZnkmAUmtZCVrAWUvOIDZQlxmAC7apIXX14bwkOpQNQSiQuMgNFCO+tC\nFxbtmcTnt3Hgr3N8fN1Gcl/sguHv6P6+ef/3nrwUvIN6Fi8mmnRMQ09/bqnc5dMh\npElbcB/gewKBgBvRRKOpCoKYvVY+fLIlAORnuYlqqDFVCfFMUM9Fc3grS09fK1/A\ndM04rG21IJzzCDyd91eaWTp7vv/nP38uo2RkLqAFDqpMNZNDnPQyTvA+eV574Z3J\nCJ3/6kVFoMq8EH0j2fQeMseqpPx5GaNv4781rVOFPrrEYAdGZ22qAlr7AoGBANGj\naki3UhEK//MJ44BeHt3cqovaq5NXYrtF5ICZ998UWt6GvVGWHD3x2elLtT2M3o1b\niVuaVFkpEq2IFWiGH2gOz08GVga6Lbe+EfwJVTtgbzeTXa14leMuILvI91AVgHEJ\nWwzQNlx+abLeJkPB1GosAI9KH8xArNNkTfT3y6IfAoGAcgKlwNBE8epGX9lHp+1F\nZuRSeU65O5Ena+KJbqlMOOtiWFC8ZoxFlUM0DzDcvGPbTW6zTsdHUKmkkucLFkwr\nwtXXpSpLOVfzXS/HUZSJPDZPdFXRAtaAFxIZLQC7MDwYzu1sZ3cY1XQlrUSVvClD\n4q3m77s5oAvp0vkHYd6Mwuw=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@fir-auth-3f61a.iam.gserviceaccount.com",
  client_id: "106970749650491950351",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fir-auth-3f61a.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
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
