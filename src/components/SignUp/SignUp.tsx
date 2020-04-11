import * as React from 'react';
import {Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
import './SignUp.scss'

interface ISignUpState {
  account: string,
  password: string,
  passwordConformation: string
}

class SignUp extends React.Component<any, ISignUpState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    };
  }

  onChangeAccount = (e: any) => {
    this.setState({account: e.target.value});
  };
  onChangePassword = (e: any) => {
    this.setState({password: e.target.value});
  };
  onChangePasswordConformation = (e: any) => {
    this.setState({passwordConformation: e.target.value});
  };

  submit = async () => {
    const {account, password, passwordConformation} = this.state;

    try {
      await axios.post('sign_up/user', {
        account, password, password_confirmation: passwordConformation
      });
      console.log('成功');
    } catch (e) {
      throw new Error(e);
    }
  };
  linkTo =()=>{
    this.props.history.push('login')
  }

  public render() {
    const {account, password, passwordConformation} = this.state;
    return (
      <div className="SignUp" id="SignUp">
        <h1>番茄闹钟账号登入</h1>
        <Input placeholder="请输入用户名"
               prefix={<UserOutlined/>}
               value={account}
               onChange={this.onChangeAccount}/>
        <Input.Password placeholder="请输入密码"
                        value={password}
                        onChange={this.onChangePassword}/>
        <Input.Password placeholder="请确认密码"
                        value={passwordConformation}
                        onChange={this.onChangePasswordConformation}/>
        <Button type="primary" onClick={this.submit} className="loginButton">注册</Button>
        <p>如果你已有账号，请<Link to="/login">登录</Link></p>
      </div>
    );
  }
}

export default SignUp;