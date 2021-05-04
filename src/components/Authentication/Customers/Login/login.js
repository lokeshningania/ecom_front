import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'

class LoginForm extends Component {
    constructor(){
        super()
        this.state = {
            username: '' ,
            password: '',
            pwderr:'',
            usernameerr:'' 
        }
        this.changepassword = this.changepassword.bind(this)
        this.changeuserame = this.changeuserame.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeuserame(event){
        this.setState({
            username: event.target.value,
            usernameerr: ''
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
        if(this.state.password === ''){
            this.setState({
                pwderr: '* Please Enter Your Password'
            })
        }

        if(this.state.username ===''){
            this.setState({usernameerr: '* Please enter username'})
        }
        
    }
render(){
    return(
        <div className='container'>
            <div className='form-div'>
                <form onSubmit={this.onSubmit}>
                    <input type='text'
                        placeholder = 'Username'
                        className = 'form-control form -group'/>
                    <span className='inputerrors'> {this.state.usernameerr} </span>
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

export default LoginForm;