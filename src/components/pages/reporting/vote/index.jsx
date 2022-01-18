import { ReportingHero } from "@/components/UI/organisms/reporting/new/ReportingHero";
import { useCoverInfo } from "@/components/pages/cover/useCoverInfo";
import { RecentVotesTable } from "@/components/UI/organisms/reporting/RecentVotesTable";
import { ActiveReportSummary } from "@/components/UI/organisms/reporting/ActiveReportSummary";
import { useRouter } from "next/router";

export const VotePage = () => {
  const router = useRouter();
  const { cover_id } = router.query;
  const { coverInfo } = useCoverInfo(cover_id);

  if (!coverInfo) {
    return <>loading...</>;
  }

  const imgSrc = `/images/covers/${coverInfo?.key}.png`;
  const title = coverInfo.coverName;

  return (
    <>
      <ReportingHero {...{ coverInfo, imgSrc, title }} />
      <hr className="border-b border-B0C4DB" />
      <div className="px-28 pb-48">
        <div className="py-14">
          <ActiveReportSummary />
        </div>
        <RecentVotesTable />
      </div>
    </>
  );
};