import logo from '../../imagens/Logo.png'
import './estilo.css'

function Logo() {
    return (
        <div className='logo'>
            <img className='logo-img ' 
            src={logo} alt='Logo'>

            </img>
            
        </div>
    )
}
export default Logo;