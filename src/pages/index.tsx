import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { data: userData } = api.user.getUserData.useQuery(
    { clerkId: user?.id ?? "" },
    {
      enabled: !!user,
      onSuccess: (data) => {
        if (data.redirect) {
          router.replace("/profile");
        }
      },
      refetchOnWindowFocus: false,
    },
  );

  const { data: userContent } = api.reel.getUserReels.useQuery(
    {
      clerkId: user?.id ?? "",
    },
    {
      enabled: !!user,
    },
  );
  return (
    <>
      <Head>
        <title>Content Scheduler</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {JSON.stringify(userData)}
      reels
      {JSON.stringify(userContent?.reels.length)}
    </>
  );
}
