import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';

export const Noticia = () => {
    const [data, setData] = useState(); // Para guardar los datos de la API
    const [loading, setLoading] = useState(true); // Para controlar si está cargando
    const [error, setError] = useState(null); // Para manejar errores

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=06f607ab823343b682313f468c2bdc7b');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const result = await response.json();
                setData(result.articles); // Guarda solo el array de artículos en data
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">

            <Row className="justify-content-center">
                {data && data.map((article, index) => (
                    // Verifica si article.urlToImage o article.title son nulos o tienen el valor "Removed"
                    (article.urlToImage && article.title !== "Removed") ? (
                        
                        <Col key={article.url} xs={12} md={6} lg={4} className="mb-4">
                            <Card id='card-sz'>
                                <Card.Img variant="top" src={article.urlToImage} alt={article.title} id='card-img'/>
                                <Card.Body>
                                    <Card.Title>{article.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Fuente: {article.source.name}
                                    </Card.Subtitle>
                                    <Card.Text>{article.description}</Card.Text>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        Leer más
                                    </a>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Publicado el {new Date(article.publishedAt).toLocaleDateString()}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ) : (
                        <></> // Si no cumple con las condiciones, no renderiza nada
                    )
                ))}


            </Row>
        </div>
    );
};
