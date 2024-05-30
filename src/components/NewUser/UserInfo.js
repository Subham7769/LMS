import { useParams } from "react-router-dom";

const UserInfo = () => {
  const { userID } = useParams();

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
        </div>
        <div className="text-xl">User Id : {userID}</div>
      </div>
    </div>
  );
};

export default UserInfo;
