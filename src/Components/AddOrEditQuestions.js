import React from 'react'
import ReactDOM from 'react-dom'
import './css/Files.css'

function AddOrEditQuestions(props) {
    const questionsJsx = props.assignmentData.Questions.map((question, index) => {
        return (
            <div key={index} className="question-list-item">
                Question:&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                        className='assignment-question'
                        type="text"
                        defaultValue={question}
                        // ref={myinput => (this.assignmentName = myinput)}
                    />
            </div>
        )
    });

    const answersJsx = props.assignmentData.Answers.map((answer, index) => {
        return (
            <div key={index}>
                Answer:&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                        className='assignment-question'
                        type="text"
                        defaultValue={answer}
                        // ref={myinput => (this.assignmentName = myinput)}
                    />
            </div>
        )
    });

    // function renderQuestions() {
    //     let questionsList = []
    //     props.questions.forEach(question => {
    //     questionsList.push(<input
    //         className='assignment-question'
    //         type="text"
    //         defaultValue={question}
    //         // ref={myinput => (this.assignmentName = myinput)}
    //     />)})
    //     ReactDOM.render((
    //         <div>
    //             {questionsList}
    //         </div>

    //     ), document.querySelector('.assignment-questions-list'));
    // }
    // function renderQuestions() {
    //     console.log("inside renderQuestions")
    //     let questionsList = <div></div>
    //     props.questions.forEach(question => {
    //         var renderQuestion = document.createElement('input');
    //         renderQuestion.className='assignment-question'; 
    //         renderQuestion.type = "text";
    //         renderQuestion.defaultValue = question;
    //         document.body.appendChild(renderQuestion);
    //         // <input
    //         //     className='assignment-question'
    //         //     type="text"
    //         //     defaultValue={question}
    //         //     // ref={myinput => (this.assignmentName = myinput)}
    //         // />
    //     });
    // }

    return (
        <div className='assignment-questions-list'>
            <div>{questionsJsx}</div>
            <div className="answer-list">{answersJsx}</div>
        </div>
    );
}

export default AddOrEditQuestions;