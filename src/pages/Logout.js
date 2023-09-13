import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUserID, setAuthToken }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setAuthToken()
        setUserID()
        window.localStorage.clear('st-token')
        window.localStorage.clear('st-user-id')
        navigate('/')
    }, [])

    return (
      <div>
        <div className='content'>
            <h2>Logout</h2>
            <h3>You are being logged out.</h3>
        </div>
      </div>
    );
  }
  
export default Logout;