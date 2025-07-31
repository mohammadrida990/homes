"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { z } from "zod";
import { saveNewProperty } from "./actions";
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

    const response = await saveNewProperty({ ...data, token });

    if (!!response.error) {
      toast.error("Error!", {
        description: response.message || "an error occurred",
        duration: 3000,
        icon: "⚠️",
      });
      return;
    }

    toast.success("Success!", {
      description: "property created",
      className: "bg-green-500! text-white",
    });

    router.push("/admin-dashboard");
    console.log({ response });
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
