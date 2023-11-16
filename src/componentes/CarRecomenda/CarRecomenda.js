import styled from "styled-components"
import { Titulo } from "../Titulo/Titulo"
import Coleaco from "../../imagens/colecao 1.svg"

const Card = styled.div`
    align-items: center;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    padding: 25px 20px;
    justify-content: space-around;
    width: 100%;  
`

const Botao = styled.button`
    background-color: #EB9B00;
    color: #FFF;
    padding: 10px 0px;
    font-size: 16px;
    border-radius: 20px;
    font-weight: 900;
    display: block;
    text-align: center;
    width: 150px;
    text-decoration: none
    &:hover {
        cursor: pointer;
    }
`

const Descricao = styled.p`
    max-width: 300px;
    color: #002F52;
    font-size: 18px;
    font-weight: bold;
`

const Subtitulo = styled.h4`
    color: #002F52;
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0;
`

const ImgSabor = styled.img`
    
    max-height: 250px;
`

function CardRecomenda({titulo, subtitulo, descricao, img}) {
    return (
        <Card>
            <div>
                <Titulo tamanhoFonte="16px" cor="#EB9B00" alinhamento="center">{titulo}</Titulo>
                <Subtitulo>{subtitulo}</Subtitulo>
                <Descricao>{descricao}</Descricao>
            </div>
            <div>
                <ImgSabor src={Coleaco}/>
                <Botao>Saiba mais</Botao>
            </div>
        </Card>  
    )
}

export default CardRecomenda