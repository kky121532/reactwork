import React, { Component } from 'react';

class App extends Component {
    state = {
        useremail: '',
        username: '',
        password: '',
        btnCheck: true,
    }

    handleChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
        }, this.isSafe);
        
    }

    isSafe = () => {
        const { useremail, username, password, btnCheck } = this.state;
        // 소문자, 대문자 각각 한개씩 포함 check
        let str = /(?=.*[a-z])(?=.*[A-Z])/;

        let pwCheck = {
            // 이메일에 @ 포함되어 있는지 체크
            emailCheck : useremail.includes('@'),
            // 이름과 같은 글자가 들어 있는지 체크
            nameCheck : password.includes(username),
            strCheck : str.test(password),
            pwlengCheck : password.length,
        }

        let {emailCheck, nameCheck, pwlengCheck, strCheck} = pwCheck;

        if ( emailCheck === false || pwlengCheck < 6 || nameCheck === true || strCheck === false ) {
            // disabled 활성화
            this.setState({
                btnCheck: true,
            })
        } else {
            // disabled 비활성화
            this.setState({
                btnCheck: false,
            })
        }
    }

    render() {
        const {useremail, username, password, btnCheck} = this.state

        return (
            <div>
                <input type="text" name="useremail" value={useremail} onChange={this.handleChange} placeholder="이메일을 입력하세요" />
                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="이름을 입력하세요" />
                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="비밀번호 입력" />
                <input type="submit" disabled={btnCheck === true ? true : false} />
            </div>
        );
    }
}

export default App;