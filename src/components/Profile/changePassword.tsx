import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {changePassword} from "../../features/api/accountApi.ts";

interface Props {
    close: () => void;
}
const ChangePassword = ({close} : Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleClickClear =() => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleClickSave =() => {
        //TODO
        if (newPassword === confirmPassword) {
            dispatch(changePassword({newPassword, oldPassword}));
        }else{
            alert('Password changed not changed!!');
        }
        close();
    }


    return (
        <>
            <label>Old Password:
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}/>
            </label>

            <label>New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}/>
            </label>

            <label>Conform Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <button onClick={handleClickSave}> Save and close</button>
            <button onClick={close}> Close without save</button>
            <button onClick={handleClickClear}> Clear</button>
        </>
    );
};

export default ChangePassword;