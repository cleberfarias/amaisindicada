import styled from 'styled-components'
import perfil from '../../imagens/perfil.svg'
import sacola from '../../imagens/sacola.svg'


const Icones = styled.ul`
  display: flex;
  align-items: center;
`
const Icone = styled.li`
  margin-right: 40px;
  width: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;
  min-width: 120px;
`

const icones =[ perfil, sacola]
function IconesHeader(){
    return(
        <Icones>
        {icones.map((icones) =>(
          <Icone><img src={icones}></img></Icone>
        ))}
      </Icones>

    )
}
export default IconesHeader;
