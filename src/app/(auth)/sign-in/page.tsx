import SignIn from "@/components/sign-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          Home
        </Link>
        <SignIn />
      </div>
    </div>
  );
};

export default Page;
