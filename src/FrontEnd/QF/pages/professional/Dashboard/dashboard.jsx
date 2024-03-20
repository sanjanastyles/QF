import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { dateFormatter, getCookie, getData } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUniversity } from '@fortawesome/free-solid-svg-icons';
import './dashboard.css'
import { PRO_PAGE_PATH } from '../../../constants/constant';
const ProfilePage = () => {
    const [data, setData] = useState();
    const { id,serviceId } = useParams();
    useEffect(() => {
        const queryParams = new URLSearchParams({ id: id }).toString();
        const url = `${PRO_PAGE_PATH}?${queryParams}`

        getData(url).then(e => e.code ? setData(e.data) : setData([]))

    }, [])
    const navigate = useNavigate();
    if (!data) return <div>Loading....</div>;
    return (
        <>
            <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
                }}
            >
                <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
            <div className="py-16 bg-blueGray-200">
                <div className="mx-auto px-4">
                    <div className="relative flex flex-col justify-center min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <img
                                        alt="Profile"
                                        style={{
                                            height: '183px',
                                            top: '48px',
                                            position: 'relative',
                                        }}
                                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                    />
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <button
                                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                navigate(`history/${getCookie('userId')}`);
                                            }}
                                        >
                                            View Jobs
                                        </button>
                                        <div className="serviceHead_container_button">
                                            <Link to={`/checkout/${id}/${serviceId}`}>
                                                <button className="button">Book Service</button>
                                            </Link>
                                        </div>


                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {data.numberOfReviews}
                                            </span>
                                            <span className="text-sm text-blueGray-400">Feedback</span>
                                        </div>

                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {data.userData.refer ?? 0}
                                            </span>
                                            <span className="text-sm text-blueGray-400">Referral</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                {data.numberOfJobs}
                                            </span>
                                            <span className="text-sm text-blueGray-400">
                                                'Jobs'
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {data.userData.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        className="mr-2 text-lg text-blueGray-400"
                                    />
                                    Contact {data.userData.email}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <FontAwesomeIcon icon={faUniversity} className="mr-2 text-lg text-blueGray-400" />
                                    Joined on {dateFormatter(data.userData.createdAt)}
                                </div>
                            </div>

                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                            <div className="flex flex-wrap justify-center">
                                                <div className="w-full lg:w-9/12 px-4">
                                                    <h4 className="mb-4 text-xl font-semibold leading-relaxed text-blueGray-700">
                                                        Jobs
                                                    </h4>
                                                    <ul className="list-disc list-inside">
                                                        {data.userData.jobs.map(({ name }, index) => (
                                                            <li key={index} className="mb-2 text-base text-blueGray-600">
                                                                {name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProfilePage;
