import icons from './icons';
import {COLORS} from './theme';
const myProfile = {
  name: 'ByProgrammers',
  profile_image: require('../assets/images/profile.png'),
  address: 'No. 88, Jln Padungan, Kuching',
};
const categories = [
  {
    id: 1,
    name: 'Fast Food',
    icon: require('../assets/icons/burger.png'),
  },
  {
    id: 2,
    name: 'Fruit Item',
    icon: require('../assets/icons/cherry.png'),
  },
  {
    id: 3,
    name: 'Rice Item',
    icon: require('../assets/icons/rice.png'),
  },
];

const Location = [
  {id: 1, name: 'Tầng 1', color: '#F5C94E'},
  {id: 2, name: 'Tầng 2', color: '#933DA8'},
];
const featuresImpData = [
  {
    id: 101,
    icon: icons.awb,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    bgColor:['#46aeff', '#5884ff'],
    description: 'AWB Detail',
    screenName: 'ImpAwbScreen',
    srceenNavigagor: 'ImpAwb',
  },
  {
    id: 102,
    icon: icons.flightLanded,
    color: COLORS.yellow,
    bgColor:['#fddf90', '#fcda13'],
    backgroundColor: COLORS.lightyellow,
    description: 'Flight Minitor',
    screenName: 'FlightScreen',
    srceenNavigagor: 'Flight',
  },
  {
    id: 103,
    icon: icons.wallet,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    bgColor:['#e973ad', '#da5df2'],
    description: 'Bill',
    screenName: 'CallTruckScreen',
    srceenNavigagor: 'CallTruck',
  },
  // {
  //   id: 104,
  //   icon: icons.wallet,
  //   color: COLORS.red,
  //   backgroundColor: COLORS.lightRed,
  //   description: 'Wallet',
  // },
  // {
  //   id: 105,
  //   icon: icons.bill,
  //   color: COLORS.yellow,
  //   backgroundColor: COLORS.lightyellow,
  //   description: 'Bill',
  // },
  // {
  //   id: 106,
  //   icon: icons.game,
  //   color: COLORS.primary,
  //   backgroundColor: COLORS.lightGreen,
  //   description: 'Games',
  // },
  // {
  //   id: 107,
  //   icon: icons.phone,
  //   color: COLORS.red,
  //   backgroundColor: COLORS.lightRed,
  //   description: 'Mobile Prepaid',
  // },
  // {
  //   id: 108,
  //   icon: icons.more,
  //   color: COLORS.purple,
  //   backgroundColor: COLORS.lightpurple,
  //   description: 'More',
  // },
];
const featuresExpData = [
  {
    id: 201,
    icon: icons.awb,
    color: COLORS.yellow,
    description: 'AWB Detail',
    bgColor:['#ffc465', '#ff9c5f'],
    backgroundColor: COLORS.lightyellow,
    screenName: 'ExpAwbScreen',
    srceenNavigagor: 'ExpAwb',
  },
  {
    id: 202,
    icon: icons.flightDepart,
    color: COLORS.purple,
    description: 'Flight Minitor',
    bgColor:['#fcaba8', '#fe6bba'],
    backgroundColor: COLORS.lightpurple,
    screenName: 'FlightExpScreen',
    srceenNavigagor: 'FlightExp',
  },

  {
    id: 203,
    icon: icons.bill,
    color: COLORS.yellow,
    description: 'HDDT',
    bgColor:['#7cf1fb', '#4ebefd'],
    backgroundColor: COLORS.lightyellow,
    screenName: 'CallTruckScreen',
    srceenNavigagor: 'CallTruck',
  },
];
const featuresGenaralData = [
  {
    id: 301,
    icon: icons.truck,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    bgColor:['#7be993', '#46caaf'],
    description: 'Call Truck',
    screenName: 'CallTruckScreen',
    srceenNavigagor: 'CallTruck',
  },
  
];

const hamburger = {
  id: 1,
  name: 'Hamburger',
  description: 'Chicken patty hamburger',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/hamburger.png'),
};

const hotTacos = {
  id: 2,
  name: 'Hot Tacos',
  description: 'Mexican tortilla & tacos',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image: require('../assets/dummyData/hot_tacos.png'),
};

const vegBiryani = {
  id: 3,
  name: 'Veg Biryani',
  description: 'Indian Vegetable Biryani',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/veg_biryani.png'),
};

const wrapSandwich = {
  id: 4,
  name: 'Wrap Sandwich',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/wrap_sandwich.png'),
};
const menu = [
  {
    id: 1,
    name: 'Featured',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 2,
    name: 'Nearby you',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 3,
    name: 'Popular',
    list: [hamburger, hotTacos, wrapSandwich],
  },
  {
    id: 4,
    name: 'Newest',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 5,
    name: 'Trending',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 6,
    name: 'Recommended',
    list: [hamburger, hotTacos, wrapSandwich],
  },
];
export default {
  myProfile,
  categories,
  menu,
  featuresImpData,
  featuresExpData,
  featuresGenaralData,
  Location
};
