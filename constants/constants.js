

const onboarding_screens = [
    {
        id: 1,
        bannerImage: require("../assets/images/ALS_Logo.png"),
        backgroundImage: require("../assets/images/background_01.png"),
        title: "Dịch vụ kho vận",
        description: "ALS sở hữu hệ thống kho lớn với tổng diện tích lên tới 1.000.000 m2. Đa dạng loại hình kho phục vụ đáp ứng ..."
    },
    {
        id: 2,
        bannerImage: require("../assets/images/ALS_Logo.png"),
        backgroundImage: require("../assets/images/background_01.png"),
        title: "Nhà ga hàng hóa",
        description: "Đáp ứng nhu cầu xử lý hàng hóa tại sân bay, ALS sở hữu nhà ga hàng hóa hiện đại bậc nhất tại Việt..."
    },
    {
        id: 3,
        bannerImage: require("../assets/images/ALS_Logo.png"),
        backgroundImage: require("../assets/images/background_01.png"),
        title: "Ga hàng hóa kéo dài",
        description: "Đáp ứng nhu cầu gom và xử lý hàng hóa quốc tế siêu tốc, hàng sẽ được tập kết, thông quan ngay..."
    }
]

const screens = {
    main_layout: "MainLayout",
    home: "Home",
    search: "Search",
    cart: "Cart",
    favourite: "Favourite",
    notification: "Notification",
    my_wallet: "My Wallet",
}

const bottom_tabs = [
    {
        id: 0,
        label: screens.home,
    },
    {
        id: 1,
        label: screens.search,
    },
    {
        id: 2,
        label: screens.cart,
    },
    {
        id: 3,
        label: screens.favourite,
    },
    {
        id: 4,
        label: screens.notification,
    },
]

const delivery_time = [
    {
        id: 1,
        label: "10 Mins",
    },
    {
        id: 2,
        label: "20 Mins"
    },
    {
        id: 3,
        label: "30 Mins"
    }
]

const ratings = [
    {
        id: 1,
        label: 1,
    },
    {
        id: 2,
        label: 2,
    },
    {
        id: 3,
        label: 3,
    },
    {
        id: 4,
        label: 4,
    },
    {
        id: 5,
        label: 5,
    }
]

const tags = [
    {
        id: 1,
        label: "Burger"
    },
    {
        id: 2,
        label: "Fast Food"
    },
    {
        id: 3,
        label: "Pizza"
    },
    {
        id: 4,
        label: "Asian"
    },
    {
        id: 5,
        label: "Dessert"
    },
    {
        id: 6,
        label: "Breakfast"
    },
    {
        id: 7,
        label: "Vegetable"
    },
    {
        id: 8,
        label: "Taccos"
    }
]
const track_order_status = [
    {
        id: 1,
        title: "Not Recived",
        sub_title: "Your awb has not received"
    },
    {
        id: 2,
        title: "Operating",
        sub_title: "Your awb has been operating"
    },
    {
        id: 3,
        title: "Done Execute",
        sub_title: "Your awb has been done Execute"
    },
    {
        id: 4,
        title: "Delivered",
        sub_title: "OK!"
    },
    // {
    //     id: 5,
    //     title: "Rate Us",
    //     sub_title: "Help us improve our service"
    // }
]
const track_custom_status = [
    {
        id: 1,
        title: "Dự kiến xếp dỡ",
        sub_title: ""
    },
    {
        id: 2,
        title: "Get In",
        sub_title: ""
    },
    {
        id: 3,
        title: "KVGS",
        sub_title: ""
    },
    {
        id: 4,
        title: "Get out",
        sub_title: "OK!"
    },
    // {
    //     id: 5,
    //     title: "Rate Us",
    //     sub_title: "Help us improve our service"
    // }
]
const locations = [
    {
        id: 1,
        title: "Tầng 1",
    },
    {
        id: 2,
        title: "Tầng 2",
    },
]
export default {
    onboarding_screens,
    screens,
    bottom_tabs,
    delivery_time,
    ratings,
    tags,
    track_order_status,
    track_custom_status,
    locations
}