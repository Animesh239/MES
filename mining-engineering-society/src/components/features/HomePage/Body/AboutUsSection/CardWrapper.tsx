import { Card } from "./Card";

export const CardWrapper = () => {
  const card = [
    {
      url: "https://res.cloudinary.com/dehegwbs0/image/upload/v1734127534/k0i3zjaupoz2cuj8nboc.png",
      description:
        "The Department of Mining Engineering at NIT Rourkela was established in 1979 in the midst of coal and mineral belt with a vision to become a global leader of higher learning in the field of eco-friendly exploitation and utilization of mineral resources for the welfare of the society and to be a preferred destination for undergraduate and graduate studies. The Department specializes in Mining Technology, Geomechanics and Strata Control, Mine Environment and Safety Engineering, Clean Coal Technology, Application of GIS and Remote Sensing in Mining, Computer Application in Mining, Mine Planning, Mine Surveying etc. It boasts modern and sophisticated equipment for physical as well as the latest computing facilities with state-of-the-art mining software. The faculty members are part of the different Expert and Technical Committees constituted for policy formulation and technical evaluation for mining industry. The Department frequently conducts continuing education programmes for the benefit of the professionals from industry and other academic, research and government regulatory organisations representing both national and international level.All-round development of students is practiced with exposure to mines through study tours to nearby mines, technical talks by outside experts, industry oriented projects and a host of other technical activities."
    },
    {
      url: "https://res.cloudinary.com/dehegwbs0/image/upload/v1734127829/yow1u2o4rx2pu7naw7af.jpg",
      description:
        "The vision of the Mining Engineering Society (MES) is to foster a community that drives innovation, excellence, and sustainability in the field of mining engineering. MES aspires to create an environment where students and professionals collaborate to advance mining technologies, prioritize safety, and address environmental challenges. By promoting research, skill development, and knowledge sharing, MES aims to shape future leaders who will contribute to the responsible extraction and utilization of natural resources. The society envisions bridging the gap between academia and industry, inspiring innovation and ethical practices for a better and more sustainable future in mining."
    },
    {
      url: "https://res.cloudinary.com/dehegwbs0/image/upload/v1734128156/poevruoltbhyyk8bleax.jpg",
      description:
        "The mission of the Mining Engineering Society (MES) is to empower students and professionals in the mining engineering field through education, skill development, and innovation. MES is committed to fostering a culture of safety, sustainability, and technological advancement, ensuring responsible resource management. By facilitating industry-academia collaboration, organizing workshops, and promoting research initiatives, MES aims to prepare its members to address global mining challenges and contribute to the development of sustainable mining practices."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 content-center  lg:grid-cols-3 p-2 sm:p-5 gap-5">
      {card.map((items, index) => (
        <Card key={index} url={items.url} description={items.description} />
      ))}
    </div>
  );
};
