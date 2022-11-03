import React from "react";
import { FiUser, FiUserPlus } from "react-icons/fi";
import BigChartContainer from "./BigChartContainer";
import OverallCard from "./OverallCard";
import SmallChartContainer from "./SmallChartContainer";

type Props = {};

export default function AllUsersAdmin({}: Props) {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 p-5">
      <OverallCard
        color={"green"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios1"}
      />
      <OverallCard
        color={"purple"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios2"}
      />
      <OverallCard
        color={"blue"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios3"}
      />
      <SmallChartContainer />

      <OverallCard
        color={"red"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios12"}
      />
      <BigChartContainer />
    </section>
  );
}
