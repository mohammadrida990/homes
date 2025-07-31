"use client";

import PropertyForm from "@/components/property-form";
import { Property } from "@/types/property";
import { propertySchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import React from "react";
import { z } from "zod";

type Props = Property;

const EditPropertyForm = ({
  address1,
  address2,
  city,
  postcode,
  bathrooms,
  bedrooms,
  description,
  price,
  status,
}: // images = [],
Props) => {
  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    console.log(data);
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <SaveIcon /> Save property
          </>
        }
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          bathrooms,
          bedrooms,
          description,
          price,
          status,
          // images,
        }}
      />
    </div>
  );
};

export default EditPropertyForm;
