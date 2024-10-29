import React, { useState } from "react";
import Image from "next/image";
import profileDemo from "../../assets/images/profile-demo.jpg";
import { TUniObject } from "@/types";
import { usePathname } from "next/navigation";
import Modal from "../Reusable/Modal";
import { CustomSpinner } from "../CustomSpinner";
import { LuSendHorizonal } from "react-icons/lu";
import {
  useApplyJobMutation,
  useJobDeleteMutation,
} from "@/redux/features/jobs/jobsApi";
import Swal from "sweetalert2";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

const JobCard = ({ job }: { job: TUniObject }) => {
  const pathName = usePathname();
  const [modal, setModal] = useState(false);
  const [mutation, { isLoading }] = useApplyJobMutation();
  const [mutationDelete] = useJobDeleteMutation();

  const handleModalClose = () => {
    setModal(false);
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("jobId", job.id);
      const res = await mutation(formData).unwrap();
      if (res?.ok) {
        handleModalClose();
        (e as any).target.reset();
        Swal.fire({
          icon: "success",
          text: res.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text:
          (error as any).data.message ||
          "Something went wrong. Please try again later.",
      });
    }
  }
  const handleDeleteJob = async (id: string) => {
    Swal.fire({
      // title: ,
      text: "Are you sure you want to Delete this Post?",
      showCancelButton: true,
      confirmButtonText: "     Confirm    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then(async(res) => {
      if (res.isConfirmed) {
        try {
          const res = await mutationDelete(id).unwrap();
          if (res?.ok) {
            Swal.fire({
              icon: "success",
              text: res.message,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            text:
              (error as any).data.message ||
              "Something went wrong. Please try again later.",
          });
        }
      }
    });
  };
  return (
    <>
      <div className="my-8 p-6 border space-y-5 hover:bg-gray-50 hover:shadow transition-all">
        {pathName === "/dashboard/job-posts" ? (
          <>
            <div className="space-y-3 flex-1">
              <div className="flex justify-between gap-4">
                <h1 className="text-2xl font-semibold">{job?.title}</h1>
                <p className="text-sm">
                  {new Date(job.createdAt).toLocaleString()}
                </p>
              </div>
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              />
            </div>
            <div className="pt-5 flex justify-end gap-5">
              <button
                onClick={() => handleDeleteJob(job.id)}
                className=" bg-red-500 active:bg-red-600 disabled:cursor-not-allowed w-fit px-8 py-3 text-white rounded-md font-light outline-non flex justify-center items-center gap-2"
              >
                Delete
              </button>
              <Link href={`/dashboard/job-posts/application/${job.id}`}>
                <button
                  // onClick={() => rou}
                  className=" bg-green-500 active:bg-green-600 disabled:cursor-not-allowed w-fift px-8 py-3 text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
                >
                  View Application
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-start gap-4">
              <div className="max-w-20 w-full h-full overflow-hidden">
                <Image
                  src={
                    job.business?.user?.image
                      ? apiUrl + "/" + job.business?.user?.image
                      : profileDemo
                  }
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              <div className="flex-1 space-y-3 ">
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">
                    {job.business?.name || "N/A"}{" "}
                  </p>
                  <p className="text-sm">
                    {new Date(job.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="">{job.business?.address || "N/A"} </p>
              </div>
            </div>
            <div className="flex justify-start gap-4">
              <div className={`max-w-20 w-full h-full`}></div>
              <div className="space-y-3 flex-1">
                <h1 className="text-2xl font-semibold">{job?.title}</h1>
                <div
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{ __html: job?.description }}
                />
                <div className="pt-5">
                  <button
                    onClick={() => setModal(true)}
                    className=" bg-green-500 active:bg-green-600 disabled:cursor-not-allowed w-40 px-8 py-3 text-white rounded-md font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        isOpen={modal}
        onClose={handleModalClose}
        className="w-full max-w-[600px] p-8 bg-white rounded-lg"
      >
        <h2 className="text-center text-xl font-medium mb-6">
          Enter your updated Resume/CV pdf.
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            required
            className="border border-black-500 rounded-md p-4 w-full"
            placeholder="Resume/CV"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 active:bg-green-600 disabled:cursor-not-allowed py-3 px-10 mx-auto text-white rounded-md col-span-2 font-light outline-non disabled:bg-green-500 flex justify-center items-center gap-2"
          >
            Submit Document
            {isLoading ? <CustomSpinner /> : <LuSendHorizonal />}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default JobCard;
