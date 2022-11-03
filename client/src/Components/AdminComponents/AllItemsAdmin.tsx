import React, { ReactElement } from "react";
import { FiUser, FiUserPlus } from "react-icons/fi";
import BigChartContainer from "./BigChartContainer";
import OverallCard from "./OverallCard";
import SmallChartContainer from "./SmallChartContainer";

interface Props {}

export default function AllItemsAdmin({}: Props): ReactElement {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 p-5">
      <OverallCard
        color={"yellow"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios"}
      />
      <OverallCard
        color={"yellow"}
        quantity={1}
        icon={<FiUserPlus className="w-6 h-6" />}
        title={"Admins"}
        key={"admins"}
      />
      <BigChartContainer />
      <SmallChartContainer />
      <SmallChartContainer />
    </section>
  );
}
