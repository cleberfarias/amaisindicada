import { sabores } from "./DadosUltimosLancamentos";
import styled from 'styled-components'
import CarRecomenda from "../CarRecomenda/CarRecomenda";
import { Titulo } from "../Titulo/Titulo";
import imgSabores from '../../imagens/colecao 1.svg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstrap CSS

// Container para organizar os lançamentos
const UltimosLancamentosContainer = styled.section`
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Adicionando responsividade e espaçamento entre os cards
const NovosSaboresContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 10px;
    flex-wrap: wrap;
`;

// Card estilizado com efeitos de hover usando Bootstrap
const SaboresCard = styled.div`
    width: 300px;
    margin: 10px;
    transition: transform 0.3s ease-in-out; /* Transição suave no hover */
    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adiciona sombra suave */
        transition: transform 0.3s ease-in-out; /* Transição suave no hover */
    }

    &:hover img {
        transform: scale(1.05); /* Efeito de zoom ao passar o mouse */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Aumenta a sombra no hover */
    }
`;

function UltimosLancamentos() {
    return (
        <UltimosLancamentosContainer className="container">
            <Titulo> Últimos Lançamentos! </Titulo>
            <NovosSaboresContainer className="row">
                {sabores.map((sabor, index) => (
                    <SaboresCard className="col-md-4 col-sm-6" key={index}>
                        <img src={sabor.src} alt={`Sabor ${index + 1}`} className="img-fluid" />
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
