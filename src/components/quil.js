import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyQuillEditor = () => {
    const [content, setContent] = useState('');

    const handleChange = (value) => {
        setContent(value);
    };

    return (
        <div>
            <ReactQuill value={content} onChange={handleChange} />
            <div>
                <h3>Content Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default MyQuillEditor;
