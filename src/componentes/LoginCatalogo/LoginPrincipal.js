import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderCatalogo from '../CarCatalogo/HeadrCatalago'
import FooterCatalogo from '../CarCatalogo/FooterCatalogo';
import CadastroForm from './Formulário';





function LoginPrincipal() {
    return (
        <div>
            <HeaderCatalogo />
            <CadastroForm/>          
            <FooterCatalogo />
        </div>




    );
}

export default LoginPrincipal;
