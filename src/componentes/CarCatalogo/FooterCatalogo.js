import React from 'react';

function FooterCatalogo() {
    return (               
        <footer className="border-top text-muted bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 text-center">
                        &copy; 2023 - A Mais Indicada<br />
                        Celso Ramos <br />
                        Santa Catarina
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <a href="/privacidade.html" className="text-decoration-none text-dark">Política de Privacidade</a><br />
                        <a href="/termos.html" className="text-decoration-none text-dark">Termos de Uso</a><br />
                        <a href="/quemsomos.html" className="text-decoration-none text-dark">Quem Somos</a><br />
                        <a href="/trocas.html" className="text-decoration-none text-dark">Trocas e Devoluções</a>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <a href="/contato" className="text-decoration-none text-dark">Contato pelo Site</a><br />
                        E-mail: <a href="mailto:email@dominio.com" className="text-decoration-none text-dark">email@dominio.com</a><br />
                        Telefone: <a href="phone:28999990000" className="text-decoration-none text-dark">(49) 99999-0000</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterCatalogo;
