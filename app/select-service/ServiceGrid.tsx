import {
  FaUtensils,
  FaBroom,
  FaCar,
  FaClinicMedical,
  FaLeaf,
  FaUserNurse,
} from 'react-icons/fa';
import ServiceCard from './ServiceCard';


const services = [
  {
    title: 'Meal Delivery',
    description: 'We offer subscription-based meal plans and delivery services.',
    image: '/Images/mealService.jpg',
    icon: <FaUtensils />,
    available: true,
  },
  {
    title: 'Home Cleaning',
    image: '/Images/homeCleaning.jpg',
    icon: <FaBroom />,
    available: false,
  },
  {
    title: 'Transportation',
    image: '/Images/transportation.jpg',
    icon: <FaCar />,
    available: false,
  },
  {
    title: 'Medical Consultation',
    image: '/Images/medicalConsult.jpg',
    icon: <FaClinicMedical />,
    available: false,
  },
  {
    title: 'Home Maintenance',
    image: '/Images/environmentTidy.jpg',
    icon: <FaLeaf />,
    available: false,
  },
  {
    title: 'Caregiver Application',
    image: '/Images/caregiverApply.jpg',
    icon: <FaUserNurse />,
    available: false,
  },
];

export default function ServiceGrid() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-20">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Find Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div key={idx} className="aspect-[1/1.03] max-w-[392px] w-full mx-auto">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
}
