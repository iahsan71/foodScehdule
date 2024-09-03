import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Main = props => {
	const uid = useSelector((state) => state.authUser.uid);
    const history = useHistory();
    // useEffect(() => {
        if (!uid) {
            history.push("/auth/login");
        }
    // }, [uid]);
	return (
		<>
			{props.children}
		</>
	);
};

export default Main;
