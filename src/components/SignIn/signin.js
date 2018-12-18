import React, {Component} from 'react';
import styles from './signin.css';
import FormField from '../widgets/FormField/formFields'
import {firebase} from '../../firebase';
import { throws } from 'assert';

class SignIn extends Component {
  state = {
    registerError: '',
    loading: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormData = {
      ...this.state.formdata
    }

    const newElement = {
      ...newFormData[element.id]
    }
    newElement.value = element.event.target.value;
    newFormData[element.id] = newElement;

    if (element.blur) {
      let validData = this.validate(newElement)
      
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;

    console.log(newFormData)

    this.setState({
      formdata: newFormData
    })
  }

  submitButton = () => (
    this.state.loading ? 
      'loading...'
      :
      <div>
        <button onClick={(event) => this.submitForm(event, false)}>Register now</button>
        <button onClick={(event) => this.submitForm(event, true)}>Log in</button>
      </div>
  )

  submitForm = (event, type) => {
    event.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for(let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value
      }
      for (let key in this.state.formdata) {
        formIsValid = this.state.formdata[key].valid && formIsValid;
      }

      if (formIsValid) {
        this.setState({
          loading: true,
          registerError: ''
        })

        if (type) {
          firebase.auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
          ).then(() => {
            this.props.history.push('/')
          }).catch((error) => {
            this.setState({
              loading: false,
              registerError: error.message
            })
          })
        } else {
          firebase.auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            ).then(() => {
              this.props.history.push('/')
            }).catch((error) => {
              this.setState({
                loading:false,
                registerError: error.message
              })
            })
        }
      }

    }
  }

  validate = (element) => {
    let error = [true, ''];

    if (element.validation.email) {
      const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value);
      const message = `${!valid ? 'Must be a valid email' : ''}`;
      error = !valid ? [valid, message] : error
    }

    if (element.validation.password){
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'Must be greater than 5' : ''}`;
      error = !valid ? [valid, message] : error
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error
    }

    return error;
  }

  showError = () => (
    this.state.registerError !== '' ?
      <div className={styles.error}>{this.state.registerError}</div>
      :
      ''
  )

  render () {
    return (
      <div className={styles.logContainer}>
        <form onSubmit={(event) => this.submitForm(event, null)}>
          <h2>Register / Log in</h2>
          <FormField 
            id={'email'}
            formData={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField 
            id={'password'}
            formData={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          { this.submitButton() }
          { this.showError() }
        </form>
      </div>
    )
  }
}

export default SignIn;