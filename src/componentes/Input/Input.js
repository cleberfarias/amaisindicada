import styled from "styled-components";


const Input = styled.input`
  order: 1px solid #008080;
  background: transparent;
  border: 1px solid #008080;
  padding: 20px 140px;
  border-radius: 50px;
  width: 200px;
  color: #008080;
  font-size: 16px;
  margin-bottom: 30px;

  &::placeholder {
    color: #008080;
    font-size: 16px;
    align-items: center;
  }
  font-family: "Alumni Sans Collegiate One", sans-serif;
`

export default Input;