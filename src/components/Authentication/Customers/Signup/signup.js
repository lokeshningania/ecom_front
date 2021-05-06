import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './signup.css'
import axios from 'axios'
import {validEmail , validPassword} from '../../../helpers/regex'
/*import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'*/
class SignupForm extends Component{
    constructor(){
        super()
        this.state = {
            firstname : '' ,
            fnameerr: '' ,
            lastname : '' ,
            lnameerr: '' ,
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
        this.changefirstname = this.changefirstname.bind(this)
        this.changelastname = this.changelastname.bind(this)
        this.changeusername = this.changeusername.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changephone = this.changephone.bind(this)
        this.changepassword = this.changepassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changefirstname(event){
        this.setState({
            firstname: event.target.value ,
            fnameerr:''
        })
    }
    changelastname(event){
        this.setState({
            lastname: event.target.value ,
            lnameerr:''
        })
    }

    changeusername(event){
        this.setState({
            username: event.target.value ,
            usernameerr:''
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
                phone: event.target.value,
                phoneerr:''
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
                this.setState({emailerr: '* This is not a valid email address'})
    
            }
            
         }
         /*if(!validName.test(this.state.fullname )){
            this.setState({nameerr: '* Please enter valid name'})
            }*/
        if(this.state.phone ===''){
            this.setState({phoneerr: '* Please enter your phone number'})
        }
        if(this.state.username ===''){
            this.setState({usernameerr: '* Please enter username'})
        }
        const registered = {
            firstname:this.state.firstname ,
            lastname:this.state.lastname ,
            username: this.state.username ,
            email:this.state.email,
            phone: this.state.phone,
            password: this.state.password
        }
        
        if(this.state.pwderr === '' && this.state.emailerr === '' && this.state.phoneerr === '' && this.state.fnameerr === '' && this.state.lnameerr === '' && this.state.usernameerr === ''){
            this.setState({
                isValid: 'true'
            })
            console.log(this.state.isValid)
        }

        

        if(this.state.isValid === 'true'){
            console.log('submit')
            axios.post('http://localhost:4001/customer/signup' , registered)
            .then(response => console.log(response.data))

            this.setState({
                firstname : '' ,
                lastname : '' ,
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
                        placeholder = 'First Name'
                        onChange = {this.changefirstname}
                        value = {this.state.firstname}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.fnameerr} </span>

                        <input  type= 'text' 
                        placeholder = 'Last Name'
                        onChange = {this.changelastname}
                        value = {this.state.lastname}
                        className = ' form-control form-group'
                        />
                        <span className='inputerrors'> {this.state.lnameerr} </span>

                        <input  type= 'text' 
                        placeholder = 'Username'
                        onChange = {this.changeusername}
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