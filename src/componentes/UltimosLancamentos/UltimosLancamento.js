
import { sabores } from "./DadosUltimosLancamentos";
import styled from 'styled-components'
import CarRecomenda from "../CarRecomenda/CarRecomenda";
import { Titulo } from "../Titulo/Titulo";
import imgColecao from '../../imagens/colecao.png'

const UltimosLancamentosContainer = styled.section`
background-image: linear-gradient(90deg, #d4e6f4 50%, #328955);
    padding-bottom: 20px;
    display: flex;
    flex-direction: column; 
`


const NovosSaboresContainer = styled.div`
    margin-top: 30px;
    margin: 10px;
    display: flex;
    padding: 1em 0 0.5em 0;
    width: 100%;
    justify-content: center;
    cursor: pointer;
    
        
`






function UltimosLancamentos() {

    return (
        <UltimosLancamentosContainer>
            <Titulo
                cor={"#EB9B00"}
                tamanhoFonte={"36px"}
            >
                Últimos Lançamento
            </Titulo>
            <NovosSaboresContainer>
                {sabores.map(sabor => (
                    <img src={sabor.src} />
                ))}
            </NovosSaboresContainer>
            <CarRecomenda
                titulo="Talvez você se interesse por..."
                subtitulo="Todos os Sabores"
                descricao="Nossa coleção"
                img={imgColecao}


            />

            


        </UltimosLancamentosContainer>



    )
}
export default UltimosLancamentos;