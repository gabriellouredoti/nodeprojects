import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident(){

    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');


    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('/incidents',data,{
                headers: {
                    authorization: ongId
                }
            });
            
            history.push('/profile');
            
        } catch (error) {
            alert('Erro ao cadastrar o caso.');
        }
        






    }


    return(
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1> 
                    <p>Descreva o seu caso</p>
                    <Link className="back-link"to="/profile"><FiArrowLeft size={16} color={"#E02041"} />Voltar para a home</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input onChange={e => setTitle(e.target.value)} value={title} placeholder="Título do caso"/>
                    <textarea onChange={e => setDescription(e.target.value)} cols="30" rows="10" placeholder="Descreva o seu caso"></textarea>
                    <input onChange={e => setValue(e.target.value)} value={value} placeholder="Valor em R$"/>
                    
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    );

}