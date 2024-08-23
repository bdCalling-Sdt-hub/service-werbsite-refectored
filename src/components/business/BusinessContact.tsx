"use client";
import { useEffect, useState, useContext } from "react";

export default function BusinessContact({
  number,
  email,
}: {
  number: string | undefined;
  email: string | undefined;
}) {
  //   const appContext = useContext(context);
  // const token = Cookies.get("token");
  // const router = useRouter();

  // const [userData, setUserData] = useState<any>(null);

  //   useEffect(() => {
  //     if (token) {
  //       getSession(token).then((data) => {
  //         if (data) {
  //           setUserData(data);
  //         }
  //       });
  //     }
  //   }, [token]);
  //   if (appContext?.userData?.provider?._id.toString() === providerId) {
  //     return null;
  //   }

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-8 text-white font-light">
      <a href={"tel:" + number} target="_blank" className="line-clamp-1">
        <button
          className="flex items-center justify-center gap-2 w-52 h-16 bg-green-500 rounded-md"
          // onClick={() => {
          //   if (!userData) {
          //     router.push("/login");
          //     return;
          //   }
          //   router.push(`tel:${number}`);
          //   addCommunication({
          //     userId: userData?.id,
          //     providerId,
          //     type: "call",
          //   });
          // }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.3999 3.5999C2.3999 2.93716 2.93716 2.3999 3.5999 2.3999H6.18335C6.76996 2.3999 7.27059 2.824 7.36702 3.40262L8.2542 8.72567C8.3408 9.24531 8.07837 9.76067 7.60718 9.99626L5.74941 10.9251C7.08897 14.2539 9.74592 16.9108 13.0747 18.2504L14.0035 16.3926C14.2391 15.9214 14.7545 15.659 15.2741 15.7456L20.5972 16.6328C21.1758 16.7292 21.5999 17.2298 21.5999 17.8165V20.3999C21.5999 21.0626 21.0626 21.5999 20.3999 21.5999H17.9999C9.38426 21.5999 2.3999 14.6155 2.3999 5.9999V3.5999Z"
              fill="white"
            />
          </svg>
          Call Now
        </button>
      </a>
      <button
        className="flex items-center  justify-center gap-2 w-52 h-16 bg-green-500 rounded-md"
        // onClick={() => {
        //   if (!userData) {
        //     router.push("/login");
        //     return;
        //   }
        //   router.push(`mailto:${email}`);
        //   addCommunication({
        //     userId: userData?.id,
        //     providerId,
        //     type: "message",
        //   });
        // }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.4039 7.06031L11.9998 11.8583L21.5959 7.06025C21.5235 5.79983 20.4785 4.80005 19.1999 4.80005H4.7999C3.52132 4.80005 2.47626 5.79986 2.4039 7.06031Z"
            fill="white"
          />
          <path
            d="M21.5999 9.74153L11.9998 14.5416L2.3999 9.7416V16.8C2.3999 18.1255 3.47442 19.2 4.7999 19.2H19.1999C20.5254 19.2 21.5999 18.1255 21.5999 16.8V9.74153Z"
            fill="white"
          />
        </svg>
        Send Message
      </button>
    </div>
  );
}
