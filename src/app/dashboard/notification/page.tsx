"use client";

import { useGetMessageQuery } from "@/redux/features/message/messageApi";
import { IoIosNotificationsOutline } from "react-icons/io";
import PageHeading from "@/components/PageHeading";
import LoaderWraperComp from "@/components/LoaderWraperComp";
import NotificationCart from "@/components/NotificationCart";

const Notification = () => {
  const { data, isLoading, isError } = useGetMessageQuery(undefined);
  //   console.log(data);
  console.log({ data, isLoading, isError });
  return (
    <div className="min-h-screen">
      <div className="bg-grayground min-h-[82vh] rounded-lg">
        <div className="px-[32px] py-[32px] border-b border-[#b7b6b6c9]">
          <PageHeading title={"Notification"} backPath="/dashboard" />
        </div>
        <LoaderWraperComp
          isLoading={isLoading}
          isError={isError}
          dataEmpty={data?.data?.length < 1}
          height="h-[60vh]"
        >
          <div className="py-[24px] space-y-[12px]">
            {data?.data?.map(
              (notification: { [key: string]: any }, index: number) => (
                <NotificationCart
                  key={notification.id}
                  data={notification}
                  index={index}
                />
              )
            )}
          </div>
        </LoaderWraperComp>
      </div>
    </div>
  );
};

export default Notification;
