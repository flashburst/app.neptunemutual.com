import { useCoverInfo } from "@/components/pages/cover/useCoverInfo";
import { useAvailableCovers } from "@/components/pages/home/useAvailableCovers";
import { Alert } from "@/components/UI/atoms/alert";
import { Container } from "@/components/UI/atoms/container";
import { AcceptRulesForm } from "@/components/UI/organisms/accept-rules-form";
import { CoverPurchaseResolutionSources } from "@/components/UI/organisms/cover/purchase/resolution-sources";
import { ReportingHero } from "@/components/UI/organisms/reporting/new/ReportingHero";
import Link from "next/link";
import { useRouter } from "next/router";

export const ReportingNewIncidentPage = () => {
  const router = useRouter();
  const { cover_id } = router.query;

  const { coverInfo } = useCoverInfo();
  const { availableCovers } = useAvailableCovers();

  if (!coverInfo) {
    return <>loading...</>;
  }

  if (!availableCovers) {
    return <>loading...</>;
  }

  const imgSrc = "/covers/clearpool.png";
  const title = coverInfo?.coverName;

  const handleAcceptRules = () => {
    router.push(`/reporting/${cover_id}/create`);
  };

  return (
    <main>
      {/* hero */}
      <ReportingHero coverInfo={coverInfo} title={title} imgSrc={imgSrc} />

      {/* Content */}
      <div className="pt-12 pb-24 border-t border-t-B0C4DB">
        <Container className="grid gap-32 grid-cols-3">
          <div className="col-span-2">
            {/* Rules */}
            <div>
              <h4 className="text-h4 font-sora font-semibold mt-10 mb-6">
                Cover Rules
              </h4>
              <p className="mb-4">
                Carefully read the following terms and conditions. For a
                successful claim payout, all of the following points must be
                true.
              </p>
              <ol className="list-decimal pl-5">
                {coverInfo.rules.split("\n").map((x, i) => (
                  <li key={i}>
                    {x
                      .trim()
                      .replace(/^\d+\./g, "")
                      .trim()}
                  </li>
                ))}
              </ol>
            </div>

            <br className="mt-20" />
            {/* Read more */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-40 hover:underline mt-4"
            >
              See More
            </a>

            <br className="mb-16" />
            <AcceptRulesForm
              onAccept={handleAcceptRules}
              buttonText={"REPORT AN INCIDENT"}
            >
              I have read, understood, and agree to the terms of cover rules
              <div className="mt-16">
                <h2 className="font-sora font-bold text-h2 mb-6">
                  Active Reporting
                </h2>

                <p className="text-h4 text-8F949C mb-10">
                  There are no known incidents related to Clearpool Cover.
                </p>
                <Alert>
                  If you just came to know about a recent incident of Uniswap
                  Exchange, carefully read the cover rules above. You can earn
                  20% of the minority fees if you are the first person to report
                  this incident.
                </Alert>
              </div>
            </AcceptRulesForm>
          </div>
          <CoverPurchaseResolutionSources>
            <Link href="#">
              <a className="block text-4E7DD9 hover:underline mt-3">
                Neptune Mutual Reporters
              </a>
            </Link>
          </CoverPurchaseResolutionSources>
        </Container>
      </div>
    </main>
  );
};
