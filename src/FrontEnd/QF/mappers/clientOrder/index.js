import { dateFormatterWithDayName } from "../../utils/utils";

export function bookingDataMapper(arr) {
    let res = {}
    Object.values(arr).forEach(({ _id, address, contactNumber, associatedCustomer, customerName, dateOfAppointment, dateOfBooking, description, professional, isCanceled, isPending, isAccepted, isActive, serviceName, associatedServiceman,
    }, index) => {
        res[index] = {
            bookingId: _id,
            address,
            associatedCustomer,
            associatedServiceman,
            contactNumber,
            customerName,
            dateOfAppointment: dateFormatterWithDayName(dateOfAppointment),
            dateOfBooking: dateFormatterWithDayName(dateOfBooking),
            description,
            professional,
            serviceName,
            status: getStatus(isCanceled, isPending, isAccepted, isActive)

        }

    });
    return Object.values(res);

}


export function reviewDataMapper(arr) {
    let res = {}
console.log(Object.values(arr))
    Object.values(arr).forEach(({ id,name, review, booking,
    }, index) => {
        res[index] = {
            reviewId: id,
            quality:review.quality,
            recommend:review.recommend,
            feedback:review.feedback,
            serviceName:booking.serviceName,
            name:name

        }

    });
    return Object.values(res);

}


const getStatus = (isCanceled, isPending, isActive, isAccepted) => {
    if (!isActive && !isCanceled && !isPending) return "Completed"
    if (isCanceled) return "Cancelled"
    if (isPending) return "Pending"
    if (isAccepted) return "Accepted"
    return "Completed"
}