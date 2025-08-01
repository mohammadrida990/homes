"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";
import ImageKit from "imagekit";

export const createProperty = async (
  data: {
    address1: string;
    address2?: string;
    city: string;
    postcode: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    status: "draft" | "for-sale" | "withdrawn" | "sold";
  },
  token: string
) => {
  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "an error occurred",
    };
  }

  const property = await firestore.collection("properties").add({
    ...data,
    created: new Date(),
    updated: new Date(),
    createdBy: verifiedToken.uid,
  });

  return {
    propertyId: property.id,
  };
};

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function uploadImageServer(
  buffer: Buffer,
  fileName: string,
  propertyId: string
) {
  return await imagekit.upload({
    file: buffer, // Node.js Buffer
    fileName,
    folder: `properties/${propertyId}`,
  });
}

export async function uploadImages(files: File[], propertyId: string) {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await uploadImageServer(buffer, file.name, propertyId);
    uploadedUrls.push(result.url);
  }

  return uploadedUrls;
}

export const savePropertyImages = async (
  { propertyId, images }: { propertyId: string; images: string[] },
  token: string
) => {
  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "unauthorized",
    };
  }

  //   const validation = propertyDataSchema.safeParse(data);
  // if (!validation.success) {
  //   return {
  //     error: true,
  //     message: validation.error.issues[0]?.message ?? "an error occurred",
  //   };
  // }

  await firestore.collection("properties").doc(propertyId).update({ images });
};
