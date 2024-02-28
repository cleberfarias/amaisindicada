import React from 'react';
import HeaderCatalogo from '../CarCatalogo/HeadrCatalago';
import FooterCatalogo from '../CarCatalogo/FooterCatalogo';

function CadastroSucesso() {
    return (
        <div>
            <HeaderCatalogo />
            <main className="flex-fill">
                <div className="container">
                    <h1>Cadastro Realizado com Sucesso!</h1>
                    <hr />
                    <p>
                        Caro <b>Primeiro Nome do Cliente</b>,
                    </p>
                    <p>
                        Obrigado por se cadastrar em nossa loja virtual. Um e-mail de confirmação foi enviado para o <b>email@dominio.com.br</b>. Clique no link de confirmação presente no e-mail para concluirmos seu cadastro.
                    </p>
                    <p>
                        Desde já, agradecemos pela confiança em nossos serviços.
                    </p>
                    <p>
                        Cordialmente,<br />
                        Central de Relacionamento A Mais Indicada
                    </p>
                    <p>
                        <a href="/index.html" className="btn btn-lg btn-danger">Voltar à Página Principal</a>
                    </p>
                </div>
            </main>
            <FooterCatalogo />
        </div>

    );
}

export default CadastroSucesso;
