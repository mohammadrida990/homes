import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavorites } from "@/data/favorites";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import RemoveFavoriteButton from "./remove-favorite-button";

export default async function MyFavorites({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: Promise<any>;
}) {
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;
  const pageSize = 2;
  const favorites = await getUserFavorites();
  const allFavorites = Object.keys(favorites);
  const totalPages = Math.ceil(allFavorites.length / pageSize);

  const paginatedFavorites = allFavorites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (!paginatedFavorites.length && page > 1) {
    redirect(`/account/my-favorites?page=${totalPages}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties = {} as any;
  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="mt-5 py-4 font-bold text-4xl">My favorites</h1>

      {!paginatedFavorites.length && (
        <h2 className="py-10 font-bold text-zinc-400 text-3xl text-center">
          You have no favorite properties.
        </h2>
      )}

      {!!paginatedFavorites.length && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedFavorites.map((favorite) => {
              const property = properties.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (property: any) => property.id === favorite
              );
              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(", ");

              return (
                <TableRow key={favorite}>
                  <TableCell>{address}</TableCell>

                  <TableCell>
                    {!!property && (
                      <PropertyStatusBadge status={property?.status} />
                    )}
                  </TableCell>

                  <TableCell className="flex justify-end gap-1">
                    {!!property && (
                      <>
                        <Button asChild variant="outline">
                          <Link href={`/property/${property.id}`}>
                            <EyeIcon />
                          </Link>
                        </Button>

                        <RemoveFavoriteButton propertyId={property.id} />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                {Array.from({ length: totalPages }).map((_, i) => {
                  return (
                    <Button
                      disabled={page === i + 1}
                      key={i}
                      asChild={page !== i + 1}
                      variant="outline"
                      className="mx-1"
                    >
                      <Link href={`/account/my-favorites?page=${i + 1}`}>
                        {i + 1}
                      </Link>
                    </Button>
                  );
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
