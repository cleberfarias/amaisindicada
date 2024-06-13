import { sabores } from "./DadosUltimosLancamentos";
import styled from 'styled-components'
import CarRecomenda from "../CarRecomenda/CarRecomenda";
import { Titulo } from "../Titulo/Titulo";
import imgSabores from '../../imagens/colecao.png'



const UltimosLancamentosContainer = styled.section`
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centraliza o conteúdo na horizontal */
`;

const NovosSaboresContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px; /* Espaçamento entre os cards de sabores */
    padding: 10px; /* Adiciona espaçamento interno */
    flex-wrap: wrap; /* Permite que os cards de sabores quebrem para a próxima linha */
`;

const SaboresCard = styled.div`
    flex: 0 0 auto; /* Impede que os cards de sabores se estiquem para preencher o espaço */
    width: 300px; /* Define a largura fixa para cada card de sabor */
    margin: 10px; /* Espaçamento entre os cards */
    img {
        width: 100%;
        height: auto;
        border-radius: 8px; /* Adicione border-radius para cantos arredondados */
    }
`;

function UltimosLancamentos() {
    return (
        <UltimosLancamentosContainer>
            <Titulo> Últimos Lançamentos </Titulo>
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