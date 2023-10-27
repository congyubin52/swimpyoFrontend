import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminChangePw() {
  const [pw, setPw] = useState(''); // 현재 비밀번호
  const [newPw, setNewPw] = useState(''); // 새로운 비밀번호
  const [pwConfirm, setPwConfirm] = useState(''); // 비밀번호 확인 필드 추가

  const [pwCheck, setPwCheck] = useState(true);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const onChangePwCheck = (e) => {
    const confirmPassword = e.target.value;
    setPwConfirm(confirmPassword);

    // 새비밀번호와 비밀번호 확인이 일치하는지 여부를 확인하고 상태 설정
    setPwCheck(newPw === confirmPassword); 

  }

  const changePw = () => {
    console.log("click SignUp");
    console.log("PW : ", pw);
    console.log("newPw : ", newPw);
    console.log("pwConfirm : ", pwConfirm);

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (pwCheck) {
      data = {
        "pw": pw,
        "newPw": newPw,
        "pwConfirm": pwConfirm,
      }

      axios.post("/api/member/admin/changePw", JSON.stringify(data), config,)
        .then((response) => {
          console.log(response.data)
          if (response.data === 2) {
            console.log('사용중인 아이디입니다.');

          } else if (response.data === 1) {
            //성공
            console.log('성공');
            navigate('/admin');
            //메인 페이지로 가도록 경로 변경하기

          } else {
            console.log('fail');

          }
        }).catch((error) => {
          // 실패

        });
    } 
  };

  const [selectedValue, setSelectedValue] = React.useState('a');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          비밀번호 변경 
        </Typography>
        <form onSubmit={changePw} name='changePw' style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pw"
            label="현재 비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
            // value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPw"
            label="새 비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
            // value={pw}
            onChange={(e) => setNewPw(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pwConfirm"
            label="새 비밀번호 확인"
            type="password"
            id="pwConfirm"
            autoComplete="new-password"
            // value={pwConfirm}
            onChange={onChangePwCheck}
          />
          {!pwCheck && (<Typography variant="body2" color="error">
            비밀번호가 일치하지 않습니다.
          </Typography>)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
          >
            비밀번호 변경
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminChangePw;