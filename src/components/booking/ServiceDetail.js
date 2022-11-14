import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@rmwc/dialog";
import Carousel from "react-material-ui-carousel";
import BookingContext from "../../contexts/booking-context";

const ServiceDetail = (props) => {
    const { atrr, meth } = useContext(BookingContext)
    const { openDetail } = atrr
    const { setOpenDetail } = meth
    const [imagesList, setImagesList] = useState([])

    useEffect(() => {
        if (props.data?.length) {
            setImagesList([])
            props.data.forEach((it) => {
                setImagesList((oldArray) => [...oldArray, { url: it }])
            })
        }
    }, [props.data])

    return (
        <Dialog open={openDetail} onClose={() => setOpenDetail(false)} >
            <Carousel>
                {
                    imagesList?.length > 0 && imagesList.map((it, i) => (
                        <>
                            <img key={i} src={it.url} height={"550px"} alt={it.url} />
                        </>
                    ))
                }
            </Carousel>
        </Dialog>
    )
}

export default ServiceDetail