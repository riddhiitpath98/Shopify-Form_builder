import { Modal } from "@shopify/polaris";
import React from "react";

const CommonModal = ({
  active,
  handleClose,
  handleDelete,
  title,
  description,
}) => {
  return (
    <Modal
      //  activator={activator}
      open={active}
      onClose={handleClose}
      title={title}
      primaryAction={{
        destructive: true,
        content: "Yes, Delete",
        onAction: handleDelete,
      }}
      secondaryActions={[
        {
          content: `No, I won't`,
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