import perfil from '../../imagens/perfil.svg'
import sacola from '../../imagens/sacola.svg'
import styled from 'styled-components'

const Icone = styled.li`
    margin-right: 40px;
    width: 25px;
    cursor: pointer;
`

const Icones = styled.ul`
    display: flex;
    align-items: auto;
    cursor: pointer;
`

const icones = [perfil, sacola]

function IconesHeader() {
  return (
    <Icones>
      {icones.map((icone) => (
        <Icone><img src={icone} alt='Imagem Icone'></img></Icone>
      ))}
    </Icones>
  )
}

export default IconesHeader
