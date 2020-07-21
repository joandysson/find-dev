import React, { useState, useEffect } from 'react';



function DevForm({ onSubmit }) {

    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude)
                setLongitude(longitude)
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handleAdd(e) {
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithub_username('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAdd}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do github</label>
                <input
                    id="github_username"
                    name="github_username"
                    onChange={e => setGithub_username(e.target.value)}
                    required />
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    id="techs"
                    name="techs"
                    onChange={e => setTechs(e.target.value)}
                    required />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitute</label>
                    <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        required />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;