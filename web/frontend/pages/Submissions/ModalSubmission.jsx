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
    const data = formData.find(formItem => formItem?._id === item?.form)
    return data ? data.customForm[0]?.formTitle : ""
  }, [])
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
              items={
                [
                  {
                    icon: Icons.form,
                    description: `Form -  ${formTitle}`,
                  },
                ]
              }
            />
          </div>
          <DescriptionList
            items={Object.entries(item?.submission[0]).map(([key, value]) => {
              const term = key.split("_").pop();
              let val = value;
              if (Array.isArray(val)) {
                val = term === 'file' ? val.map(obj => obj.name).join(', ') : val.map(obj => obj.value).join(', ')
              }
              return {
                term: term.charAt(0).toUpperCase() + term.slice(1),
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
