import React from 'react'
import './css/EditAssignment.css'
import deleteIcon from '../resources/delete.png'
import { db } from '../API'
import AddOrEditQuestions from './AddOrEditQuestions'

class EditAssignment extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddProblem = this.handleAddProblem.bind(this)
        this.renderQuestions = this.renderQuestions.bind(this)
        this.state = {
            data: this.props.assignmentData,
            questions: <AddOrEditQuestions assignmentData={this.props.assignmentData} />
        }
    }

    async handleDelete(assignment) {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            await db.endpoints.Assignments.delete(assignment)
            window.location.reload(false)
        }
    }
    renderQuestions(data) {
        this.setState({data: data})
        // console.log(this.state.data)
        this.setState({questions: <AddOrEditQuestions assignmentData={this.state.data} />})
        this.forceUpdate()
    }
    // this code prematurely adds answers to the db
    async handleAddProblem() {
        //add a new problem to the list of questions
        let data = this.state.data
        // let questionsList = []
        // data.Questions.forEach(question => {
        //     questionsList.push(question)
        // });
        // questionsList.push("New Problem")

        // this patches placeholder into db BEFORE SAVE IS CLICKED
        await db.endpoints.Assignments.patch(this.props.assignmentData, {
            "Questions": ["one", "two"]
        })

        // ######### THIS ONLY WORKS FOR THE FIRST ITEM IN ASSIGNMENT LIST ##########
        // ######### NEED TO FIND A WAY TO GET THE SELECTED ASSIGNMENT'S REFRESHED DATA ########
        data = await db.endpoints.Assignments.getAll()
        // data = data.data.filter(function (value) {return value.id === this.props.assignmentData.id})
        data = data.data[0]
        // console.log(data.Questions)
        // data.Questions.forEach(question => {
        //     console.log(question)
        // });
        this.renderQuestions(data)
    }

    async handleSubmit() {
        await db.endpoints.Assignments.patch(this.props.assignmentData, {
            "name": this.assignmentName.value,
            "description": this.description.value
        })

        window.location.reload(false)
    }

    render() {


        return (
            <div className='edit-assignment-dialog'>
                <div className="edit-assignment-header">
                    <div>
                        <input
                            className='edit-assignment-title'
                            type="text"
                            defaultValue={ this.props.assignmentData.name }
                            ref={myinput => (this.assignmentName = myinput)}
                        />
                        <img
                            className="delete-assignment"
                            src={deleteIcon} alt="Delete Icon"
                            onClick={() => {this.handleDelete(this.props.assignmentData)}}
                        />
                    </div>
                    <div >
                        <textarea
                            className='edit-assignment-description'
                            type="text"
                            cols="75"
                            defaultValue={ this.props.assignmentData.description }
                            ref={myinput => (this.description = myinput)}
                        />
                    </div>
                </div>
                <div>
                    <div className="questions-list-title"> Questions </div>
                    <div>
                        {this.state.questions}
                    </div>
                </div>
                <div className='add-problem add-problem-edit' onClick={this.handleAddProblem}>
                    + Add a problem
                </div>
                <div className='standard-button save' onClick={this.handleSubmit}>
                    Save
                </div>
                <div className='standard-button cancel' onClick={ () => {window.location.reload(false)} }>
                    Cancel
                </div>
            </div>
        );
    }
}

export default EditAssignment;