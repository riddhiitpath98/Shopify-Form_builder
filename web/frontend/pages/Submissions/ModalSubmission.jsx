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
              labelMap[element.inputId] = element.attributes.label;
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
      title="Detail"
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
            items={Object.entries(item?.submission[0]).map(([key, value]) => {
              const term =
                key === "file"
                  ? "File"
                  : fieldLabel[key.match(/[a-zA-Z0-9]+/)[0]];
              let val = value;

              if (typeof val === "boolean") {
                val = val.toString();
              }

              if (Array.isArray(val)) {
                val = term === "File" ? val.map((obj) => obj).join(", ") : "";
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
// const ModalSubmission = ({
//   open,
//   handleClose,
//   item,
//   formData,
//   handleIsReadStatus,
// }) => {
//   const formTitle = useMemo(() => {
//     const data = formData.find(formItem => formItem?._id === item?.form)
//     return data ? data.customForm[0]?.formTitle : ""
//   }, [])
//   return (
//     <Modal
//       instant
//       open={open}
//       onClose={handleClose}
//       title="Detail"
//       secondaryActions={[
//         {
//           content: "Close",
//           onAction: handleClose,
//         },
//         {
//           content: "Mark as unread",
//           onAction: () => handleIsReadStatus(item._id),
//         },
//       ]}
//     >
//       <Modal.Section>
//         <div>
//           <div className={styles.modalTop}>
//             <ExceptionList
//               items={
//                 [
//                   {
//                     icon: Icons.form,
//                     description: `Form -  ${formTitle}`,
//                   },
//                 ]
//               }
//             />
//           </div>
//           <DescriptionList
//             items={Object.keys(item?.submission).map((key) => {
//               const value = item?.submission[key] || " - ";

//               return {
//                 term: key.charAt(0).toUpperCase() + key.slice(1),
//                 description: value,
//               };
//             })}
//           />
//         </div>
//       </Modal.Section>
//     </Modal>
//   );
// };

export default ModalSubmission;
