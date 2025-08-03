import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./register-form";
import Link from "next/link";

export default function Register() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-3xl">Register</CardTitle>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>

      <CardFooter>
        Already have an account?
        <Link href="/login" className="pl-2 underline">
          Log in here
        </Link>
      </CardFooter>
    </Card>
  );
}
