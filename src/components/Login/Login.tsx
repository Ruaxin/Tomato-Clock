import * as React from 'react';
import './Login.scss';
import {Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import axios from '../../config/axios';
import {Link} from 'react-router-dom';

interface ILoginState {
  account: string,
  password: string,
}

class Login extends React.Component<any, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
    };
  }

  onChange = (key: keyof ILoginState, value: string) => {
    const newState: any = {};
    newState[key] = value;
    this.setState(newState);
  };
  submit = async () => {
    const {account, password} = this.state;

    try {
      await axios.post('sign_in/user', {
        account, password
      });
      this.props.history.push('/');
    } catch (e) {
      throw new Error(e);
    }
  };

  public render() {
    const {account, password} = this.state;
    return (
      <div className="Login" id="Login">
        <h1>番茄闹钟账号登录</h1>
        <Input placeholder="请输入用户名"
               prefix={<UserOutlined/>}
               value={account}
               onChange={(e)=>this.onChange('account',e.target.value)}/>
        <Input.Password placeholder="请输入密码"
                        value={password}
                        onChange={(e)=>this.onChange('password',e.target.value)}/>
        <Button type="primary" onClick={this.submit} className="loginButton">登录</Button>
        <p>如果你未注册账号，请立即<Link to="/signUp">注册</Link></p>
      </div>
    );
  }
}

export default Login;