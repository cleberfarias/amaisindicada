import React, {useState} from 'react'
import './BarraDeBusca.css'
import { FcSearch } from "react-icons/fc";

function BarraDeBusca() {
    const[valorPesquisa, setValorPesquisa] = useState('');


    return (
        <form className='barraDePesquisa'>
            <input
                type="pesquisa"
                value={valorPesquisa}
                placeholder="Burcar produtos"
                className="pesquisa__input"
                onChange={({target})=>setValorPesquisa(target.value)}
                required
            />           
            <button type="submit" className="pesquisa__button">
            <FcSearch />
            </button>
        </form>

    )
}


export default BarraDeBusca