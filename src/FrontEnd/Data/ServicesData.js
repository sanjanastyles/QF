// appliance_repair
import ac_repair from "../assets/appliance_repair/ac_repair.jpg";
import washing_machine_repair from "../assets/appliance_repair/washing_machine_repair.jpg";
import microwave_repair from "../assets/appliance_repair/microwave_repair.jpg";
import water_heater_repair from "../assets/appliance_repair/water_heater_repair.jpg";
import refrigerator_repair from "../assets/appliance_repair/refrigerator_repair.jpg";
import mixer_grinder_repair from "../assets/appliance_repair/mixer_grinder_repair.jpg";
import dishwasher_repair from "../assets/appliance_repair/dishwasher_repair.jpg";
import household_appliances_repair from "../assets/appliance_repair/household_appliances_repair.jpg";


// electrician
import fan from "../assets/electrician/fan.jpg";
import switchboard from "../assets/electrician/switchboard.jpg";
import new_internal_wiring from "../assets/electrician/new_internal_wiring.jpg";
import inverter_servicing from "../assets/electrician/inverter_servicing.jpg";
import cctv_camera from "../assets/electrician/cctv_camera.jpg";
import door_bell from "../assets/electrician/door_bell.jpg";
import fuse from "../assets/electrician/fuse.jpg";
import light_fitting from "../assets/electrician/light_fitting.jpg";

// plumbing
import water_tank from "../assets/plumbing/water_tank.jpg";
import tab_and_mixer from "../assets/plumbing/tab_and_mixer.jpg";
import basin_and_sink from "../assets/plumbing/basin_and_sink.jpg";
import toilet_and_bathroom from "../assets/plumbing/toilet_and_bathroom.jpg";
import water_leakage from "../assets/plumbing/water_leakage.jpg";
import whole_house_plumbing from "../assets/plumbing/whole_house_plumbing.jpg";

// painter
import room_painting from "../assets/painter/room_Painting.jpg";
import primer_Painting from "../assets/painter/primer_Painting.jpg";
import decorative_wall_painter from "../assets/painter/decorative_wall_painter.jpg";



