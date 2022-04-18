import { Container } from "@/common/components/Container/Container";
import { AcceptRulesForm } from "@/common/components/AcceptRulesForm/AcceptRulesForm";
import { useCoverInfo } from "@/src/hooks/useCoverInfo";
import { useRouter } from "next/router";
import { CoverActionsFooter } from "@/common/components/Cover/CoverActionsFooter";
import { CoverPurchaseResolutionSources } from "@/common/components/Cover/Purchase/CoverPurchaseResolutionSources";
import { SeeMoreParagraph } from "@/src/common/components/SeeMoreParagraph";
import { getCoverImgSrc, toBytes32 } from "@/src/helpers/cover";
import { useMyLiquidityInfo } from "@/src/hooks/provide-liquidity/useMyLiquidityInfo";
import { convertFromUnits } from "@/utils/bn";
import { useAvailableLiquidity } from "@/src/hooks/provide-liquidity/useAvailableLiquidity";
import { HeroStat } from "@/src/common/components/HeroStat";
import { CoverProfileInfo } from "@/common/components/CoverProfileInfo/CoverProfileInfo";
import { BreadCrumbs } from "@/common/components/BreadCrumbs/BreadCrumbs";
import { Hero } from "@/src/common/components/Hero";
import { CoverRules } from "@/common/components/CoverRules/CoverRules";
import { useState } from "react";
import { PurchasePolicyForm } from "@/src/common/components/CoverForm/PurchasePolicyForm";
import { formatCurrency } from "@/utils/formatter/currency";

export const CoverPurchaseDetailsPage = () => {
  const [acceptedRules, setAcceptedRules] = useState(false);
  const router = useRouter();
  const { cover_id } = router.query;
  const coverKey = toBytes32(cover_id);
  const { coverInfo } = useCoverInfo(coverKey);

  const { availableLiquidity } = useAvailableLiquidity({ coverKey });
  const { info } = useMyLiquidityInfo({ coverKey });

  if (!coverInfo) {
    return <>loading...</>;
  }

  const handleAcceptRules = () => {
    setAcceptedRules(true);
  };

  const imgSrc = getCoverImgSrc(coverInfo);
  const totalLiquidity = info.totalLiquidity;

  return (
    <main>
      {/* hero */}
      <Hero>
        <Container className="px-2 py-20">
          <BreadCrumbs
            pages={[
              { name: "Home", href: "/", current: false },
              {
                name: coverInfo?.coverName,
                href: `/cover/${cover_id}/options`,
                current: false,
              },
              { name: "Purchase Policy", current: true },
            ]}
          />
          <div className="flex flex-wrap">
            <CoverProfileInfo
              coverKey={coverKey}
              imgSrc={imgSrc}
              projectName={coverInfo?.coverName}
              links={coverInfo?.links}
            />

            {/* Total Liquidity */}
            <HeroStat title="Total Liquidity">
              {
                formatCurrency(convertFromUnits(totalLiquidity), "DAI", true)
                  .long
              }
            </HeroStat>
          </div>
        </Container>
      </Hero>

      {/* Content */}
      <div className="pt-12 pb-24 border-t border-t-B0C4DB">
        <Container className="grid grid-cols-3 md:gap-32">
          <div className="col-span-3 md:col-span-2">
            <span className="hidden md:block">
              <SeeMoreParagraph text={coverInfo.about}></SeeMoreParagraph>
            </span>
            {acceptedRules ? (
              <div className="mt-12">
                <PurchasePolicyForm coverKey={coverKey} />
              </div>
            ) : (
              <>
                <CoverRules rules={coverInfo?.rules} />
                <br className="mt-20" />
                <AcceptRulesForm onAccept={handleAcceptRules}>
                  I have read, understood, and agree to the terms of cover rules
                </AcceptRulesForm>
              </>
            )}
          </div>

          <span className="block col-span-3 row-start-1 md:hidden mb-11">
            <SeeMoreParagraph text={coverInfo.about}></SeeMoreParagraph>
          </span>
          <CoverPurchaseResolutionSources coverInfo={coverInfo}>
            <hr className="mt-4 mb-6 border-t border-B0C4DB/60" />
            <div
              className="flex justify-between pb-2"
              title={formatCurrency(availableLiquidity).long}
            >
              <span className="">Available Liquidity:</span>
              <strong className="font-bold text-right">
                {formatCurrency(availableLiquidity).short}
              </strong>
            </div>
          </CoverPurchaseResolutionSources>
        </Container>
      </div>

      <CoverActionsFooter activeKey="purchase" />
    </main>
  );
};
