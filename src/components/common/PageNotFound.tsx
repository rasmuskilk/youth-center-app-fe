import React from 'react';

const PageNotFound = () => {
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div
                            className="card bg-dark text-white"
                            style={{
                                borderRadius: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            <h1>404</h1>
                            <h2>PAGE NOT FOUND!</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PageNotFound;
