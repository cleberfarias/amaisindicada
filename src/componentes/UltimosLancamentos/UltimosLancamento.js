
import { sabores } from "./DadosUltimosLancamentos";
import styled from 'styled-components'

const UltimosLancamentosContainer = styled.section`
background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const Titulo = styled.h2`
    width: 100%;
    padding: 30px 0;
    background-color: #FFF;
    color: #EB9B00;
    font-size: 36px;
    text-align: center;
    margin: 0;
`

const NovosLivrosContainer = styled.div`
    margin-top: 1px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    max-height: 5%;
    max-width: 5%;
`



function UltimosLancamentos() {

    return (
        <UltimosLancamentosContainer>
            <Titulo>Ultimos Lançamento</Titulo>
            <NovosLivrosContainer>
                {sabores.map(sabor => (
                <img src={sabor.src} />
            ))}
            </NovosLivrosContainer>
            

        </UltimosLancamentosContainer>



    )
}
export default UltimosLancamentos;