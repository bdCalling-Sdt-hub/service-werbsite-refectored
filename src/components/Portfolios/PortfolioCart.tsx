"use client";
import { useDeletePortfolioMutation } from "@/redux/features/portfolio/portfolioApi";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("API URL is not defined");

export default function PortfolioCart({
  data,
}: {
  provider?: boolean;
  data: { [key: string]: string };
}) {
  const [deletePortfolio, { isLoading }] = useDeletePortfolioMutation();
  const pathname = usePathname();
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Do you want to delete the Portfolio?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deletePortfolio(id);
          if (res?.data?.ok) {
            Swal.fire("Delete!", "", "success");
          } else {
            Swal.fire({
              icon: "error",
              text: "Internal Server Error!!",
              // text: res.error?.data.message ,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "Something went wrong. Please try again later.",
          });
        }
      }
    });
  };
  return (
    <div className="relative">
      <div className="lg:h-[275px] lg:max-w-[250px] rounded overflow-hidden relative object-center">
        <Image
          src={apiUrl + data.image}
          alt={data.title}
          width={800}
          height={800}
          className="w-full h-full"
          priority
        />
        <p className="bg-green-500 py-2 absolute bottom-0 w-full text-center text-white">
          {data.name}
        </p>
      </div>
      {!pathname.includes("business") && (
        <button
          onClick={() => handleDelete(data.id)}
          className="absolute right-2 top-2 bg-red-400 hover:bg-red-500 text-white p-1.5 rounded-full border shadow-inner"
        >
          <IoTrashOutline size={18} />
        </button>
      )}
    </div>
  );
}
