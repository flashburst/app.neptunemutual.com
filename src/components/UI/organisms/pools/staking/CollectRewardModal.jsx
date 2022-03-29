import { useState } from "react";
import { Modal } from "@/components/UI/molecules/modal/regular";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalCloseButton } from "@/components/UI/molecules/modal/close-button";
import { TabHeader } from "@/components/UI/molecules/tabheader";
import { HarvestForm } from "@/components/UI/organisms/pools/staking/HarvestForm";
import { UnStakeForm } from "@/components/UI/organisms/pools/staking/UnStakeForm";
import { ModalWrapper } from "@/components/UI/molecules/modal/modal-wrapper";

const headers = [
  {
    name: "harvest",
    displayAs: "Harvest",
  },
  {
    name: "withdraw",
    displayAs: "Withdraw",
  },
];

export const CollectRewardModal = ({
  info,
  refetchInfo,
  poolKey,
  stakedAmount,
  stakingTokenSymbol,
  rewardAmount,
  rewardTokenAddress,
  rewardTokenSymbol,
  isOpen,
  onClose,
  modalTitle,
}) => {
  const [activeTab, setActiveTab] = useState(headers[0].name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // disabled={withdrawingRewards || withdrawing}
    >
      <ModalWrapper className="sm:min-w-600">
        <div className="px-12">
          <Dialog.Title className="flex font-bold font-sora text-h2">
            {modalTitle}
          </Dialog.Title>
        </div>

        <ModalCloseButton
          // disabled={withdrawingRewards || withdrawing}
          onClick={onClose}
        ></ModalCloseButton>

        <div className="mt-6">
          <TabHeader
            onClick={setActiveTab}
            headers={headers}
            activeTab={activeTab}
          />

          {activeTab == "harvest" ? (
            <HarvestForm
              stakedAmount={stakedAmount}
              rewardAmount={rewardAmount}
              rewardTokenAddress={rewardTokenAddress}
              stakingTokenSymbol={stakingTokenSymbol}
              rewardTokenSymbol={rewardTokenSymbol}
              poolKey={poolKey}
              refetchInfo={refetchInfo}
            />
          ) : (
            <UnStakeForm
              info={info}
              poolKey={poolKey}
              stakedAmount={stakedAmount}
              stakingTokenSymbol={stakingTokenSymbol}
              refetchInfo={refetchInfo}
            />
          )}
        </div>
      </ModalWrapper>
    </Modal>
  );
};
