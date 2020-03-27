import React, {useEffect,useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';



export default function Profile(){

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    

    useEffect(()=>{
        //Rota do backend
        api.get('/profile',{
            headers: {
                authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })                                                                                                                                                                                                                                                                                                                                                                                       
    },[ongId]);

    async function handleDeleteIncident(id){

        try {
            await api.delete(`/incidents/${id}`,{
                headers:{
                    authorization: ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente');
        }

    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');


    }


    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Bem vindo: {ongName}</span>
                <Link className="button" to="/newincident">Cadastrar novo caso</Link>
                <button onClick={handleLogout}className="button">
                    <FiPower size={18} color={"#E02041"}></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Descricão:</strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        
                        <button onClick={() => {handleDeleteIncident(incident.id)}}type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                       
                        
                    </li>

                ))}

            </ul>
        </div>
    );
}