import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const { user } = useGlobalContext();
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL);
  const [successMessage, setSuccessMessage] = useState("");

  const storage = getStorage();

  const handleVerifyEmail = async () => {
    if (user) {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent! Please check your inbox.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setNewPhoto(file);
    }
  };

  const handleSavePhoto = async () => {
    if (!newPhoto) return;

    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
    await uploadBytes(storageRef, newPhoto);
    const photoURL = await getDownloadURL(storageRef);

    await updateProfile(auth.currentUser, { photoURL });

    setPreview(photoURL);
    setNewPhoto(null);
    setSuccessMessage("✅ Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setPreview(user?.photoURL); 
    setNewPhoto(null); 
  };

  return (
    <div className="align-elements py-10 flex flex-row items-center gap-10">
      <div className="flex flex-col items-center">
        <img
          src={preview || "/default-avatar.png"}
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-gray-300"
        />
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-2" />
        {newPhoto && (
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => {
                handleSavePhoto();
                setNewPhoto(null); 
              }}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
        {successMessage && (
          <p className="text-green-600 mt-2 font-semibold">{successMessage}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{user?.displayName || "No Name Provided"}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-sm">
          {user?.emailVerified ? (
            <span className="text-green-600">Verified ✅</span>
          ) : (
            <span className="text-red-600 flex items-center gap-2">
              Not Verified ❌
              <button onClick={handleVerifyEmail} className="px-3 py-1 bg-blue-500 text-white rounded">
                Verify Now
              </button>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Profile;
