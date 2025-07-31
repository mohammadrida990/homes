import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import NewPropertyForm from "./new-property-form";

const NewProperty = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin-dashboard",
          },
          {
            label: "New Property",
          },
        ]}
      />

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">New property</CardTitle>

          <CardContent>
            <NewPropertyForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default NewProperty;
