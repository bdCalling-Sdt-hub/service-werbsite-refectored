// "use client";
// import React, { useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { context } from "@/app/Context";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// if (!apiUrl) throw new Error("API URL is not defined");

// export default function Page() {
//   const appContext = React.useContext(context);
//   const userData = appContext?.userData;

//   const router = useRouter();
//   if (!userData) router.push("/login");

//   const [changes, setChanges] = React.useState<{ [key: string]: string }>({});
//   const [showModal, setShowModal] = React.useState(false);
//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   async function handelEdit(e: React.FormEvent<HTMLFormElement>) {
//     // e.preventDefault();
//     // if (changes.newPassword || changes.confirmPassword) {
//     //   if (changes.newPassword !== changes.confirmPassword) {
//     //     alert("new password and confirm password not matched");
//     //     return;
//     //   }
//     // }
//     // const res = await changeUserData(changes);

//     // alert(res.message);
//   }

//   async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
//     // const file = e.target.files?.[0];
//     // if (!file) return;
//     // const formData = new FormData();
//     // formData.append("image", file);
//     // const res = await uploadProfileImage(formData);
//     // if (res.data) {
//     //   appContext?.setUserData((prev) => {
//     //     if (!prev) return prev;
//     //     return { ...prev, image: res.data.image };
//     //   });
//     // } else {
//     //   alert(res.message);
//     // }
//   }

//   useEffect(() => {
//     setShowModal(userData?.type === "PROVIDER" )
//   }, [userData]);

//   if (!userData) return <h1 className="min-h-screen">Loading...</h1>;

//   return (
//     <section className="lg:mx-[150px] mx-auto serviceShadow rounded-2xl lg:p-14 p-6">
//       <h1 className="font-medium text-4xl">My profile</h1>
//       <div className="my-10 flex items-center gap-4 relative">
//         <Image
//           src={userData?.image}
//           alt="profile"
//           className="rounded-full max-w-[120px] max-h-[120px]"
//           width={120}
//           height={120}
//         />
//         <div>
//           <input
//             type="file"
//             name="profileImage"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={uploadImage}
//           />
//           <button
//             onClick={() => fileInputRef?.current?.click()}
//             className="rounded-t-[3px] border-[.5px] border-b-2 py-2 px-3 border-white bg-green-600 text-white font-light"
//           >
//             Upload
//           </button>
//         </div>
//       </div>
//       <form
//         className=" flex flex-col lg:grid lg:grid-cols-2 gap-6"
//         onSubmit={handelEdit}
//       >
//         {/* <form className="flex flex-col gap-5" onSubmit={handelEdit}> */}
//         <div className="w-full flex flex-col">
//           <label className="font-medium text-black-500">Name</label>
//           <input
//             type="text"
//             name="name"
//             defaultValue={userData.firstName}
//             onChange={(e) => setChanges({ ...changes, name: e.target.value })}
//             className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
//             placeholder="Name"
//           />
//         </div>
//         <div className="w-full flex flex-col">
//           <label className="font-medium text-black-500">Email</label>
//           <input
//             type="text"
//             name="email"
//             defaultValue={userData.email}
//             onChange={(e) => setChanges({ ...changes, email: e.target.value })}
//             className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
//             placeholder="Email"
//           />
//         </div>
//         <div className="w-full flex flex-col">
//           <label className="font-medium text-black-500">Mobile Number</label>
//           <input
//             type="text"
//             name="number"
//             defaultValue={userData.mobile??""}
//             onChange={(e) => setChanges({ ...changes, mobile: e.target.value })}
//             className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
//             placeholder="Your Number"
//           />
//         </div>
//         {/* <div className="w-full flex flex-col">
//           <label className="font-medium text-black-500">Address</label>
//           <input
//             type="text"
//             name="address"
//             defaultValue={userData.address}
//             onChange={(e) =>
//               setChanges({ ...changes, address: e.target.value })
//             }
//             className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
//             placeholder="Your Address"
//           />
//         </div> */}
//         {/* </form> */}
//         {/* <form className="flex flex-col gap-5" onSubmit={handelChangePass}> */}
//         {/* <p className="text-2xl my-3 font-medium">Change Password</p> */}
//         <div className="w-full flex flex-col">
//           <label className="font-medium text-black-500">New Password</label>
//           <input
//             type="text"
//             name="newPassword"
//             onChange={(e) =>
//               setChanges({ ...changes, newPassword: e.target.value })
//             }
//             className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
//             placeholder="New Password"
//           />
//         </div>
//         <div className="w-full flex flex-col">
//           <label className="font-medium text-black-500">Confirm Password</label>
//           <input
//             type="text"
//             name="confirmPassword"
//             onChange={(e) =>
//               setChanges({ ...changes, confirmPassword: e.target.value })
//             }
//             className="h-12 focus:outline-none p-3 rounded border-[#343333] border font-medium mt-2"
//             placeholder="Confirm Password"
//           />
//         </div>
//         <div className="col-span-2 flex justify-center mt-3">
//           <button className="rounded-t-[3px] border-[.5px] border-b-2 py-3 px-4 border-white bg-green-600 text-white font-light">
//             Save Changes
//           </button>
//         </div>
//         {/* <div className="col-span-2 flex justify-center mt-3">
//             <button className="rounded-t-[3px] border-[.5px] border-b-2 py-3 px-4 border-white bg-green-600 text-white font-light">
//               Change Password
//             </button>
//           </div> */}
//         {/* </form> */}
//       </form>
//       {/* {userData.provider && (
//         <EditBusniessDetails provider={userData.provider} />
//       )} */}

//       {showModal && <RegisterBusiness closeModal={setShowModal} />}
//     </section>
//   );
// }


// function RegisterBusiness({
//   closeModal,
// }: {
//   closeModal: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const router = useRouter();
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   });

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-[#27272780] fixed top-0 left-0 z-10">
//       <div className="bg-[#F6ECE9] p-6 rounded-3xl">
//         <p className="mt-4 mb-16">
//           Register your business to appear in search results
//         </p>
//         <div className="flex  gap-2 justify-end">
//           <button
//             className="px-6 py-2 border border-red-500 rounded-full text-red-500"
//             onClick={() => closeModal(false)}
//           >
//             Close
//           </button>
//           <button
//             className="px-6 py-2 bg-red-500 rounded-full text-white"
//             onClick={() => router.push("/register-business")}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
