const routes = [
    // home
    {
        name: "home",
        path: "/",
        component: () => import(`@/views/home.vue`),
        meta: {
            title: 'App school',
            pageTitle: "App school",
            metaTags: [
                {
                name: 'description',
                content: 'Home page for app school.'
                },
                {
                property: 'og:description',
                content: 'Home page for app school.'
                }
            ]
        },  
    },
    // Dashboard
    {
        name: "dashboard",
        path: "/dashboard",
        component: () => import(`@/views/dashboard/index.vue`),
        meta: {
            title: 'Dashboard',
            pageTitle: "Dashboard",
            metaTags: [
                {
                name: 'description',
                content: 'Admin dashboard.'
                },
                {
                property: 'og:description',
                content: 'Admin dashboard.'
                }
            ]
        },  
    },
    // Student Area
    {
        name: "studentArea",
        path: "/studentArea",
        component: () => import(`@/views/studentArea/index.vue`),
        meta: {
            title: 'Student Area',
            pageTitle: "Dashboard",
            metaTags: [
                {
                name: 'description',
                content: 'Student Area.'
                },
                {
                property: 'og:description',
                content: 'Student Area.'
                }
            ]
        },  
    },
    // parent Area
    {
        name: "parentArea",
        path: "/parentArea",
        component: () => import(`@/views/parentArea/index.vue`),
        meta: {
            title: 'Student Area',
            pageTitle: "Parent area",
            metaTags: [
                {
                name: 'description',
                content: 'parent Area.'
                },
                {
                property: 'og:description',
                content: 'parent Area.'
                }
            ]
        },  
    },
];
export default routes