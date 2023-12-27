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
    padding: 0 20px; /* Ajuste o padding conforme necessário */
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
