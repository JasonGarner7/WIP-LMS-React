import React from 'react'
import './css/Files.css'

function Files(props) {
    return (
        <div className='files'>
            <div className='go-back' onClick={props.goBack}>
                &lt; Back to Assignments
            </div>
            <div className='files-content'>
                Files...
            </div>
        </div>
    );
}

export default Files;