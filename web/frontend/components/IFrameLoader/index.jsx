import { Modal } from '@shopify/polaris'
import styles from "./IFrameLoader.module.css";
import React from 'react'

const IFrameLoader = ({ open, handleClose, src, title, height, width }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            title={title}
            large
        >
            <div className={styles.iframeContainer}>
                <Modal.Section>
                    <iframe  {...{ src, height, width }}
                    />
                </Modal.Section>
            </div >
        </Modal>
    )
}

export default IFrameLoader