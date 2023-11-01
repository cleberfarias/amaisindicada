import perfil from '../../imagens/perfil.svg'
import sacola from '../../imagens/sacola.svg'
import './IconesHeader.css'

const icones =[ perfil, sacola]
function IconesHeader(){
    return(
        <ul className='icones'>
        {icones.map((icones) =>(
          <li className='icone'>
            <img src={icones}></img>
          </li>
        ))}
      </ul>

    )
}
export default IconesHeader;
