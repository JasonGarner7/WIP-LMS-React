import React from 'react'
import './css/CreateAssignment.css'
import './css/EditAssignment.css'
import { db } from '../API'

class CreateAssignment extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddProblem = this.handleAddProblem.bind(this)
        this.state = {
            questions: <div className="question-list-item" />,
            answers: <div />
        }
    }
    handleAddProblem() {
        this.setState({questions:
                <div className="question-list-item">
                    Question:&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                            className='assignment-question'
                            type="text"
                            placeholder="Type your question here"
                            // ref={myinput => (this.assignmentName = myinput)}
                        />
                </div>
        });
        this.setState({answers:
            <div>
                Answer:&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                        className='assignment-question'
                        type="text"
                        placeholder="Type the answer here"
                        // ref={myinput => (this.assignmentName = myinput)}
                    />
            </div>
        });
    }

    async handleSubmit() {
        let user = await db.endpoints.Assignments.getAll();
        await db.endpoints.Assignments.create(user.Assignments, {})
        user = await db.endpoints.Assignments.getAll();
        let size = user.data.length
        await db.endpoints.Assignments.patch(user.data[size - 1], {
            "name": this.assignmentName.value,
            "description": this.description.value
        })

        window.location.reload(false) // refresh page so that other areas of app will update
    }

    render() {
        return (
            <div className='edit-assignment-dialog'>
                <div className="edit-assignment-header">
                    <div>
                        <input
                            className='edit-assignment-title'
                            type="text"
                            defaultValue="Untitled Assignment"
                            ref={myinput => (this.assignmentName = myinput)}
                        />
                    </div>
                    <div >
                        <textarea
                            className='edit-assignment-description'
                            type="text"
                            cols="75"
                            defaultValue="Description..."
                            ref={myinput => (this.description = myinput)}
                        />
                    </div>
                </div>
                <div className="questions-list-title"> Questions </div>
                <div className='assignment-questions-list'>{this.state.questions}</div>
                <div className="answer-list">{this.state.answers}</div>
                <div className='add-problem add-problem-create' onClick={this.handleAddProblem}>
                    + Add a problem
                </div>
                <div className='standard-button save' onClick={this.handleSubmit}>
                    Save
                </div>
                <div className='standard-button cancel' onClick={this.props.goBack}>
                    Cancel
                </div>
            </div>
        );
    }
}

export default CreateAssignment;