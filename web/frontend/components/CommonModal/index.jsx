import { Modal } from "@shopify/polaris";
import React from "react";

const CommonModal = ({
  active,
  isCancelPlan,
  handleClose,
  handleDelete,
  title,
  description,
  handleCancelSubscription
}) => {
  return (
    <Modal
      //  activator={activator}
      open={active}
      onClose={handleClose}
      title={title}
      primaryAction={{
        destructive: true,
        content: isCancelPlan ? "Agree, Cancel" : "Yes, Delete",
        onAction: isCancelPlan ? handleCancelSubscription : handleDelete,
      }}
      secondaryActions={[
        {
          content: isCancelPlan ? "No, Go back" : "No, I won't",
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Modal.Section>
    </Modal>
  );
};

export default CommonModal;
