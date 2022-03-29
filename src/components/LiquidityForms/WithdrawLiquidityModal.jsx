import * as Dialog from "@radix-ui/react-dialog";

import { Modal } from "@/components/UI/molecules/modal/regular";
import { ModalCloseButton } from "@/components/UI/molecules/modal/close-button";

import { ModalWrapper } from "@/components/UI/molecules/modal/modal-wrapper";
import { WithdrawLiquidityForm } from "@/components/LiquidityForms/WithdrawLiquidityForm";

export const WithdrawLiquidityModal = ({
  modalTitle,
  isOpen,
  onClose,
  info,
  refetchInfo,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // disabled={withdrawing}
    >
      <ModalWrapper>
        <Dialog.Title className="flex font-bold font-sora text-h2">
          {modalTitle}
        </Dialog.Title>

        <ModalCloseButton
          // disabled={withdrawing}
          onClick={onClose}
        ></ModalCloseButton>
        <WithdrawLiquidityForm info={info} refetchInfo={refetchInfo} />
      </ModalWrapper>
    </Modal>
  );
};
