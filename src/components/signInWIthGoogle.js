import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
          type: 'Fleet',
          role: 'Admin',
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/dashboard";
      }
    });
  }
  return (
    <div>
      <p style={{textAlign:'center'}} className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img alt="google" src={require("../Images/google.png")} width={"60%"} />
      </div>
    </div>
  );
}
export default SignInwithGoogle;