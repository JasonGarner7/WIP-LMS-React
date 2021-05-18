import React from 'react'
import ReactDOM from 'react-dom'
import Table from 'react-bootstrap/Table'
import './css/Students.css'
import './css/StudentList.css'
import deleteIcon from '../resources/delete.png'
import folderIcon from '../resources/folder-alt.png'
import ViewStudent from './ViewStudent'
import StudentAssignmentList from './StudentAssignmentList'
import { db } from '../API';

class StudentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.studentList = []
    }

    componentDidMount() {
        db.endpoints.Students.getAll().then(
            students => {
                this.studentList = students.data;
                this.studentsHtml = this.renderTable();
            }
        )
    }

    showSingleStudent(student) {
        ReactDOM.render((
            <div>
                <div className='dialog-mask'></div>
                <ViewStudent student={student} />
            </div>

        ), document.querySelector('#students'));
        this.individualStudent = true
    }

    showStudentAssignments(student) {
        ReactDOM.render((
            <div id='students' className='students'>  <div className='side-panel'>
                <div className='standard-button side-panel-item' onClick={() => window.location.reload(false)}>Back</div>
            </div>
                <div id="students-dialog">
                    <div>
                        {/* <div className='dialog-mask'></div> */}
                        <StudentAssignmentList student={student} />
                    </div>
                </div>
            </div>

        ), document.querySelector('#students'));
        this.individualStudent = true
    }


    async deleteStudent(id) {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await db.endpoints.Students.delete({ id }, {})
            window.location.reload(false)
        }
    }

    async renderTable() {
        const headerJsx = (
            <tr id="tableHeader" className="student-list-headers">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th />
            </tr>
        )

        const bodyJsx = this.studentList.map((student, index) => {
            const { id, firstName, lastName, age, grade } = student
            return (
                <tr key={id} className="student-row" >
                    <td onClick={() => { this.showSingleStudent(student) }}> {firstName} </td>
                    <td onClick={() => { this.showSingleStudent(student) }}> {lastName} </td>
                    <td onClick={() => { this.showSingleStudent(student) }}> {age} </td>
                    <td onClick={() => { this.showSingleStudent(student) }}> {grade} </td>
                    <td >
                        <img onClick={() => { this.showStudentAssignments(student) }}
                            className="student-assignments-list-view"
                            src={folderIcon} alt="Folder Icon" />


                        <img onClick={() => { this.deleteStudent(student.id) }}
                            className="delete-student-list-view"
                            src={deleteIcon} alt="Delete Icon" />
                    </td>
                </tr>
            )
        })

        ReactDOM.render((
            <Table striped bordered hover responsive id="table">
                <tbody id="tableBody">
                    {headerJsx}
                    {bodyJsx}
                </tbody>
            </Table>
        ), document.querySelector('#table'));
    }



    render() {
        return (
            <div className="student-list">
                <div id="table">
                </div>
            </div>
        );
    }
}

export default StudentInfo;