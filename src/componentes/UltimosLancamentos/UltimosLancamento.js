
import { sabores } from "./DadosUltimosLancamentos";
import styled from 'styled-components'
import CarRecomenda from "../CarRecomenda/CarRecomenda";
import { Titulo } from "../Titulo/Titulo";
import imgSabores from '../../imagens/colecao.png'

const UltimosLancamentosContainer = styled.section`
    background-image: linear-gradient(97.54deg, #002F52 35.49%, #326589 165.37%);
    padding-bottom: 20px;
    display: flex;
    flex-direction: column; 
`;

const ConteudoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 30px;
    padding: 0 20px; /* Adjust the padding as needed */
`;

const NovosSaboresContainer = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding-bottom: 10px;
`;

const SaboresCard = styled.div`
    margin: 10px; /* Adjust the margin as needed */
    max-width: 300px; /* Adjust the max-width as needed */
    img {
        width: 100%;
        height: auto;
        border-radius: 8px; /* Add border-radius for rounded corners */
    }
`;
function UltimosLancamentos() {

    return (
        <UltimosLancamentosContainer>
            <Titulo> Ultimos Lançamento</Titulo>
            <NovosSaboresContainer>
                {sabores.map(sabor => (
                    <img src={sabor.src} />
                ))}
            </NovosSaboresContainer>
            <CarRecomenda
                titulo="Talvez você se interesse por..."
                subtitulo="Todos os Sabores"
                descricao="Nossa coleção"
                img={imgSabores}/>     
            </UltimosLancamentosContainer>



    )
}
export default UltimosLancamentos;