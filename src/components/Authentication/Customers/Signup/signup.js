import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './signup.css'
import axios from 'axios'
import {validEmail , validPassword, validName} from '../../../helpers/regex'
/*import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'*/
class SignupForm extends Component{
    constructor(){
        super()
        this.state = {
            fullName : '' ,
            nameerr: '' ,
            username: '',
            usernameerr: '',
            email: '',
            emailerr: '' ,
            phone: '',
            phoneerr: '',
            password: '',
            pwderr:'',
            isValid: 'false' 
        }
        this.changeFullName = this.changeFullName.bind(this)
        this.changeuserame = this.changeuserame.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changephone = this.changephone.bind(this)
        this.changepassword = this.changepassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeFullName(event){
        this.setState({
            fullName: event.target.value
        })
    }

    changeuserame(event){
        this.setState({
            username: event.target.value
        })
    }
    changeEmail(event){
        this.setState({
            email: event.target.value ,
            emailerr:''
        })
    }
    changephone(event){
        
            this.setState({
                phone: event.target.value
            })
        
        
    }
    changepassword(event){
        this.setState({
            password : event.target.value ,
            pwderr: ''
        })
    }

    

    onSubmit(event){
        event.preventDefault()
        
        if (!validPassword.test(this.state.password)) {
            if(this.state.password ===''){
                this.setState({pwderr: '* Password field should not be empty'})
            }
            else{
                this.setState({pwderr: '* Password is incorrect \n it must contain 8-16 characters , 1 special character , 1 uppercase letter'})
    
            }
         }

         if (!validEmail.test(this.state.email)) {

            if(this.state.email ===''){
                this.setState({emailerr: '* Email field should not be empty'})
            }
            else{
                this.setState({emailerr: '* This is not a alid email address'})
    
            }
            
         }
         if(!validName.test(this.state.fullName )){
            this.setState({nameerr: '* Please enter valid name'})
        }
        if(this.state.phone ===''){
            this.setState({phoneerr: '* Please enter your phone number'})
        }
        if(this.state.username ===''){
            this.setState({usernameerr: '* Please enter username'})
        }
        const registered = {
            fullName:this.state.fullName ,
            username: this.state.username ,
            email:this.state.email,
            phone: this.state.phone,
            password: this.state.password
        }
        
        if(this.state.pwderr === '' && this.state.emailerr === '' && this.state.phoneerr === '' && this.state.nameerr === '' && this.state.usernameerr === ''){
            this.setState({isValid: 'true'})
            console.log('working')
        }

        if(this.state.isValid === 'true'){
            console.log('submit')
            axios.post('http://localhost:4000/app/signup' , registered)
            .then(response => console.log(response.data))

            this.setState({
                fullName : '' ,
                username: '',
                email: '',
                phone: '',
                password: ''

            })
        }
    }

    render() {
        return(
            <div className = "container">
                <div className='form-div'>
                    <form onSubmit={this.onSubmit}>
                        <input  type= 'text' 
                        placeholder = 'Full Name'
                        onChange = {this.changeFullName}
                        value = {this.state.fullName}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.nameerr} </span>

                        <input  type= 'text' 
                        placeholder = 'Username'
                        onChange = {this.changeuserame}
                        value = {this.state.username}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.usernameerr} </span>

                        <input  type= 'text' 
                        placeholder = 'Email'
                        onChange = {this.changeEmail}
                        value = {this.state.email}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.emailerr} </span>

                        <input
                        type = 'tel'
                        placeholder = 'Phone number'
                        onChange = {this.changephone}
                        value = {this.state.phone}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.phoneerr} </span>

                        <input  type= 'password' 
                        placeholder = 'password'
                        onChange = {this.changepassword}
                        value = {this.state.password}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.pwderr} </span>

                        <input type='submit' className='btn btn-primary  btn-block ' value='Submit' />
                    </form>

                </div>
                
            </div>
        )
    }
}

export default SignupForm;