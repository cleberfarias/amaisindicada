import "bootstrap/dist/css/bootstrap.min.css";
import HeaderCatalogo from "./HeadrCatalago";
import FooterCatalogo from "./FooterCatalogo";
import Banner from "./Banner";
import OpcoesMenu from "./OpcoesMenu";
import Produtos from "./Produto";
import DetalhesProduto from "./sobre";
import { AuthProvider } from "./AuthContext"; // Importar o AuthProvider

function CardCatalogo() {
  return (
    <AuthProvider>
      <div>
        <HeaderCatalogo />
        <Banner />
        <OpcoesMenu />

        <Produtos />
        <DetalhesProduto />
        <FooterCatalogo />
      </div>
    </AuthProvider>
  );
}

export default CardCatalogo;
