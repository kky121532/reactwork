import React, { Component } from 'react';

class App extends Component {
    state = {
        useremail: '',
        username: '',
        password: '',
        btnCheck: false,
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
            // 이메일에 @ 포함 ? true : false
            emailCheck : useremail.includes('@'),
            // 비밀번호에 이름과 같은 문자가 들어 있지 않음 ? true : false
            nameCheck : !password.includes(username),
            // 비밀번호에 대, 소문자가 각각 한 개 씩 들어 있음 ? true : false
            strCheck : str.test(password),
            // 비밀번호의 길이가 6자 이상 ? true : false
            pwlengCheck : password.length > 5,
        }

        let result = true;
        for ( var key in pwCheck ) {
            result = result && pwCheck[key];
        }
        
        // result 가 true면 버튼 활성화
        this.setState({
            btnCheck: result,
        })
    }

    render() {
        const {useremail, username, password, btnCheck} = this.state;

        return (
            <div>
                <input type="text" name="useremail" value={useremail} onChange={this.handleChange} placeholder="이메일을 입력하세요" />
                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="이름을 입력하세요" />
                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="비밀번호 입력" />
                <input type="submit" disabled={!btnCheck} />
            </div>
        );
    }
}

export default App;