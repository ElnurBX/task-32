import HOME from "../pages/site/HOME/HOME";
import Shop from "../pages/site/shop/Shop";
import AdminRoot from "../pages/admin/AdminRoot";
import SiteRoot from "../pages/site/SiteRoot";
import Dashboard from "../pages/admin/dashbord/dashbord";
import Add from "../pages/admin/add/add";
import Edit from "../pages/admin/edit/edit";
const ROUTES =[
    {
        path:"/",
        element:<SiteRoot/>,
        children:[
            {
                path:"",
                element:<HOME/>
            },{
                path:"shop",
                element:<Shop/>
            }
        ]
    },
    {
        path:"/admin",
        element: <AdminRoot/>,
        children:[
            {
                path:"",
                element:<Dashboard/>
            },
            {
                path:"add",
                element:<Add/>

            },
            {
                path:"add/:id",
                element:<Edit/>
            }

        ]
    }
]
export default ROUTES