import React, { useMemo } from "react";
import { DescriptionList, ExceptionList, Modal } from "@shopify/polaris";
import { Icons } from "../../constant";
import styles from "./Submissions.module.css";

const ModalSubmission = ({
  open,
  handleClose,
  item,
  formData,
  handleIsReadStatus,
}) => {
  const formTitle = useMemo(() => {
    const data = formData.find((formItem) => formItem?._id === item?.form);
    return data ? data.customForm[0]?.formTitle : "";
  }, []);

  const fieldLabel = useMemo(() => {
    const labelMap = {};
    formData.forEach((obj, index) => {
      obj.customForm.forEach((section) => {
        if (section.element) {
          section.element.forEach((element) => {
            if (obj._id === item?.form) {
              labelMap[element.inputId] = element.attributes.label || element?.title;
            }
          });
        }
      });
    });
    return labelMap;
  }, []);

  return (
    <Modal
      instant
      open={open}
      onClose={handleClose}
      title="Submission Details"
      secondaryActions={[
        {
          content: "Close",
          onAction: handleClose,
        },
        {
          content: "Mark as unread",
          onAction: () => handleIsReadStatus(item._id),
        },
      ]}
    >
      <Modal.Section>
        <div>
          <div className={styles.modalTop}>
            <ExceptionList
              items={[
                {
                  icon: Icons.form,
                  description: `Form -  ${formTitle}`,
                },
              ]}
            />
          </div>
          <DescriptionList
            items={Object.entries(item?.submission[0])
              .filter(([key, value]) => {
                const excludedKey = key.split("_").pop();
                return !["hidden", "paragraph", "heading", "html"].includes(
                  excludedKey
                );
              })
              .map(([key, value]) => {
                const term =
                  key === "file"
                    ? "File"
                    : fieldLabel[key.match(/[a-zA-Z0-9]+/)[0]];
                let val = value;

                if (typeof val === "boolean") {
                  val = val.toString();
                }

                if (val === "") {
                  val = "-";
                }

                if (term === "Checkboxes") {
                  if(Array.isArray(val))
                      val =  val?.map(obj => obj.value).join(",");
                  else
                      val =  JSON.parse(val)?.map(obj => obj.value).join(",");
                }
                if (Array.isArray(val)) {
                  val =
                    val?.length > 0
                      ? val?.map((obj, index) => (
                        <div key={index}>
                          {term === "File" ? (
                            <a
                              href={`https://shopifyappapi.project-demo.info:3008${obj}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {obj}
                            </a>
                          ) : (
                            obj.value
                          )}
                        </div>
                      ))
                      : " - ";
                }
                return {
                  term: (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: term?.charAt(0).toUpperCase() + term?.slice(1),
                      }}
                    />
                  ),
                  description: val,
                };
              })}
          />
        </div>
      </Modal.Section>
    </Modal>
  );
};
export default ModalSubmission;
