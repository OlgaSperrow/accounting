import {useState} from "react";

interface Props {
    close: () => void;
}

const EditProfile = ({close}:Props) => {
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");

    const handleClickClear =() => {
        setFirstName("");
        setLastName("");
    }

    const handleClickSave =() => {
        //TODO
       alert("Click Save Profile");
        close();
    }

    return (
        <>
           <label> First Name
               <input type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}/>
           </label>

            <label> LastName
                <input type="text"
                       value={lastName}
                       onChange={(e) => setFirstName(e.target.value)}/>
            </label>

            <button onClick={handleClickSave}> Save and close</button>
            <button onClick={close}> Close without save</button>
            <button onClick={handleClickClear}> Clear</button>

        </>
    );
};

export default EditProfile;