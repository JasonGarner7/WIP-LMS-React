import React from 'react'
import './css/TakeAssignment.css'
import { db } from '../API'

class TakeAssignment extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleDelete(assignment) {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            await db.endpoints.Assignments.delete(assignment)
            window.location.reload(false)
        }
    }

    async handleSubmit() {
        await db.endpoints.Assignments.patch(this.props.assignmentData, {
            "name": this.assignmentName.value,
            "description": this.description.value
        })

        window.location.reload(false)
    }

    render() {
        console.log(this.props.assignmentData.Questions)
        const questionsJsx = this.props.assignmentData.Questions.map((question, index) => {
            return (
                <div key={index} >
                    <div>{question}</div>
                    <div >
                        <textarea
                            placeholder="Type in your answer"
                            className='take-assignment-response'
                            type="text"
                            cols="75"
                            ref={myinput => (this.description = myinput)}
                        />
                    </div>
                </div>
            )
        });

        return (
            <div className='take-assignment-dialog'>
                <div className="take-assignment-header">
                    <div>
                        <div className='take-assignment-title'>{this.props.assignmentData.name}</div>
                    </div>
                    <div >
                        <div className='take-assignment-description'>{this.props.assignmentData.description}</div>
                    </div>
                </div>
                <div >
                    <div className="questions-list-title"> Questions </div>
                    <div className='take-assignment-questions-list'>{questionsJsx}</div>
                </div>
                <div className='standard-button save' onClick={this.handleSubmit}>
                    Save
                </div>
                <div className='standard-button cancel' onClick={() => { window.location.reload(false) }}>
                    Cancel
                </div>
            </div>
        );
    }
}

export default TakeAssignment;