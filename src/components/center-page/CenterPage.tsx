import React, { useContext } from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';
import { CenterDetailsTab } from './CenterDetailsTab';
import { EmployeesTab } from './EmployeesTab';
import { VisitorsTab } from './VisitorsTab';
import { ActivityGroupsTab } from './ActivityGroupsTab';

const CenterPage: React.FC = () => {
    const { uuid } = useParams();
    const appState = useContext(AppContext);

    if (!appState.jwt) {
        return <Navigate to={'/login'} replace />;
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container mt-1 pt-2">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#center-details-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="center-details-tab-pane"
                            aria-selected="true"
                        >
                            Keskuse andmed
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#employees-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="employees-tab-pane"
                            aria-selected="false"
                        >
                            Töötajad
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#visitors-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="visitors-tab-pane"
                            aria-selected="false"
                        >
                            Külastajad
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#activity-groups-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="activity-groups-tab-pane"
                            aria-selected="false"
                        >
                            Tegevused
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="center-details">
                    <div
                        className="tab-pane fade show active"
                        id="center-details-tab-pane"
                        role="tabpanel"
                        aria-labelledby="center-details-tab"
                        tabIndex={0}
                    >
                        <CenterDetailsTab youthCenterUuid={uuid!} />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="employees-tab-pane"
                        role="tabpanel"
                        aria-labelledby="employee-details-tab"
                        tabIndex={1}
                    >
                        <EmployeesTab youthCenterUuid={uuid!} />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="visitors-tab-pane"
                        role="tabpanel"
                        aria-labelledby="visitors-tab"
                        tabIndex={2}
                    >
                        <VisitorsTab youthCenterUuid={uuid!} />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="activity-groups-tab-pane"
                        role="tabpanel"
                        aria-labelledby="ctivity-groups-tab"
                        tabIndex={3}
                    >
                        <ActivityGroupsTab youthCenterUuid={uuid!} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CenterPage;
