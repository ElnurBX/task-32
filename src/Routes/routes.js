import HOME from "../pages/site/HOME/HOME";
import Shop from "../pages/site/shop/Shop";
import Details from "../pages/site/details/details";
import AdminRoot from "../pages/admin/AdminRoot";
import SiteRoot from "../pages/site/SiteRoot";
import Dashboard from "../pages/admin/dashbord/dashbord";
import Add from "../pages/admin/add/add";
import Edit from "../pages/admin/edit/edit";
import Error from "../pages/error/error";
import Blog from "../pages/site/blog/blog";
import AddBlog from "../pages/admin/addBlog/addBlog";
import BlogDashboord from "../pages/admin/BlogDashbord/blogDashbord";
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
            ,{
                path:"details/:id",
                element:<Details/>
            },
            {
                path:"blog",
                element:<Blog/>
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
            },{
                path:"addblog",
                element:<AddBlog/>
            },,{
                path:"Blogdashboord",
                element:<BlogDashboord/>
            }

        ]
    }
    ,    {
        path:"*",
        element:<Error/>,
        
    },
]
export default ROUTES