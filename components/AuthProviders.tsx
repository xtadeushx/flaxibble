"use client"
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signUrl?: string;
  callbackUrl: string;
  signUrlParams?: Record<string, string> | null;
}
type Providers = Record<string, Provider>

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, [])


  if (providers) {
    return (
      <div className="">
        {Object.values(providers).map((provider: Provider, index) => (
          <button key={index} onClick={() => signIn(provider?.id)}>{provider.id}</button>
        ))}
      </div>
    )
  }
}

export default AuthProviders