import styled from "styled-components";
import { useState } from 'react';



const FormularioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px; /* Adicionando padding igual nos lados */
  overflow: hidden; /* Oculta o conteúdo que ultrapassa os limites da tela */
`;

const TituloFormulario = styled.h2`
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  color: #22778b;
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px ${({ theme }) => theme.mainColor};
  width: 100%;
  text-align: center;
  padding: 15px 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 14px;
  height: 34px;
  border-radius: 4px;
  border: 0;
  padding: 0 8px; 
`;

const Textarea = styled.textarea`
  margin-bottom: 14px;
  border-radius: 4px;
  border: 0;
  padding: 8px; 
  height: 94px;
  resize: none;
`;

const Button = styled.button`
  height: 34px;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  background-color: #0fdbff;
  font-size: 18px;
  transition: background-color, transform 0.8s;

  &:hover {
    background-color: #0fe3ff;
    transform: scale(1.01);
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

function Formulario() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      alert('Preencha todos os campos.');
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email
    };

    'emailjs'.send("service_ool1u8e", "template_wdrpdvu", templateParams, "3DYilfSm2gLZfdwYG")
      .then((response) => {
        alert("EMAIL ENVIADO", response.status, response.text);
        setName('');
        setEmail('');
        setMessage('');
        setErrorMessage(''); // Limpa a mensagem de erro se houver
      })
      .catch((err) => {
        console.log("Erro: ", err);
        setErrorMessage('Erro ao enviar o email. Tente novamente mais tarde.');
      });
  }

  return (
    <div>
      <FormularioContainer>
        <TituloFormulario>Fale Conosco</TituloFormulario>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Form onSubmit={sendEmail}>
          <Input
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <Input
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <Textarea
            placeholder="Digite sua mensagem..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />

          <Button type="submit">Enviar</Button>
        </Form>

      </FormularioContainer>
      </div>

  );
}

export default Formulario;
