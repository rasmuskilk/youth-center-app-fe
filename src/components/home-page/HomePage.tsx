import React, { useContext, useEffect, useState } from 'react';
import { YouthCenter } from '../../domain/YouthCenter';
import { YouthCenterService } from '../../service/youth-center/YouthCenterService';
import { AppContext } from '../../state/AppContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const appState = useContext(AppContext);
    const navigate = useNavigate();

    const redirectToLink = (uuid: string) => {
        navigate(`/centers/${uuid}`);
    };

    const [youthCenters, setYouthCenters] = useState<YouthCenter[]>([]);
    const [newCenterName, setNewCenterName] = useState<string>('');
    const [newCenterAddress, setNewCenterAddress] = useState<string>('');

    const [youthCenterUpdated, setYouthCenterUpdated] = useState('');
    const [youthCenterRemoved, setYouthCenterRemoved] = useState('');

    const youthCenterService = new YouthCenterService();

    useEffect(() => {
        fetchYouthCenters();
    }, []);

    const fetchYouthCenters = async () => {
        try {
            const response = await youthCenterService.getAll(
                appState.jwt?.token!,
            );

            setYouthCenters(response);
        } catch (error) {
            console.error('Error fetching centers:', error);
        }
    };

    const addYouthCenter = async () => {
        if (newCenterName.length < 5) {
            return;
        }
        await youthCenterService.add(
            { name: newCenterName, address: newCenterAddress },
            appState.jwt?.token!,
        );
        await fetchYouthCenters();
    };

    const removeYouthCenter = async (uuid: string) => {
        await youthCenterService.remove(uuid, appState.jwt?.token!);
        setYouthCenterRemoved(uuid);
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-6">
                <h2>Noortekeskused</h2>
                <hr />
                <div>
                    <div className="row g-5">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Noortekeskuse nimi"
                                onChange={(e) => {
                                    setNewCenterName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Aadress"
                                onChange={(e) => {
                                    setNewCenterAddress(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-success"
                                onClick={async () => await addYouthCenter()}
                            >
                                Lisa
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="list-group">
                    {youthCenters.map((youthCenter) => (
                        <button
                            key={youthCenter.uuid}
                            type="button"
                            onClick={() => redirectToLink(youthCenter.uuid!)}
                            className="list-group-item list-group-item-action"
                        >
                            {youthCenter.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePage;
