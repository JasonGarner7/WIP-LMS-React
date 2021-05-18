import React, { useState } from 'react'
import StudentList from './StudentList'
import './css/Assignments.css'
import AddStudent from './AddStudent'

function Students(props) {
    const [showContent, setShowContent] = useState(false)
    const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)

    // Just console logged this for now to clear up some warnings in the browser
    console.log(showContent)

    let content = <StudentList />

    function cancel() {
        setShowContent(false)
        setShowAddStudentDialog(false)
    }

    let addStudentDialog
    let addStudentDialogMask
    if (showAddStudentDialog) {
        addStudentDialog = <AddStudent student={{}} goBack={cancel} />
        addStudentDialogMask = <div className='dialog-mask' />
    }

    return (
        <div id='students' className='students'>
            <div className='side-panel'>
                <div className='standard-button side-panel-item' onClick={() => setShowAddStudentDialog(true)}>Add Student +</div>
            </div>
            <div id="students-dialog">
                {content}
                {addStudentDialogMask}
                {addStudentDialog}
            </div>
        </div>

    );
}

export default Students;