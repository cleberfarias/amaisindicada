import styled from "styled-components";

const Input = styled.input`
  text-align: center;
  align-items: center;
  order: 1px solid #008080;
  background: transparent;
  border: 1px solid #008080;
  padding: 10px 20px;  /* Ajuste o padding conforme necessário para a responsividade */
  border-radius: 50px;
  width: 100%;  /* Ajuste a largura para ocupar 100% do contêiner pai */
  color: #FFF;
  font-size: 16px;
  margin-bottom: 30px;

  &::placeholder {
    color: #FFF;
    font-size: 16px;
    align-items: center;
  }
  font-family: "Alumni Sans Collegiate One", sans-serif;

  @media screen and (max-width: 768px) {
    padding: 10px;  /* Ajuste o padding para telas menores */
  }
`;

export default Input;
