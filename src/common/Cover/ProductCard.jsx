import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { Divider } from "@/common/Divider/Divider";
import { ProgressBar } from "@/common/ProgressBar/ProgressBar";
import { OutlinedCard } from "@/common/OutlinedCard/OutlinedCard";
import { getCoverImgSrc } from "@/src/helpers/cover";
import { formatCurrency } from "@/utils/formatter/currency";
import { convertFromUnits, toBN } from "@/utils/bn";
import { formatPercent } from "@/utils/formatter/percent";
import { MULTIPLIER } from "@/src/config/constants";
import { Trans } from "@lingui/macro";
import { useFetchCoverStats } from "@/src/hooks/useFetchCoverStats";
import { useMyLiquidityInfo } from "@/src/hooks/provide-liquidity/useMyLiquidityInfo";
import { useSortableStats } from "@/src/context/SortableStatsContext";
import { useAppConstants } from "@/src/context/AppConstants";
import { classNames } from "@/utils/classnames";
import { CardStatusBadge } from "@/common/CardStatusBadge";
import { InfoTooltip } from "@/common/NewCoverCard/InfoTooltip";
import SheildIcon from "@/icons/SheildIcon";

export const ProductCard = ({
  coverKey,
  productKey,
  productInfo,
  progressFgColor = undefined,
  progressBgColor = undefined,
}) => {
  const router = useRouter();
  const { setStatsByKey } = useSortableStats();
  const { liquidityTokenDecimals } = useAppConstants();

  const { info: liquidityInfo } = useMyLiquidityInfo({ coverKey: coverKey });
  const { activeCommitment, productStatus } = useFetchCoverStats({
    coverKey: coverKey,
    productKey: productKey,
  });

  const imgSrc = getCoverImgSrc({ key: productKey });

  const liquidity = liquidityInfo.totalLiquidity;
  const protection = activeCommitment;
  const utilization = toBN(liquidity).isEqualTo(0)
    ? "0"
    : toBN(protection).dividedBy(liquidity).decimalPlaces(2).toString();

  const id = `${coverKey}-${productKey}`;
  // Used for sorting purpose only
  useEffect(() => {
    setStatsByKey(id, {
      liquidity,
      utilization,
    });
  }, [id, liquidity, setStatsByKey, utilization]);

  const protectionLong = formatCurrency(
    convertFromUnits(activeCommitment, liquidityTokenDecimals).toString(),
    router.locale
  ).long;

  const liquidityLong = formatCurrency(
    convertFromUnits(liquidity, liquidityTokenDecimals).toString(),
    router.locale
  ).long;

  return (
    <OutlinedCard className="p-6 bg-white" type="link">
      <div className="flex items-start justify-between">
        <div
          className={classNames(
            "inline-block max-w-full bg-FEFEFF rounded-full w-14 lg:w-18"
          )}
        >
          <img
            src="/images/covers/empty.svg"
            alt={productInfo.infoObj?.projectName}
            className="bg-DEEAF6 rounded-full"
            data-testid="cover-img"
          />
        </div>
        <div>
          <CardStatusBadge status={productStatus} />
        </div>
      </div>
      <h4
        className="mt-4 font-semibold uppercase text-h4 font-sora text-black"
        data-testid="project-name"
      >
        {productInfo.infoObj?.productName}
      </h4>
      <div className="flex justify-between items-center">
        <div
          className="mt-1 uppercase text-h7 opacity-40 lg:text-sm text-01052D lg:mt-2"
          data-testid="cover-fee"
        >
          <Trans>Cover fee:</Trans>{" "}
          {formatPercent(
            productInfo.cover?.infoObj?.pricingFloor / MULTIPLIER,
            router.locale
          )}
          -
          {formatPercent(
            productInfo.cover?.infoObj?.pricingCeiling / MULTIPLIER,
            router.locale
          )}
        </div>
        {productInfo.cover?.infoObj?.leverage && (
          <InfoTooltip
            infoComponent={
              <p>
                <Trans>
                  Diversified pool with {productInfo.cover.infoObj.leverage}x
                  leverage factor and 50% capital efficiency
                </Trans>
              </p>
            }
          >
            <div className="rounded bg-EEEEEE font-poppins text-black text-xs px-1 border-9B9B9B border-0.5">
              <p className="opacity-60">
                D{productInfo.cover?.infoObj?.leverage}x50
              </p>
            </div>
          </InfoTooltip>
        )}
      </div>

      {/* Divider */}
      <Divider className="mb-4 lg:mb-8" />

      {/* Stats */}
      <div className="flex justify-between px-1 text-h7 lg:text-sm">
        <span className="uppercase text-h7 lg:text-sm">
          <Trans>utilization Ratio</Trans>
        </span>
        <span
          className="font-semibold text-right text-h7 lg:text-sm "
          data-testid="util-ratio"
        >
          {formatPercent(utilization, router.locale)}
        </span>
      </div>

      <InfoTooltip
        infoComponent={
          <div>
            <p>
              <b>
                <Trans>UTILIZATION RATIO:</Trans>{" "}
                {formatPercent(utilization, router.locale)}
              </b>
            </p>
            <p>
              <Trans>Protection</Trans>: {protectionLong}
            </p>
            <p>
              <Trans>Liquidity</Trans>: {protectionLong}
            </p>
          </div>
        }
      >
        <div className="mt-2 mb-4">
          <ProgressBar
            value={utilization}
            bgClass={progressBgColor}
            fgClass={progressFgColor}
          />
        </div>
      </InfoTooltip>

      <div className="flex justify-between px-1 text-01052D opacity-40 text-h7 lg:text-sm">
        <InfoTooltip
          arrow={false}
          infoComponent={
            <div>
              <Trans>Protection</Trans>: {protectionLong}
            </div>
          }
        >
          <div
            className="flex flex-1"
            title={protectionLong}
            data-testid="protection"
          >
            <SheildIcon className="w-4 h-4 text-01052D" />
            <p>
              {
                formatCurrency(
                  convertFromUnits(
                    activeCommitment,
                    liquidityTokenDecimals
                  ).toString(),
                  router.locale
                ).short
              }
            </p>
          </div>
        </InfoTooltip>
        <InfoTooltip
          arrow={false}
          infoComponent={
            <div>
              <Trans>Liquidity</Trans>: {liquidityLong}
            </div>
          }
        >
          <div
            className="flex-1 text-right"
            title={liquidityLong}
            data-testid="liquidity"
          >
            {
              formatCurrency(
                convertFromUnits(liquidity, liquidityTokenDecimals).toString(),
                router.locale
              ).short
            }
          </div>
        </InfoTooltip>
      </div>
    </OutlinedCard>
  );
};