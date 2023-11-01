import './Opcoes.css'

const textoOpecoes = ['Sabores', 'Minha Estante', 'Favoritos']

function OpcoesHeader() {
    return (
        <ul className='opcoes'>
            {textoOpecoes.map((texto) => (
                <li className='opcao'><p>{texto}</p></li>))}
        </ul>

    )
}
export default OpcoesHeader; 