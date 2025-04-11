import {useState} from "react";
import {UpdateMode} from "../../utils/types.d";
import ChangePassword from "./changePassword.tsx";
import EditProfile from "./EditProfile.tsx";


const UpdateUser = () => {
    const [updateMode, setUpdateMode] = useState<UpdateMode>(UpdateMode.DEFAULT);

    switch (updateMode) {
        case UpdateMode.CHANGE_PASSWORD:
            return <ChangePassword close ={( ) => setUpdateMode(UpdateMode.DEFAULT) }/>
        case UpdateMode.EDIT_PROFILE:
            return <EditProfile close ={( ) => setUpdateMode(UpdateMode.DEFAULT) }/>
        default:
            return (
                <>
                    <button onClick={() =>setUpdateMode(UpdateMode.CHANGE_PASSWORD)}>Change Password</button>
                    <button onClick={( )=>setUpdateMode(UpdateMode.EDIT_PROFILE)}>Edit Profile</button>
                </>
            )
    }


};

export default UpdateUser;