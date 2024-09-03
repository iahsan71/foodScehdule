import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Auth = props => {
	const uid = useSelector((state) => state.authUser.uid);
    let history = useHistory()

    useEffect(() => {
        if (uid) {
            history.push("/main/home")
        }
    }, [uid])
	return (
		<>
			{props.children}
		</>
	);
};

export default Auth;
