import React, { useMemo } from "react";
import { DescriptionList, ExceptionList, Modal } from "@shopify/polaris";
import { Icons } from "../../constant";
import "./logStyles.css"

const ModalLogs = ({
  open,
  handleClose,
  item,
  findAPINameById,
  findFormNameById,
}) => {

  return (
    <Modal
      instant
      open={open}
      onClose={handleClose}
      title="Log Details"
      primaryAction={[
        {
          content: "Close",
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <div>
          <div className="ips-logs-modal-head">
            <ExceptionList
              items={[
                {
                  icon: Icons.form,
                  description: `Form -  ${findFormNameById(item?.formId)}`,
                },
                {
                  icon: Icons.form,
                  description: `API -  ${findAPINameById(item?.apiId)}`,
                },
              ]}
            />
          </div>
          <DescriptionList
            items={[
              {
                term: "Log",
                description: JSON.stringify(item?.log),
              },
            ]}
          />
        </div>
      </Modal.Section>
    </Modal>
  );
};

export default ModalLogs;
