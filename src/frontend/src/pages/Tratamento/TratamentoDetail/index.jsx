import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Result, Divider, Layout, Image, Space, Skeleton, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import { getYouTubeVideoEmbedUrl } from 'utils';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const TratamentoDetail = () => {
    const navigate = useNavigate()
    const [tratamentoDetail, setTratamentoDetail] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    let { id } = useParams()
    id = parseInt(id)

    useEffect(() => {
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/${id}`

        // FIXME - Delete this mock
        const randomExercises = () => {
            const random = Math.floor(Math.random() * 10) + 1;
            const types = ['Video', 'Imagem', 'GIF'] // also make this random
            const exercicios = []
            let generetadType = null

            const generateNewType = () => {
                let lastType = generetadType
                generetadType = types[Math.floor(Math.random() * types.length)]
                if (generetadType === lastType) {
                    generateNewType()
                }
                return generetadType
            }

            const linkFromType = (type) => {
                switch (type) {
                    case 'Video':
                        return 'https://www.youtube.com/watch?v=h4i4kjwncoU&ab_channel=TechwithNader'
                    case 'Imagem':
                        return 'data:image/jpeg;base64,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'
                    case 'GIF':
                        return 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif'
                    default:
                        return null
                }
            }

            for (let i = 0; i < random; i++) {
                exercicios.push({
                    id: i,
                    titulo: `Exercicio ${i}`,
                    descricao: `Descrição do exercicio ${i}`,
                    type: generateNewType(),
                    linkArquivo: linkFromType(generetadType),
                    fisioterapeutaId: currentUser.user.role === 'fisioterapeuta' ? currentUser.user.id : Math.floor(Math.random() * 5) + 1,
                    createTime: new Date().toLocaleDateString('pt-BR')
                })
            }

            return exercicios
        }

        axios.get(apiRoute)
            .then(response => {
                // TODO - remove mock block
                let tratamento = response.data
                tratamento = {
                    ...tratamento,
                    exercicios: randomExercises()
                }
                // TODO - remove mock block

                if (response.data) {
                    setTratamentoDetail(tratamento) // TODO - remove mock
                    // setTratamentoDetail(response.data) // FIXME - uncomment
                }
            })
            .catch(error => {
                setError(error.response)
                if (error.response.status === 400) {
                    setTratamentoDetail(undefined)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const currentUserIsOwner = () => {
        if (tratamentoDetail) {
            return (currentUser.user.id === tratamentoDetail.fisioterapeuta.id && currentUser.user.role === 'fisioterapeuta') ||
                currentUser.user.role === 'admin'
        }
        return false
    }

    if (loading) {
        return (
            <Space style={{
                width: '100%',
                maxWidth: 800,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 0px'
            }}>
                <Skeleton.Image active size='large' />
                <Skeleton.Input active size='default' />
                <Divider />
                <Skeleton.Input active size='large' />
                <Skeleton.Input active size='small' />
            </Space>
        )
    }

    if (error) {
        if (error.status === 403)
            return (
                <Result
                    status="500"
                    title="Erro ao buscar detalhes de tratamento"
                    subTitle={
                        <p>
                            Desculpe, você não tem permissão para acessar os detalhes deste tratamento.
                            <br />
                            Pode ser que você esteja tentando acessar um tratamento que não está vinculado a você.
                        </p>
                    }
                />
            )

        if (error.status === 404)
            return (
                <Result
                    status="404"
                    title="Erro ao buscar detalhes de tratamento"
                    subTitle="Desculpe, não conseguimos encontrar os detalhes do tratamento que você está procurando."
                />
            )
    }

    return (
        <>
            {
                tratamentoDetail == undefined &&
                <Result
                    status="404"
                    title="404"
                    subTitle="Desculpe, não conseguimos encontrar os detalhes do tratamento que você está procurando."
                />
            }

            {tratamentoDetail != undefined &&
                <TratamentoDetailsContainer>
                    <TratamentoTitle>{tratamentoDetail.titulo}</TratamentoTitle>
                    <Divider />

                    {/* Datas */}
                    <RowContainer>
                        <RowShowItem>
                            <RowLabel>Data de início:</RowLabel>
                            <RowValue>{tratamentoDetail.startDate}</RowValue>
                        </RowShowItem>
                        <RowDivider />
                        <RowShowItem>
                            <RowLabel>Previsão de término:</RowLabel>
                            <RowValue>{tratamentoDetail.endDate}</RowValue>
                        </RowShowItem>
                    </RowContainer>

                    {/* Pessoas envolvidas */}
                    <RowContainer>
                        <RowShowItem>
                            <RowLabel>Nome do paciente:</RowLabel>
                            <RowValue>{tratamentoDetail.paciente.nome}</RowValue>
                        </RowShowItem>
                        <RowDivider />
                        <RowShowItem>
                            <RowLabel>Nome da(o) fisioterapeuta</RowLabel>
                            <RowValue>{tratamentoDetail.fisioterapeuta.nome}</RowValue>
                        </RowShowItem>
                    </RowContainer>
                    <RowContainer>
                        <RowShowItem>
                            <RowLabel>Observações:</RowLabel>
                            <RowValue>{tratamentoDetail.observacoes}</RowValue>
                        </RowShowItem>
                        <RowDivider />
                    </RowContainer>

                    {/* Feedback do tratamento */}
                    {tratamentoDetail.feedback && tratamentoDetail.feedback.length > 0 &&
                        <RowContainer>
                            <RowShowItem>
                                <RowLabel>Feedback:</RowLabel>
                                <RowValue>{tratamentoDetail.feedback}</RowValue>
                            </RowShowItem>
                        </RowContainer>
                    }

                    <Divider />

                    <MidiasContainer>
                        <MidiasTitle>Exercicios do tratamento</MidiasTitle>
                        <ExerciciosCardsContainers>
                            {tratamentoDetail.exercicios.map(exercicio => {
                                return (
                                    <ExercicioCardContainer key={exercicio.id}>
                                        <ExercicioCardTitle>{`Exercício ${tratamentoDetail.exercicios.findIndex(e => e.id === exercicio.id) + 1}: ${exercicio.titulo}`}</ExercicioCardTitle>
                                        {exercicio.type === 'Video' || exercicio.type === 'GIF' ? (
                                            <ReactPlayer
                                                url={getYouTubeVideoEmbedUrl(exercicio.linkArquivo)}
                                            />
                                        ) : (
                                            <ExercicioCardImage
                                                width={500}
                                                src={exercicio.linkArquivo} alt={exercicio.titulo}
                                                fallback="data:image/png;base64,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"
                                            />
                                        )}
                                        {exercicio.type === 'Video' &&
                                            <MediaLink href={exercicio.linkArquivo} target="_blank" rel="noopener noreferrer">
                                                Abrir no navegador
                                            </MediaLink>
                                        }
                                        <RowContainer>
                                            <RowShowItem>
                                                <RowLabel>Descrição:</RowLabel>
                                                <RowValue>{exercicio.descricao}</RowValue>
                                            </RowShowItem>
                                        </RowContainer>
                                    </ExercicioCardContainer>
                                )
                            })}
                        </ExerciciosCardsContainers>
                        {currentUserIsOwner() &&
                            <RowContainer>
                                <EditTratamentoButtonContainer>
                                    <Button
                                        size="large"
                                        icon={<EditOutlined />}
                                        onClick={() => navigate('/tratamento/editar/' + tratamentoDetail.id)}
                                    >
                                        Editar Tratamento
                                    </Button>
                                </EditTratamentoButtonContainer>
                            </RowContainer>
                        }
                    </MidiasContainer>
                </TratamentoDetailsContainer>
            }

        </>
    );
};
export default TratamentoDetail;

const EditTratamentoButtonContainer = styled.div`
margin-top: 16px;
    .ant-btn-default:hover {
        color: #0BD980 !important;
        border-color: #0BD980 !important;
    }
`


const TratamentoTitle = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MediaLink = styled.a`
  font-size: 1rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: fit-content;
    gap: 16px;
`;

const RowShowItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const RowLabel = styled.p`
    font-size: 1rem;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

const RowValue = styled.p`
    font-size: 1rem;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RowDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: #000;
`;

const TratamentoDetailsContainer = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const MidiasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const MidiasTitle = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ExerciciosCardsContainers = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`

const ExercicioCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 1px 0 #d9d9d9;
`

const ExercicioCardTitle = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ExercicioCardImage = styled(Image)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`