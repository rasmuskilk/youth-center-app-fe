import React, { useContext, useEffect, useState } from 'react';
import { YouthCenter } from '../../domain/YouthCenter';
import { YouthCenterService } from '../../service/youth-center/YouthCenterService';
import { AppContext } from '../../state/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const appState = useContext(AppContext);
    const navigate = useNavigate();

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    const redirectToLink = (uuid: string) => {
        navigate(`/centers/${uuid}`);
    };

    const [youthCenters, setYouthCenters] = useState<YouthCenter[]>([]);
    const [newCenterName, setNewCenterName] = useState<string>('');
    const [newCenterAddress, setNewCenterAddress] = useState<string>('');

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

    const deleteYouthCenter = async (youthCenterUuid: string) => {
        const confirmDelete = confirm('Kustuta noortekeskus?');

        if (!confirmDelete) {
            return;
        }

        await youthCenterService.remove(youthCenterUuid, appState.jwt?.token!);
        await fetchYouthCenters();
    };

    return (
        <section className="min-vh-100 gradient-custom">
            <div className="container mt-1">
                <h2 className="pt-2">Noortekeskused</h2>
                <hr />
                {appState.roles?.includes('admin') ? (
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
                        <hr />
                    </div>
                ) : null}
                <div className="list-group">
                    {youthCenters.map((youthCenter) => (
                        <div
                            key={youthCenter.uuid}
                            className="btn-group m-1"
                            role="group"
                            aria-label="Basic example"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    redirectToLink(youthCenter.uuid!)
                                }
                                className="list-group-item list-group-item-action m-1"
                            >
                                {youthCenter.name}
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    deleteYouthCenter(youthCenter.uuid!)
                                }
                                className="btn btn-danger m-1"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePage;
