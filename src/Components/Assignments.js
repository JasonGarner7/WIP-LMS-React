import React, { useState } from 'react'
import AssignmentList from './AssignmentList'
import CreateAssignment from './CreateAssignment'
import './css/Assignments.css'
import Files from './Files'

function Assignments(props) {
    const [showContent, setShowContent] = useState(false)
    const [showCreateDialog, setShowCreateDialog] = useState(false)

    let content = <AssignmentList />
    if (showContent) {
        content = <Files goBack={() => setShowContent(false)} />
    }

    function cancel() {
        setShowContent(false)
        setShowCreateDialog(false)
    }
    let createDialog
    let createDialogMask
    if (showCreateDialog) {
        createDialog = <CreateAssignment goBack={cancel} />
        createDialogMask = <div className='dialog-mask' />
    }

    return (
        <div id='assignments' className='assignments'>
            <div className='side-panel'>
                <div
                    className='standard-button side-panel-item'
                    onClick={() => setShowCreateDialog(true)}
                >
                    Create Assignment +
                </div>
                <div className='standard-button side-panel-item' onClick={() => setShowContent(true)}>
                    Files
                </div>
            </div>
            <div id="assignments-dialog">
                {content}
                {createDialogMask}
                {createDialog}
            </div>
        </div>

    );
}

export default Assignments;