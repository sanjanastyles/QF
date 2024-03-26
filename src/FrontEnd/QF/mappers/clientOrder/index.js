import { dateFormatterWithDayName } from "../../utils/utils";

export default function bookingDataMapper(arr) {
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
const getStatus = (isCanceled, isPending, isActive, isAccepted) => {
    if (isCanceled) return "Cancelled"
    if (isPending) return "Pending"
    if (!isActive) return "Completed"
    if (isAccepted) return "Accepted"
}