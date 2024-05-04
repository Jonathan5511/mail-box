import { Button,Container,Navbar, NavbarBrand} from "react-bootstrap";

import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const MainNavigation = ()=>{
    const dispatch = useDispatch()
    const isAuth = useSelector(state=>state.auth.isAuthenticated)

    const onLogoutHandler=()=>{
        dispatch(authActions.logout(null))
    }

    return(
        <Fragment>
     
            <Navbar className="d-flex justify-content-end navbar-dark align-items-center bg-success " > 
            <Container>
                <NavbarBrand style={{fontSize:'35px',fontWeight:'bold'}}>MailBox</NavbarBrand>
                
                {isAuth && <Button variant="light" onClick={onLogoutHandler}>Logout</Button>}
            </Container>
                
            </Navbar>

        </Fragment> 
    )
}

export default MainNavigation