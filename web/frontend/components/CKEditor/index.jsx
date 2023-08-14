import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from 'ckeditor5-custom-build';

const Editor = ({ value, handleEditiorChange, name, label, id }) => {

    return (
        <>
            <label htmlFor={id} >
                {label}
            </label>
            <CKEditor
                editor={ClassicEditor}
                id={id}
                name={name}
                data={value}
                onReady={editor => {
                    // console.log('Editor is ready to use!', editor);
                }}
                onChange={handleEditiorChange}
            />
            {/* <ErrorMessage {...{ name }} component={TextError} /> */}
        </>
    )
}

export default Editor;