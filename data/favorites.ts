import "server-only";
import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";

export const getUserFavorites = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return {};
  }

  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {};
  }

  const favoritesSnapshot = await firestore
    .collection("favorites")
    .doc(verifiedToken.uid)
    .get();

  const favoritesData = favoritesSnapshot.data();

  return favoritesData || {};
};
