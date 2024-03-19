import { useParams } from "react-router-dom";
import { Services } from "../../components/services/Services";
import {
  services_appliance_repair,
  services_painter,
  // services_business,
  services_plumbing,
  // services_beauty_and_spa,
  services_electrician,
  // services_house_cleaning,
  // services_online_instructor,
  // services_event_management,
} from "../../Data/ServicesData";

export default function AllServices() {
  const { category } = useParams();

  let servicesProps = [];
  let title = "";
  let tagLine = "";

  switch (category) {
    case "appliance_repair":
      servicesProps = services_appliance_repair;
      title = "Appliance Repair";
      break;
    case "electrician":
      servicesProps = services_electrician;
      title = "Electrician";
      break;
    case "plumbing":
      servicesProps = services_plumbing;
      title = "Plumbing";
      break;
    case "painter":
      servicesProps = services_painter;
      title = "Painter";
      break;
    // case "house_cleaning":
    //   servicesProps = services_house_cleaning;
    //   title = "House Cleaning";
    //   break;
    // case "online_instructor":
    //   servicesProps = services_online_instructor;
    //   title = "Online Instructor";
    //   break;
    // case "beauty_and_spa":
    //   servicesProps = services_beauty_and_spa;
    //   title = "Beauty and Spa";
    //   break;
    // case "event_management":
    //   servicesProps = services_event_management;
    //   title = "Event Management";
    //   break;
    // case "business":
    //   servicesProps = services_business;
    //   title = "Business and Taxes";
    //   break;
    default:
      // Handle the case where category is not found
      break;
  }

  return (
    <>
      <Services
        servicesProps={servicesProps}
        title={title}
        tagLine={"Explore the greatest our services."}
        category={category}
      />
    </>
  );
}
