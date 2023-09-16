"use client";

import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface SubscribeLeaveToggleProps {
  subredditId: string;
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  subredditId,
}) => {
  const isSubscribed = false;
  const { loginToast } = useCustomToast();

  const {} = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "There  was a problem",
        description: "Something went wrong, please try again later",
      });
    },
  });

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave Community</Button>
  ) : (
    <Button className="w-full mt-1 mb-4">Join to Post</Button>
  );
};

export default SubscribeLeaveToggle;
