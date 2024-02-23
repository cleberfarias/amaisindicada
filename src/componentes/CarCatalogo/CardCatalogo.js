import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderCatalogo from './HeadrCatalago';
import FooterCatalogo from './FooterCatalogo';
import Banner from './Banner';
import OpcoesMenu from './OpcoesMenu';
import Produtos from './Produto';




function CardCatalogo() {
    return (
        <div>
            <HeaderCatalogo />
            <Banner/>
            <OpcoesMenu/>
            <Produtos/>
            <FooterCatalogo />
        </div>




    );
}

export default CardCatalogo;
