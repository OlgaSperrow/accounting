import ProfileData from "./ProfileData.tsx";
import UpdateUser from "./UpdateUser.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteToken} from "../../features/token/tokenSlice.ts";
import {deleteUser} from "../../features/user/userSlice.ts";

const Profile = () => {
    const dispatch = useAppDispatch();
    const handleClickLogout = () => {
        dispatch(deleteToken());
        dispatch(deleteUser());
    }
    return (
        <>
            <ProfileData/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateUser/>
        </>
    );
};

export default Profile;