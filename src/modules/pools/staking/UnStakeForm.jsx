import { useState, useEffect } from "react";
import { RegularButton } from "@/common/components/Button/RegularButton";
import { TokenAmountInput } from "@/common/components/TokenAmountInput/TokenAmountInput";
import { useBlockHeight } from "@/src/hooks/useBlockHeight";
import { useStakingPoolWithdraw } from "@/src/hooks/useStakingPoolWithdraw";
import {
  convertFromUnits,
  convertToUnits,
  isGreater,
  isValidNumber,
} from "@/utils/bn";
import { formatCurrency } from "@/utils/formatter/currency";

export const UnStakeForm = ({
  info,
  stakingTokenSymbol,
  stakedAmount,
  refetchInfo,
  poolKey,
  setModalDisabled,
}) => {
  const blockHeight = useBlockHeight();

  const [inputValue, setInputValue] = useState();

  const { withdrawing, handleWithdraw } = useStakingPoolWithdraw({
    value: inputValue,
    tokenAddress: info.stakingToken,
    tokenSymbol: stakingTokenSymbol,
    poolKey,
    refetchInfo,
  });

  useEffect(() => {
    return () => {
      setInputValue("");
    };
  }, []);

  useEffect(() => {
    setModalDisabled((val) => ({ ...val, w: withdrawing }));
  }, [setModalDisabled, withdrawing]);

  const canWithdraw = isGreater(blockHeight, info.canWithdrawFromBlockHeight);
  const stakingTokenAddress = info.stakingToken;
  const isError =
    inputValue &&
    (!isValidNumber(inputValue) ||
      isGreater(convertToUnits(inputValue || "0"), stakedAmount));

  const handleChooseMax = () => {
    setInputValue(convertFromUnits(stakedAmount).toString());
  };

  const handleChange = (val) => {
    if (typeof val === "string") {
      setInputValue(val);
    }
  };

  return (
    <div className="px-12 mt-6">
      <TokenAmountInput
        inputId={"withdraw-amount"}
        inputValue={inputValue}
        handleChooseMax={handleChooseMax}
        labelText={"Amount you wish to withdraw"}
        onChange={handleChange}
        tokenSymbol={stakingTokenSymbol}
        tokenAddress={stakingTokenAddress}
        disabled={withdrawing}
      >
        <p>
          Staked:{" "}
          {
            formatCurrency(
              convertFromUnits(stakedAmount),
              stakingTokenSymbol,
              true
            ).long
          }
        </p>
        {!canWithdraw && (
          <p className="flex items-center text-FA5C2F">
            Could not withdraw during lockup period
          </p>
        )}
      </TokenAmountInput>

      <RegularButton
        disabled={isError || withdrawing || !canWithdraw}
        className="w-full p-6 mt-8 font-semibold uppercase text-h6"
        onClick={handleWithdraw}
      >
        {withdrawing ? "withdrawing..." : "Unstake"}
      </RegularButton>
    </div>
  );
};
