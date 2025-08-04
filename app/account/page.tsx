import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePasswordForm from "./update-password-form";
import DeleteAccountButton from "./delete-account-button";

export default async function Account() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    redirect("/");
  }

  let decodedToken: DecodedIdToken;

  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (e) {
    redirect("/");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="mx-auto max-w-screen-sm">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">My Account</CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Email</Label>

          <div>{decodedToken.email}</div>

          {!!isPasswordProvider && <UpdatePasswordForm />}
        </CardContent>

        {!decodedToken.admin && (
          <CardFooter className="flex flex-col items-start">
            <h2 className="mb-2 font-bold text-red-500 text-2xl">
              Danger Zone
            </h2>

            <DeleteAccountButton />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
