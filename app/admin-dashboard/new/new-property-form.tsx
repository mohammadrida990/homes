"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { z } from "zod";
import { createProperty, savePropertyImages, uploadImages } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewPropertyForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images, ...reset } = data;

    const response = await createProperty(reset, token);

    if (!!response.error || !response.propertyId) {
      toast.error("Error!", {
        description: response.message || "an error occurred",
        duration: 3000,
        icon: "⚠️",
      });
      return;
    }

    const uploadTasks = [];
    const paths: string[] = [];

    // images.forEach((image, index) => {
    //   if (image.file) {
    //     const path = `properties/${
    //       response.propertyId
    //     }/${Date.now()}-${index}-${image.file.name}`;

    //     paths.push(path);
    //   }
    // });

    const uploadedUrls = await uploadImages(
      images.map((i) => i.file).filter((file): file is File => !!file),
      response.propertyId
    );

    const x = await savePropertyImages(
      { propertyId: response.propertyId, images: uploadedUrls },
      token
    );

    console.log(uploadedUrls);
    toast.success("Success!", {
      description: "property created",
      className: "bg-green-500! text-white",
    });

    router.push("/admin-dashboard");
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon />
            Create property
          </>
        }
      />
    </div>
  );
};

export default NewPropertyForm;
