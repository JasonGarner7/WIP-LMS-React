import React, { useState } from 'react';
import './css/Account.css'
import { db } from '../API';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import profile from '../resources/arwen.png'
import photo from '../resources/photo.png'

function Account(props) {
  var changed = [];
  const [disabled, setDisabled] = useState(true);

  if(!disabled) {
    try {
      document.querySelector(".account-change-button").className = "standard-button account-change-button-changed"
    }
    catch { }
  }

  function handleChange(e) {
    console.log(e.target.id);
    if (!changed.includes(e.target.id)) {
      changed.push(e.target.id);
    }

    setDisabled(false);
  }

  const handleSubmit = async e => {
    if (!disabled) {
      var validInput = true;
      const userDB = await db.endpoints.Teachers.getOne(userId);
      console.log(userDB);
      var stringArray = {};
      for (var i = 0; i < changed.length; i++) {
        var elementToGet = document.getElementById(changed[i]);
        if (changed[i] === "age") {
          var tempAge = parseInt(elementToGet.value);
          if (!isNaN(tempAge)) {
            stringArray[changed[i]] = tempAge;
          }
          else {
            validInput = false;
          }
        }
        else {
          stringArray[changed[i]] = elementToGet.value;
        }
      }
      if (validInput) {
        db.endpoints.Teachers.patch({ "id": userId }, stringArray);
        alert("User info was saved");
      }
      else {
        alert("Check input and make sure it is the right format");
      }
    }
  }

  const userDB = JSON.parse(localStorage.getItem("user"));
  const userId = userDB.id;
  
  console.log(userDB);
  return (
    <div className="account-page">
      <div className="edit-img">
        <img class="account-img" src={profile} alt="User profile"/>
        <img 
          class="upload-img" 
          src={photo} 
          alt="Upload photo" 
          onClick={e => alert("This will allow the user to upload a new image")}/>
      </div>
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend >
                <InputGroup.Text id="basic-addon3" className="input-group-prepend">
                  First Name:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="firstName"
                aria-describedby="basic-addon3"
                defaultValue={userDB.firstName}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" className="input-group-prepend">
                  Last Name:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="lastName"
                aria-describedby="basic-addon3"
                defaultValue={userDB.lastName}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" className="input-group-prepend">
                  Age:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="age"
                aria-describedby="basic-addon3"
                defaultValue={userDB.age}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" className="input-group-prepend">
                  UserName:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="userName"
                aria-describedby="basic-addon3"
                defaultValue={userDB.userName}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3" className="input-group-prepend">
                  Password:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="password"
                id="password"
                aria-describedby="basic-addon3"
                defaultValue={userDB.password}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <div class="standard-button account-change-button"
          id="accountSaveButton"
          disabled={disabled}
          onClick={handleSubmit}
        >
          Save
        </div>
      </Container>

    </div>
  );
}

export default Account;
