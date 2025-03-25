import { useGlobalContext } from "../hooks/useGlobalContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Profile() {
  const { user } = useGlobalContext();

  const handleVerifyEmail = async () => {
    if (user) {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent! Please check your inbox.");
    }
  };

  return (
    <div className="align-elements py-10">
      <div className="flex flex-col items-center gap-4">
        {user?.photoURL && (
          <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full" />
        )}
        <h2 className="text-lg font-semibold">{user?.displayName || "No Name Provided"}</h2>
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
