"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CloseModalProps {}

const CloseModal: React.FC<CloseModalProps> = ({}) => {
  const router = useRouter();
  return (
    <Button
      className="h-6 w-6 p-0 rounded-md"
      onClick={() => router.back()}
      variant="subtle"
      aria-label="close modal"
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
