import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { auth } from '../../firebase/setup';
import './otp.css';
import { postData } from "../../../QF/utils/utils";
import { SIGNUP_PATH } from "../../../QF/constants/constant";


const OTPpage = () => {
    const [otp, setOtp] = useState('');
    const [ph, setPh] = useState('');
    const [locationData, setLocationData] = useState({})
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const data = location.state?.userData;
        setLocationData(data)
        if (data.phone) {
            setPh("91"+data.phone);
        } else {
            setPh('1010101');
        }
    }, [location]);

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response) => {
                        onSignup();
                    },
                    'expired-callback': () => { },
                },
                auth,
            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = '+' + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success('OTP sended successfully!');
            })
            .catch((error) => {
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                setUser(res.user);
                setLoading(false);
                const response = postData(SIGNUP_PATH, locationData);
                navigate("/SignIn");
                toast.success("Registered Successfully");


            })
            .catch((err) => {
                setLoading(false);
            });
    }

    return (
        <section className="bg-grey-800 flex items-center justify-center h-screen">
            <div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                {user ? (
                    navigate('/dashboard')
                ) : (
                    <div className="otp-container">
                        {showOTP ? (
                            <>
                                <div className="otp-icon">
                                    <BsFillShieldLockFill size={30} />
                                </div>
                                <label className="otp-label">Enter your OTP</label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="otp-input"
                                ></OtpInput>
                                <button
                                    onClick={onOTPVerify}
                                    className="otp-verify-btn"
                                >
                                    {loading && <CgSpinner size={20} className="spinner" />}
                                    <span>Verify OTP</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="phone-icon">
                                    <BsTelephoneFill size={30} />
                                </div>
                                <label className="phone-label">Verify your phone number</label>
                                <PhoneInput country={'in'} value={ph} onChange={setPh} />
                                <button
                                    onClick={onSignup}
                                    className="send-code-btn"
                                >
                                    {loading && <CgSpinner size={20} className="spinner" />}
                                    <span>Send code via SMS</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default OTPpage;

// import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
// import { CgSpinner } from 'react-icons/cg';
// import { useNavigate, useLocation } from 'react-router-dom';
// import OtpInput from 'otp-input-react';
// import { useState, useEffect } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { toast, Toaster } from 'react-hot-toast';
// import { auth } from '../../firebase/setup';

// const OTPpage = () => {
//     const [otp, setOtp] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [showOTP, setShowOTP] = useState(false);
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();
//     const location = useLocation();
//     useEffect(() => {
//         // Extract phone number from location state
//         const phone = location.state?.phone;
//         if (phone) {
//             setPh(phone);
//         } else {
//             // Set default phone number if not found in location state
//             setPh('1010101');
//         }
//     }, [location]);


//     const [ph, setPh] = useState('');

//     function onCaptchVerify() {
//         if (!window.recaptchaVerifier) {
//             window.recaptchaVerifier = new RecaptchaVerifier(
//                 'recaptcha-container',
//                 {
//                     size: 'invisible',
//                     callback: (response) => {
//                         onSignup();
//                     },
//                     'expired-callback': () => { },
//                 },
//                 auth,
//             );
//         }
//     }

//     function onSignup() {
//         setLoading(true);
//         onCaptchVerify();

//         const appVerifier = window.recaptchaVerifier;

//         const formatPh = '+' + ph;

//         signInWithPhoneNumber(auth, formatPh, appVerifier)
//             .then((confirmationResult) => {
//                 window.confirmationResult = confirmationResult;
//                 setLoading(false);
//                 setShowOTP(true);
//                 toast.success('OTP sent successfully!');
//             })
//             .catch((error) => {
//                 setLoading(false);
//             });
//     }

//     function onOTPVerify() {
//         setLoading(true);
//         window.confirmationResult
//             .confirm(otp)
//             .then(async (res) => {
//                 setUser(res.user);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setLoading(false);
//             });
//     }

//     return (
//         <section className="bg-grey-800 flex items-center justify-center h-screen">
//             <div>
//                 <Toaster toastOptions={{ duration: 4000 }} />
//                 <div id="recaptcha-container"></div>
//                 {user ? (
//                     navigate('/dashboard')
//                 ) : (
//                     <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//                         {showOTP ? (
//                             <>
//                                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                                     <BsFillShieldLockFill size={30} />
//                                 </div>
//                                 <label htmlFor="otp" className="font-bold text-xl text-white text-center">
//                                     Enter your OTP
//                                 </label>
//                                 <OtpInput
//                                     value={otp}
//                                     onChange={setOtp}
//                                     OTPLength={6}
//                                     otpType="number"
//                                     disabled={false}
//                                     autoFocus
//                                     className="otp-container"
//                                 ></OtpInput>
//                                 <button
//                                     onClick={onOTPVerify}
//                                     className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                                 >
//                                     {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//                                     <span>Verify OTP</span>
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                                     <BsTelephoneFill size={30} />
//                                 </div>
//                                 <label htmlFor="" className="font-bold text-xl text-white text-center">
//                                     Verify your phone number
//                                 </label>
//                                 <PhoneInput country={'in'} value={ph} onChange={setPh} />
//                                 <button
//                                     onClick={onSignup}
//                                     className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                                 >
//                                     {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//                                     <span>Send code via SMS</span>
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default OTPpage;

// // import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
// // import { CgSpinner } from 'react-icons/cg';
// // import { useNavigate } from 'react-router-dom';


// // import OtpInput from 'otp-input-react';
// // import { useState } from 'react';
// // import PhoneInput from 'react-phone-input-2';
// // import 'react-phone-input-2/lib/style.css';
// // import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// // import { toast, Toaster } from 'react-hot-toast';
// // import { auth } from '../../firebase/setup';

// // const OTPpage = () => {
// //     const [otp, setOtp] = useState('');
// //     const [ph, setPh] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [showOTP, setShowOTP] = useState(false);
// //     const [user, setUser] = useState(null);
// //     const navigate = useNavigate();

// //     function onCaptchVerify() {
// //         if (!window.recaptchaVerifier) {
// //             window.recaptchaVerifier = new RecaptchaVerifier(
// //                 'recaptcha-container',
// //                 {
// //                     size: 'invisible',
// //                     callback: (response) => {
// //                         onSignup();
// //                     },
// //                     'expired-callback': () => { },
// //                 },
// //                 auth,
// //             );
// //         }
// //     }

// //     function onSignup() {
// //         setLoading(true);
// //         onCaptchVerify();

// //         const appVerifier = window.recaptchaVerifier;

// //         const formatPh = '+' + ph;

// //         signInWithPhoneNumber(auth, formatPh, appVerifier)
// //             .then((confirmationResult) => {
// //                 window.confirmationResult = confirmationResult;
// //                 setLoading(false);
// //                 setShowOTP(true);
// //                 toast.success('OTP sended successfully!');
// //             })
// //             .catch((error) => {
// //                 setLoading(false);
// //             });
// //     }

// //     function onOTPVerify() {
// //         setLoading(true);
// //         window.confirmationResult
// //             .confirm(otp)
// //             .then(async (res) => {
// //                 setUser(res.user);
// //                 setLoading(false);
// //             })
// //             .catch((err) => {
// //                 setLoading(false);
// //             });
// //     }

// //     return (
// //         <section className="bg-grey-800 flex items-center justify-center h-screen">
// //             <div>
// //                 <Toaster toastOptions={{ duration: 4000 }} />
// //                 <div id="recaptcha-container"></div>
// //                 {user ? (
// //                     navigate('/dashboard')
// //                 ) : (
// //                     <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
// //                         {showOTP ? (
// //                             <>
// //                                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
// //                                     <BsFillShieldLockFill size={30} />
// //                                 </div>
// //                                 <label htmlFor="otp" className="font-bold text-xl text-white text-center">
// //                                     Enter your OTP
// //                                 </label>
// //                                 <OtpInput
// //                                     value={otp}
// //                                     onChange={setOtp}
// //                                     OTPLength={6}
// //                                     otpType="number"
// //                                     disabled={false}
// //                                     autoFocus
// //                                     className="opt-container "
// //                                 ></OtpInput>
// //                                 <button
// //                                     onClick={onOTPVerify}
// //                                     className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
// //                                 >
// //                                     {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
// //                                     <span>Verify OTP</span>
// //                                 </button>
// //                             </>
// //                         ) : (
// //                             <>
// //                                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
// //                                     <BsTelephoneFill size={30} />
// //                                 </div>
// //                                 <label htmlFor="" className="font-bold text-xl text-white text-center">
// //                                     Verify your phone number
// //                                 </label>
// //                                 <PhoneInput country={'in'} value={ph} onChange={setPh} />
// //                                 <button
// //                                     onClick={onSignup}
// //                                     className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
// //                                 >
// //                                     {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
// //                                     <span>Send code via SMS</span>
// //                                 </button>
// //                             </>
// //                         )}
// //                     </div>
// //                 )}
// //             </div>
// //         </section>
// //     );
// // };

// // export default OTPpage;