import React, { useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import FormDrawer from "../../FormDrawer/FormDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllElement,
  addFooterElement,
  addHeaderElement,
  handleDragDrop,
} from "../../../../redux/reducers/inputFieldSlice";
import { Icons, SUBSCRIPTION_TYPES } from "../../../../constant";
import styles from "../../FormStyle.module.css";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ElementItem from "./ElementItem";


const ElementsProvider = ({ isEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tabId, setTabId] = useState({});
  const formData = useSelector((state) => state?.inputField?.inputFields);
  const user = useSelector(state => state.user.userData.user);
  const subscription = useSelector(state => state.user.userData.subscription);

  const formDataById = useSelector(
    (state) => state?.inputField?.editFormData?.formData?.customForm
  );

  const dispatch = useDispatch();
  const toggleDrawer = (id, title, attributes, inputId) => {
    setTabId({ id, title, attributes, inputId });
    setIsOpen((prev) => !prev);
  };

  const isShowDrawer = formData.length >= subscription?.features?.form?.number_of_fields_per_form && tabId.id === 'add_element';
  const formElements = [
    {
      id: "header",
      title: "",
      data: [
        {
          id: "header_tab",
          title: "Header",
          icon: Icons.header_tab,
          attributes: {
            showHeader: true,
            title: "New Form",
            description:
              "Leave your message",
            email: "",
          },
        },
      ],
    },
    {
      id: "element",
      title: "Elements",
      data: [
        {
          id: "add_element",
          title: "Add Element",
          icon: Icons.add_element,
        },
      ],
    },
    {
      id: "footer",
      title: "",
      data: [
        {
          id: "footer_tab",
          title: "Footer",
          type: "editor",
          icon: Icons.footer_tab,
          attributes: {
            text: "",
            submitButton: "Submit",
            resetButton: false,
            buttonWidth: false,
            resetButtonText: "Reset",
            footerAlign: "left",
          },
        },
      ],
    },
  ];
  useEffect(() => {
    formElements?.map(({ data }) => {
      data?.map((attribute) => {
        if (attribute?.id === "header_tab" && !isEdit) {
          dispatch(addHeaderElement(attribute));
        } else if (attribute?.id === "footer_tab" && !isEdit) {
          dispatch(addFooterElement(attribute));
        } else if (attribute?.id === "add_element") {
          dispatch(addAllElement(attribute));
        }
      });
    });
  }, []);

  const handleOnDrag = (result) => {
    const cloneData = [...formData]
    const [removed] = cloneData.splice(result.source.index, 1);
    cloneData.splice(result.destination.index, 0, removed);
    dispatch(handleDragDrop(cloneData))
  }

  const formElementsKeyArray = formElements.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, []);

  return (
    <section>
      {!isEdit
        ? formElementsKeyArray &&
        Object.entries(formElementsKeyArray).map(([key, value]) => (
          <div className={styles.rootContent} key={key}>
            <div className={styles.contentWrapper}>
              <div>
                <div className={styles.subHeading}>{value?.title}</div>
                <div >
                  <DragDropContext onDragEnd={handleOnDrag}>
                    <Droppable droppableId="droppable">
                      {(provided) =>
                      (<div {...provided.droppableProps} ref={provided.innerRef}>
                        {formData &&
                          key === "element" &&
                          formData?.map(
                            ({ id, title, icon, attributes, inputId }, index) => (
                              <ElementItem key={inputId}  {...{ id, title, icon, attributes, inputId, index, toggleDrawer }} />
                            )
                          )}
                        {provided.placeholder}
                      </div>)}
                    </Droppable>
                  </DragDropContext>
                  {value?.data?.map(({ id, icon, title, attributes }) => (
                    <ElementItem  {...{ id, icon, title, attributes, toggleDrawer }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
        : formDataById &&
        Object.entries(formDataById)?.map(
          ([key, { header, allElements, element, footer }]) => {
            const section = header || allElements || footer;
            return (
              <div className={styles.rootContent} key={key}>
                <div className={styles.contentWrapper}>
                  <div>
                    {section && (
                      <ElementItem  {...{ id: section.id, title: section.title, attributes: section.attribute, toggleDrawer }} />
                    )}
                    {element && formData && formData.length > 0 && (
                      <div className={styles.subHeading}>Elements</div>
                    )}
                    <DragDropContext onDragEnd={handleOnDrag}>
                      <Droppable droppableId="droppable">
                        {(provided) =>
                        (<div {...provided.droppableProps} ref={provided.innerRef}>
                          {element &&
                            formData &&
                            formData.map(({ id, title, attributes, inputId }, index) => (
                              <div>
                                <ElementItem key={inputId} {...{ id, title, attributes, inputId, index, toggleDrawer }} />
                              </div>
                            ))}
                          {provided.placeholder}
                        </div>)}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              </div>
            );
          }
        )}
      {!isShowDrawer && <FormDrawer {...{ isEdit, isOpen, toggleDrawer, tabId }} />}
    </section >
  );
};

export default ElementsProvider;
