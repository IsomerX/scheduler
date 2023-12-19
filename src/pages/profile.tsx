import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

const Profile = () => {
  const [name, setName] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const updateName = api.user.updateName.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-fit shadow-md">
        <CardHeader>
          <CardTitle>Content-Scheduler</CardTitle>
          <CardDescription>
            Enter your name to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="What can I call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              onClick={() =>
                updateName.mutate({
                  name: name,
                  clerkId: user?.id ?? "",
                })
              }
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
