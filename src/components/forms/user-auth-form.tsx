import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button>Google</Button>
    </div>
  );
};

export default UserAuthForm;
