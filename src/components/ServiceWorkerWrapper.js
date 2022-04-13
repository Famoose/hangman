import React, {useEffect, useState} from 'react';
import * as serviceWorker from "../serviceWorkerRegistration";
import {Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import {toast} from "react-hot-toast";
import {Trans, useTranslation} from "react-i18next";

const ServiceWorkerWrapper = () => {
    const {t} = useTranslation();

    const [showReload, setShowReload] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(true);
    const [wasOffline, setWasOffline] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState(null);

    const onSWUpdate = (registration) => {
        setShowReload(true);
        setWaitingWorker(registration.waiting);
    };

    useEffect(() => {
        serviceWorker.register({ onUpdate: onSWUpdate });
    }, []);


    useEffect(() => {
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });
        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });
    }, []);

    useEffect(() => {
        if(!onlineStatus){
            toast(t('serviceWorker.offline'), {
                duration: 5000,
                icon: '🔌'
            })
            setWasOffline(true)
        }
    }, [onlineStatus])

    useEffect(() => {
        if(onlineStatus && wasOffline){
            toast(t('serviceWorker.online'), {
                icon: '🎊'
            })
        }
    }, [onlineStatus, onlineStatus])

    const reloadPage = () => {
        waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
        setShowReload(false);
        window.location.reload();
    };

    return (
        <Snackbar
            open={showReload}
            message={t('serviceWorker.newVersion.message')}
            onClick={reloadPage}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            action={
                <Button
                    color="inherit"
                    size="small"
                    onClick={reloadPage}
                >
                    <Trans>serviceWorker.newVersion.action</Trans>
                </Button>
            }
        />
    );
}

export default ServiceWorkerWrapper;