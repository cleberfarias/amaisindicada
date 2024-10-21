import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Titulo } from '../Titulo/Titulo';
import Coleaco from '../../imagens/Licores (2).svg';




function CardRecomenda({ titulo, subtitulo, descricao }) {
  return (
    <Card style={{ margin: '10px auto', maxWidth: '1200px', display: 'flex' }}>
      <Row>
        <Col xs={12} md={6} className="d-flex flex-column align-items-center">
          {/* Centralizando o texto no contêiner */}
          <Titulo alinhamento="center">{titulo}</Titulo>
          <h4 style={{ color: '#002F52', fontWeight: 'bold', margin: '10px 0', textAlign: 'center' }}>{subtitulo}</h4>
          <p style={{ color: '#002F52', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>
            {descricao}
          </p>
          <Button href="/catálogo" variant="warning" size="lg" className="mt-3">
            Saiba mais
          </Button>
        
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img src={Coleaco} alt={titulo} style={{ width: '80%', height: 'auto', marginRight: '20px' }} />
        </Col>
      </Row>
    </Card>
  );
}

export default CardRecomenda;
