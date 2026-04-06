import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Program from './models/Program.js';
import Event from './models/Event.js';
import Setting from './models/Setting.js';
import Member from './models/Member.js';

dotenv.config();

const team = [
  {
    name: 'Dr. Amit Chandra',
    role: 'Director',
    image: '/Board/Board1.png',
    order: 1,
    type: 'board'
  },
  {
    name: 'Kumar Anand',
    role: 'Academic Head',
    image: '/Board/Board2.png',
    order: 2,
    type: 'board'
  },
  {
    name: 'Sujatha Muthayya',
    role: 'Program Manager',
    image: '/Board/Board3.png',
    order: 3,
    type: 'board'
  },
  {
    name: 'Ms. Ananya Singh',
    role: 'Research Coordinator',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    order: 4,
    type: 'board'
  },
  {
    name: 'Renu Pokharna',
    role: 'Policy Advisor',
    image: '/Board/Board4.png',
    order: 5,
    type: 'board'
  },
];

const facultyMembers = [
  { name: "Dr. Amir Ullah Khan", role: "Leadership Program Director", image: "/Faculty/Faculty1.png", type: "faculty", featured: true },
  { name: "Dr Lawrence H. White", role: "Leadership Program Director", image: "/Faculty/Faculty2.png", type: "faculty", featured: true },
  { name: "Dr Liya Palagashvili", role: "Policy & Governance Expert", image: "/Faculty/Faculty3.png", type: "faculty", featured: true },
  { name: "Dr Shruti Rajagopalan", role: "Economic Policy Advisor", image: "/Faculty/Faculty4.png", type: "faculty", featured: true },
  { name: "Dr. JP Narayan", role: "Senior Fellow", image: "/Faculty/Faculty5.png", type: "faculty" },
  { name: "Dr M. Scott King", role: "Associate Professor", image: "/Faculty/Faculty6.png", type: "faculty" },
  { name: "Dr. Madhusudan Raj", role: "Assistant Professor", image: "/Faculty/Faculty7.png", type: "faculty" },
  { name: "Dr Nathan p Goodman", role: "Research Fellow", image: "/Faculty/Faculty8.png", type: "faculty" },
  { name: "Dr Per Bylund", role: "Research Associate", image: "/Faculty/Faculty9.png", type: "faculty" },
  { name: "Dr Shagata Mukherjee", role: "Visiting Scholar", image: "/Faculty/Faculty10.png", type: "faculty" },
  { name: "Dr Srinivasan Iyengar", role: "Adjunct Faculty", image: "/Faculty/Faculty11.png", type: "faculty" },
  { name: "Dr Jayme Lemke", role: "Visiting Faculty", image: "/Faculty/Faculty12.png", type: "faculty" },
  { name: "Dr Nicolas Cachanosky", role: "Distinguished Professor", image: "/Faculty/Faculty13.png", type: "faculty" },
  { name: "Dr Path J Shah", role: "Visiting Professor", image: "/Faculty/Faculty14.png", type: "faculty" },
  { name: "Erwin Dekker", role: "Senior Lecturer", image: "/Faculty/Faculty15.png", type: "faculty" },
  { name: "Jerry Johnson", role: "Visiting Fellow", image: "/Faculty/Faculty16.png", type: "faculty" },
  { name: "Kumar Anand", role: "Distinguished Fellow", image: "/Faculty/Faculty17.png", type: "faculty" },
  { name: "Mohammed Anas Khan", role: "Visiting Scholar", image: "/Faculty/Faculty18.png", type: "faculty" },
  { name: "Mohit Satyanand", role: "Visiting Associate", image: "/Faculty/Faculty19.png", type: "faculty" },
  { name: "Rohan Joshi", role: "Research Scholar", image: "/Faculty/Faculty20.png", type: "faculty" },
  { name: "Utkarsh Khare", role: "Visiting Researcher", image: "/Faculty/Faculty21.png", type: "faculty" },
  { name: "Yazad Jal", role: "Visiting Fellow", image: "/Faculty/Faculty22.png", type: "faculty" },
];

const programs = [
  {
    id: 'ipolicy-young-leaders',
    title: 'iPolicy',
    description: 'Engage in cutting-edge research on liberal economic policies and governance.',
    iconName: 'BookOpen',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'colloquium',
    title: 'Colloquium',
    description: 'Develop leadership skills through workshops. Learn from accomplished change-makers.',
    iconName: 'Users',
    color: 'from-blue-600 to-indigo-500'
  }
];

const events = [
  {
    id: 'yls-2024',
    programId: 'ipolicy-young-leaders',
    title: 'iPolicy Youth Leadership 2024',
    date: 'August 2024',
    isPast: true,
    about: 'The Youth Leadership Summit 2024 brought together young leaders from across the country to discuss governance, ethics, and leadership.'
  },
  {
    id: 'policy-dialogue',
    programId: 'ipolicy-young-leaders',
    title: 'Policy Dialogue Series',
    date: 'January 2024',
    isPast: true,
    about: 'The Policy Dialogue Series explored the intersection of technology and governance in the 21st century.'
  },
  {
    id: 'startup-policy',
    programId: 'colloquium',
    title: 'Startup & Policy Roundtable',
    date: 'February 2024',
    isPast: true,
    about: 'Our Startup & Policy Roundtable brought together entrepreneurs and regulators to discuss the challenges of the startup ecosystem.'
  }
];

const settings = [
  {
    key: 'HERO_VIDEO_URL',
    value: '/SA_web3.mp4',
    description: 'The background video for the hero section on the homepage.'
  },
  {
    key: 'UPCOMING_EVENTS_VISIBLE',
    value: true,
    description: 'Master toggle to show or hide the Upcoming Events section site-wide.'
  },
  {
    key: 'SITE_NOTIFICATION',
    value: 'Applications for iPolicy 2025 are now open!',
    description: 'A message displayed at the top of the website.'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await Program.deleteMany({});
    await Event.deleteMany({});
    await Setting.deleteMany({});
    await Member.deleteMany({});

    // Insert new data
    await Program.insertMany(programs);
    await Event.insertMany(events);
    await Setting.insertMany(settings);
    await Member.insertMany([...team, ...facultyMembers]);

    console.log('🌱 Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