export const popularServices = [
    {
        id: "ac_repair",
        desc: 'Air Conditioner',
        img: ac_repair,
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },
    {
        id: 'decorative_wall_painting',
        desc: 'Decorative Wall Painting',
        img: decorative_wall_painter,
        category: 'painter',
        status: "active",
        price: "$120.00",
    },
    {
        id: 'water_leakage',
        desc: 'water Leakage ',
        img: water_leakage,
        status: "active",
        price: "$120.00",
    },
]
export const services_appliance_repair = [
    {
        serviceId: 1,
        id: "ac_repair",
        desc: 'Air Conditioner',
        img: ac_repair,
        checkout_desc: 'We are here to tend to the world class AC repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },

    {
        serviceId: 2,
        id: "microwave_repair",
        desc: 'Microwave and Oven',
        img: microwave_repair,
        checkout_desc: 'We are here to tend to the world class Microwave repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",

    },
    {
        serviceId: 3,
        id: "mixer_grinder_repair",
        desc: 'Mixer Grinder',
        img: mixer_grinder_repair,
        checkout_desc: 'We are here to tend to the world class Mixer and Grinder repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 4,
        id: "refrigerator_repair",
        desc: 'Refrigerator',
        img: refrigerator_repair,
        checkout_desc: 'We are here to tend to the world class Refrigerator repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 5,
        id: "washing_machine_repair",
        desc: 'Washing Machine',
        img: washing_machine_repair,
        checkout_desc: 'We are here to tend to the world class Washing Machine repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 6,
        id: "water_heater_repair",
        desc: 'Water Heater',
        img: water_heater_repair,
        checkout_desc: 'We are here to tend to the world class Water Heater repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 7,
        id: "dishwasher_repair",
        desc: 'Dishwasher',
        img: dishwasher_repair,
        checkout_desc: 'We are here to tend to the world class Dishwasher repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 8,
        id: "household_appliance_repair",
        desc: 'Household Appliance',
        img: household_appliances_repair,
        checkout_desc: 'We are here to tend to the world class Household Appliance repairing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'appliance_repair',
        status: "active",
        price: "$120.00",
    }
]
export const services_electrician = [
    {
        serviceId: 9,
        id: 'fan',
        desc: 'Fan Repair and Installation',
        img: fan,
        checkout_desc: 'We are here to tend to the world class Fan repairing or installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 10,
        id: 'switchboard',
        desc: 'Switchboard Repair and Installation',
        img: switchboard,
        checkout_desc: 'We are here to tend to the world class Switchboard repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 11,
        id: 'fuse',
        desc: 'Fuse Repair and Installation',
        img: fuse,
        checkout_desc: 'We are here to tend to the world class Fuse repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 12,
        id: 'new_internal_wiring',
        desc: 'New internal wiring',
        img: new_internal_wiring,
        checkout_desc: 'We are here to tend to the world class Internal Wiring repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 13,
        id: 'inverter_servicing',
        desc: 'Inverter Repair and Installation',
        img: inverter_servicing,
        checkout_desc: 'We are here to tend to the world class Inverter repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",

    },
    {
        serviceId: 14,
        id: 'light_fitting',
        desc: 'Lights Repair and Installation',
        img: light_fitting,
        checkout_desc: 'We are here to tend to the world class Light repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 15,
        id: 'cctv_camera',
        desc: 'CCTV camera Repair and Installation',
        img: cctv_camera,
        checkout_desc: 'We are here to tend to the world class CCTV repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 16,
        id: 'door_bell',
        desc: 'Door bell Repair and Installation',
        img: door_bell,
        checkout_desc: 'We are here to tend to the world class Door Bell repairing and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'electrician',
        status: "active",
        price: "$120.00",
    }
]
export const services_plumbing = [
    {
        serviceId: 17,
        id: 'water_tank',
        desc: 'Water Tank Cleaning and Installation',
        img: water_tank,
        checkout_desc: 'We are here to the give quality Water Tank cleaning and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'plumbing',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 18,
        id: 'tab_and_mixer',
        desc: 'Tab and Mixer Repair and Installation',
        img: tab_and_mixer,
        checkout_desc: 'We are here to the give quality Tab and Mixer repair and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'plumbing',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 19,
        id: 'basin_and_sink',
        desc: 'Basin and Sink Repair and Installation',
        img: basin_and_sink,
        checkout_desc: 'We are here to the give quality Basin and Sink repair and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'plumbing',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 20,
        id: 'toilet_and_bathroom',
        desc: 'Toilet, Bathroom or Kitchen',
        img: toilet_and_bathroom,
        checkout_desc: 'We are here to the give quality Toilet, Bathroom or Kitchen plumbing services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'plumbing',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 21,
        id: 'water_leakage',
        desc: 'water Leakage ',
        img: water_leakage,
        checkout_desc: 'We are here to the give quality water leakage fixing service to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'plumbing',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 22,
        id: 'whole_house_plumbing',
        desc: 'Whole House Plumbing ',
        img: whole_house_plumbing,
        checkout_desc: 'We are here to the give quality whole house plumbing repair and installation services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'plumbing',
        status: "active",
        price: "$120.00",
    }
]

export const services_painter = [
    {
        serviceId: 23,
        id: 'room_painting',
        desc: 'Room Painting',
        img: room_painting,
        checkout_desc: 'We are here to the give quality Room Painting services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'painter',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 24,
        id: 'primer_painting',
        desc: 'Primer Painting',
        img: primer_Painting,
        checkout_desc: 'We are here to the give quality Primer Painting services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'painter',
        status: "active",
        price: "$120.00",
    },
    {
        serviceId: 25,
        id: 'decorative_wall_painting',
        desc: 'Decorative Wall Painting',
        img: decorative_wall_painter,
        checkout_desc: 'We are here to the give quality Decorative Wall Painting services to our costumers no matter what it takes. Thanks for Trusting us.',
        category: 'painter',
        status: "active",
        price: "$120.00",
    }

]


/**
 * @TODO need to move to Backend
 */

export const serviceData = {
    popularServices: popularServices,
    appliance_repair:services_appliance_repair,
    electrician:services_electrician,
    plumbing:services_plumbing,
    painter:services_painter,
}





