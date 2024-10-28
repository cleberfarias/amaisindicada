import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderCatalogo from './HeadrCatalago';
import FooterCatalogo from './FooterCatalogo';
import Banner from './Banner';
import OpcoesMenu from './OpcoesMenu';
import Produtos from './Produto';
import DetalhesProduto from './sobre';




function CardCatalogo() {
    return (
        <div>
            <HeaderCatalogo />
            <Banner/>
            <OpcoesMenu/>
            <Produtos/>
            <DetalhesProduto/>
            <FooterCatalogo />
        </div>




    );
}

export default CardCatalogo;
