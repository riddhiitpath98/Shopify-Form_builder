import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
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
                onChange={handleEditiorChange}
            />
        </>
    )
}

export default Editor;