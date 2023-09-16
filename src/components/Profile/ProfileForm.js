import classes from "./ProfileForm.module.css";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/Context";
import {useHistory} from 'react-router-dom'

const ProfileForm = () => {
  const [enteredPass, setenteredPass] = useState("");
  const ctx = useContext(AuthContext);
  const History = useHistory()
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enteredPass);
    setenteredPass("");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD2_8ylNqNkFKFJDsH3IJCOpXInT_ZoEz0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.Token,

          password: enteredPass,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          const errorMessage = data.error.message;

          alert(errorMessage);
        });
      } else {
        return res.json().then((data) => {
          alert("Password Changed Successfully");

          ctx.Login(data.idToken);
          History.replace('/')
        });
      }
    });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          onChange={(e) => {
            setenteredPass(e.target.value);
          }}
          value={enteredPass}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
