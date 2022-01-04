import Head from "next/head";
import { PoliciesTabs } from "@/components/pages/my-policies/PoliciesTabs";
import { PoliciesExpiredPage } from "@/components/pages/my-policies/PoliciesExpiredPage";

export default function MyPoliciesExpired() {
  return (
    <main>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PoliciesTabs active="expired">
        <PoliciesExpiredPage />
      </PoliciesTabs>
    </main>
  );
}