import React, { useState } from "react";
import { auth, db, storage } from "./firebase"; // Ensure to import storage
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [type, setType] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let uploadedPhotoURL = photoURL;

      if (imageFile) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `profile_images/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        uploadedPhotoURL = await getDownloadURL(imageRef);
      }

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: uploadedPhotoURL,
          type: type,
          role: 'Admin',

        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      window.location.href = "/login";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Status</label>
        <select className="form-control" onChange={(e) => setType(e.target.value)} required>
          <option value="" disabled>Choose Type...</option>
          <option value="Fleet">Fleet</option>
          <option value="School">School</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Profile Picture</label>
        <input type="file" className="form-control" onChange={handleImageChange} />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register;
