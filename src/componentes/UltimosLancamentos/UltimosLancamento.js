import { sabores } from "./DadosUltimosLancamentos";
import styled from 'styled-components'
import CarRecomenda from "../CarRecomenda/CarRecomenda";
import { Titulo } from "../Titulo/Titulo";
import imgSabores from '../../imagens/colecao.png'

const UltimosLancamentosContainer = styled.section`
    background: linear-gradient(to right, #663300, #ffffff);
    padding-bottom: 20px;
    display: flex;
    flex-direction: column; 
`;
const NovosSaboresContainer = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding-bottom: 10px;
`;

const SaboresCard = styled.div`
    margin: 10px; /* Ajuste a margem conforme necessário */
    max-width: 300px; /* Ajuste a largura máxima conforme necessário */
    img {
        width: 100%;
        height: auto;
        border-radius: 8px; /* Adicione border-radius para cantos arredondados */
    }
`;

function UltimosLancamentos() {
    return (
        <UltimosLancamentosContainer>
            <Titulo> Últimos Lançamentos</Titulo>
            <NovosSaboresContainer>
                {sabores.map((sabor, index) => (
                    <SaboresCard key={index}>
                        <img src={sabor.src} alt={`Sabor ${index + 1}`} />
                    </SaboresCard>
                ))}
            </NovosSaboresContainer>
            <CarRecomenda
                titulo="Talvez você se interesse por..."
                subtitulo="Todos os Sabores"
                descricao="Nossa coleção"
                img={imgSabores}
            />
        </UltimosLancamentosContainer>
    );
}

export default UltimosLancamentos;
