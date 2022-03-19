import { useState, useEffect } from "react";
import { registry } from "@neptunemutual/sdk";
import { useWeb3React } from "@web3-react/core";

import { getProviderOrSigner } from "@/lib/connect-wallet/utils/web3";
import { useNetwork } from "@/src/context/Network";
import { convertFromUnits } from "@/utils/bn";
import BigNumber from "bignumber.js";
import { useErrorNotifier } from "@/src/hooks/useErrorNotifier";
import { useInvokeMethod } from "@/src/hooks/useInvokeMethod";

export const useAvailableLiquidity = ({ coverKey }) => {
  const { library, account } = useWeb3React();
  const { networkId } = useNetwork();

  const [data, setData] = useState("0");
  const { notifyError } = useErrorNotifier();
  const { invoke } = useInvokeMethod();

  useEffect(() => {
    let ignore = false;

    if (!networkId || !account || !coverKey) {
      return;
    }

    const signerOrProvider = getProviderOrSigner(library, account, networkId);

    async function fetchAvailableLiquidity() {
      try {
        const instance = await registry.PolicyContract.getInstance(
          networkId,
          signerOrProvider
        );

        const onTransactionResult = (result) => {
          const [totalPoolAmount, totalCommitment] = result;
          const availableLiquidity = BigNumber(totalPoolAmount.toString())
            .minus(totalCommitment.toString())
            .toString();

          if (ignore) return;
          setData(convertFromUnits(availableLiquidity).toString());
        };

        const args = [coverKey];
        invoke({
          instance,
          methodName: "getCoverPoolSummary",
          catcher: notifyError,
          onTransactionResult,
          args,
          retry: false,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchAvailableLiquidity();
    return () => {
      ignore = true;
    };
  }, [account, coverKey, invoke, library, networkId, notifyError]);

  return {
    availableLiquidity: data,
  };
};
