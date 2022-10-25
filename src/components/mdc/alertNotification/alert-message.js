import React, { useContext, useMemo, useState } from "react";
import { Snackbar, SnackbarAction } from "@rmwc/snackbar";
import AlertMessageContext from "../../../contexts/alert-message-context";
import "./alertMessage.module.css"

const AlertMessage = () => {
    const { data, dispatchData } = useContext(AlertMessageContext);
    const [notificationTimeout, setNotificationTimeout] = useState(null);

    useMemo(() => {
        if (data.show) {
            clearTimeout(notificationTimeout);
            setNotificationTimeout(setTimeout(() => {
                data.text = '';
                dispatchData();
            }, 5000));
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <Snackbar open={data.show} message={data.text}
            dismissesOnAction leading
            onClose={(e) => dispatchData()}
            icon={data.type === 'success'
                ? 'check-bold'
                : data.type === 'error'
                    ? 'alert-octagon'
                    : 'alert-octagon'}
            action={
                <SnackbarAction
                    label={'Hide'}
                />
            }
        />
    )

}

export default AlertMessage