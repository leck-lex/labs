import './Login.scss';
import { FormEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/storeHooks';
import { login } from '@/app/features/auth/authThunks';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '@/router/appRouterConfig';
import { motion } from 'framer-motion';
import { resetStatus } from '@/app/features/auth/authSlice';

/**
 *
 */
function Login(): JSX.Element {
    const dispatch = useAppDispatch();
    const { user, status } = useAppSelector((state) => state.auth);
    const refEmail = useRef<HTMLInputElement | null>(null);
    const refPassword = useRef<HTMLInputElement | null>(null);
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
    const demoPassword = import.meta.env.VITE_DEMO_PW;

    useEffect(() => {
        refEmail.current && refEmail.current.focus();
        return () => {
            dispatch(resetStatus());
        };
    }, []);

    /**
     *
     */
    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        if (status === 'loading') return;
        dispatch(
            login({
                email: refEmail.current?.value as string,
                password: refPassword.current?.value as string,
            })
        );
    }

    if (user) {
        return <Navigate to={appRoutes.ADMIN} />;
    }

    return (
        <div className="login">
            <h1 className="title">Log in</h1>
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
                className="form"
                onSubmit={handleSubmit}
            >
                <div className="card-form">
                    <div className="form-control">
                        <label className="font-bold" htmlFor="email">
                            Email <span className="demo">{`(Demo: ${demoEmail})`}</span>
                        </label>
                        <input
                            ref={refEmail}
                            type="email"
                            name="email"
                            id="email"
                            required
                            defaultValue={demoEmail}
                        />
                    </div>
                    <div className="form-control">
                        <label className="font-bold" htmlFor="email">
                            Password <span className="demo">{`(Demo: ${demoPassword})`}</span>
                        </label>
                        <input
                            ref={refPassword}
                            type="password"
                            name="password"
                            id="password"
                            required
                            defaultValue={demoPassword}
                        />
                    </div>

                    {status === 'error' && <div className="error">Wrong email or password.</div>}
                </div>
                <input className="btn-primary btn-submit" type="submit" value="Submit" />
            </motion.form>
        </div>
    );
}

export default Login;
