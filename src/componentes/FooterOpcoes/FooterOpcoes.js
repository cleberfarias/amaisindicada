import './FooterOpcoes.css'
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";



function FooterOpcoes() {
    return (
        <footer class="rodapé">
            <h2 class="rodapé__titulo">A Mais Indicada</h2>
            <ul class="lista-rodapé">
                <li class="lista-rodapé__titulo">Produção</li>
                <li class="lista-rodapé__item">
                    <a href="#" class="lista-rodapé__link">Alambique</a>
                </li>
                <li class="lista-rodapé__item">
                    <a href="#" class="lista-rodapé__link">Armazem</a>
                </li>
            </ul>

            <ul class="lista-rodapé">
                <li class="lista-rodapé__titulo">Comunidade</li>
                <li class="lista-rodapé__item">
                    <a href="https://www.google.com/maps?q=-27.65963231609629,-51.35811403175321" class="lista-rodapé__link" target="_blank">Celso Ramos, Santa Catarina - Ver no Mapa</a>
                </li>
                <li class="lista-rodapé__item">
                    <a href="mailto:contato@amaisindicada.com.br" class="lista-rodapé__link">E-mail: contato@amaisindicada.com.br</a>
                </li>
                <li class="lista-rodapé__item">
                    <a href="https://contate.me/amaisindicada" class="lista-rodapé__link" target="_blank">contato: <ImWhatsapp /> +55(49)99926-9857  </a>

                </li>

            </ul>

            <ul class="lista-rodapé">
                <li class="lista-rodapé__titulo">Rede social</li>
                <li class="lista-rodapé__item">
                    <a href="https://www.instagram.com/maisindicada/" class="lista-rodapé__link" target="_blank">
                        <FaInstagram class="lista-rodapé__icone" />
                    </a>
                </li>
            </ul>
        </footer>


    )
}
export default FooterOpcoes;

