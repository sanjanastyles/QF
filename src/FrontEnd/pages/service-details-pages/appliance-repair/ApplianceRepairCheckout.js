import { ServicesCheckout } from '../ServicesCheckout';
import { serviceData } from '../../../Data/ServicesData';
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../../QF/utils/utils';
import { ALL_SERVICE_PATH } from '../../../QF/constants/constant';

const ServiceManListHeading = () => {
    return (
        <Typography variant="h6" gutterBottom>
            List of Service Men
        </Typography>
    );
};

const ServiceManCard = ({ name, email, jobs, id , category}) => {
return (

        <Card
            sx={{
                backgroundColor: '#fff',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                borderRadius: "8px",
                cursor: "pointer",
                padding: "16px",
                "&:hover": {
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                }
            }}
        >
            <CardContent sx={{ textAlign: "center" }}>
                <Link to={`/professionals/dashboard/${id}/${category}`}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {email}
                    </Typography>
                    {/* {specialization.map(({ name }) => <Typography color="textSecondary" component="h2">{name}</Typography>
                )} */}
                    <Typography variant="h5" component="p" gutterBottom>
                        Number of Past Jobs - {jobs?.length}
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};

const ApplianceRepairServiceCheckout = ({ service, category }) => {
    const [data, setData] = useState();

    useEffect(() => {

        getData(`${ALL_SERVICE_PATH}/${category}`).then(e => e.code === 200 ? setData(e.data) : setData([]))

    }, [])

    if (!data) return <div>loading...</div>
    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    borderRadius: "8px",
                    padding: "16px",
                    "&:hover": {
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                    }
                }}
            >
                <ServiceManListHeading />
                <Grid container spacing={3}>
                    {data.length > 0 && data.map(({ _id, name, jobs, email, jobId }, index) => <Grid item xs={12} sm={6} md={4} key={index}>
                        <ServiceManCard name={name} specialization={jobs} email={email} jobs={jobId} id={_id} category={category}/>
                    </Grid>)}
                </Grid>
            </Box>
            <ServicesCheckout title={service.desc} desc={service.checkout_desc} img={service.img} category={category} />
        </>
    );
};

export default function ServicePage() {
    const { category, subCategory } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const serviceCategory = serviceData[category];
        const selectedService = serviceCategory.find(service => service.id.toLowerCase() === subCategory.toLowerCase());
        setData(selectedService);
    }, [category, subCategory]);

    return <ApplianceRepairServiceCheckout service={data} category={category} />;
}
