import React from 'react'
import styles from "../../FormStyle.module.css";
import { Icon } from '@shopify/polaris';
import { Icons } from '../../../../constant';
import { Draggable } from 'react-beautiful-dnd';

const ElementItem = ({ id, title, icon, attributes, inputId, index, toggleDrawer }) => {
    return (
        <>
            {inputId ?
                <Draggable draggableId={inputId} index={index}>
                    {(provided, snapshot) => (
                        <div className={styles.contentWrapper} ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                                opacity: snapshot.isDragging ? 0.5 : 1,
                                ...provided.draggableProps.style,
                            }}>
                            <div className={styles.listItem}>
                                <div
                                    className={styles.row}
                                    onClick={() =>
                                        toggleDrawer(id, title, attributes, inputId)
                                    }
                                >
                                    <div className={styles.elementIcon}>
                                        <Icon source={icon ? icon : Icons[id]} />
                                    </div>
                                    <div className={styles.elementTitle}>
                                        <div>
                                            <div>{attributes.label || title}</div>
                                        </div>
                                    </div>
                                    <div {...provided.dragHandleProps}
                                        className={styles.sortInput}
                                        title="Sort this element"
                                    >
                                        <Icon source={Icons.dragElement} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable> : <div className={styles.contentWrapper} key={id}>
                    <div className={styles.listItem}>
                        <div
                            className={styles.row}
                            onClick={() => toggleDrawer(id, title, attributes)}
                        >
                            <div className={styles.elementIcon}>
                                <Icon source={icon ? icon : Icons[id]} />
                            </div>
                            <div className={styles.elementTitle}>
                                <div>{title}</div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>

    )
}

export default ElementItem