import styled from "styled-components";

export const Titulo = styled.h2`
    width: 100%;
    padding: 20px 0; /* Ajustei o padding para um espaçamento mais moderado */
    color: #EB9B00;
    font-size: 24px; /* Ajustei o tamanho da fonte */
    text-align: center;
    margin: 0;
    
    @media screen and (max-width: 768px) {
        font-size: 20px; /* Ajuste do tamanho da fonte para telas menores */
        padding: 15px 0; /* Ajuste do padding para telas menores */
    }
`;
