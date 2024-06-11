'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAuthStatus } from './actions'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from "next/link";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  // const router = useRouter()

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    console.log("auth-callback:::", configurationId);
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  console.log("Auth-callback:: configId ", configId);
  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      // router.push(`/configure/preview?id=${configId}`);
    } else {
      // return;
      console.log("no config id");
      // router.push("/");
    }
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
        {data?.success && configId ? (
          <Link href={`/configure/preview?id=${configId}`}>Continue</Link>
        ) : (
          <Link href="/">Home</Link>
        )}
      </div>
    </div>
  );
};

export default Page
