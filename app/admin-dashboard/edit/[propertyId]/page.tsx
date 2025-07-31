import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import React from "react";
import EditPropertyForm from "./edit-property-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditProperty = async ({ params }: { params: Promise<any> }) => {
  const paramsValue = await params;

  const property = await getPropertyById(paramsValue.propertyId);
  console.log(property);
  return (
    <div>
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin-dashboard",
          },
          {
            label: "Edit Property",
          },
        ]}
      />

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">Edit property</CardTitle>

          <CardContent>
            <EditPropertyForm
              id={property.id}
              address1={property.address1}
              address2={property.address2}
              city={property.city}
              postcode={property.postcode}
              price={property.price}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              description={property.description}
              status={property.status}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EditProperty;
