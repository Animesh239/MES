import {
  Pickaxe,
  Mountain,
  Users,
  Calendar,
  Gem,
  School,
  Trophy,
  Lightbulb
} from "lucide-react";
export const AboutUsData = [
  {
    id: "mes",
    header: {
      Icon: School,
      title: "MES",
      iconClass: "text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]",
      titleGradient: "bg-gradient-to-r from-blue-300 via-blue-400 to-purple-400"
    },
    description:
      "The Mining Engineering Society stands as a beacon of excellence in the field of mineral resource engineering. Founded with the vision to nurture future mining professionals, we've been at the forefront of technological advancement and sustainable mining practices.",
    items: [
      {
        icon: School,
        title: "Education",
        desc: "World-class miningEd",
        iconColor: "text-blue-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
      },
      {
        icon: Trophy,
        title: "Excellence",
        desc: "Industry-leading research",
        iconColor: "text-blue-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
      },
      {
        icon: Users,
        title: "Community",
        desc: "Strong alumni network",
        iconColor: "text-blue-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
      },
      {
        icon: Lightbulb,
        title: "Innovation",
        desc: "Cutting-edge solutions",
        iconColor: "text-blue-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
      }
    ],
    boxClasses:
      "group space-y-8 p-10 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800/50 shadow-[0_0_50px_rgba(59,130,246,0.1)] hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] transition-all duration-700"
  },
  {
    id: "minare25",
    header: {
      Icon: Gem,
      title: "Minare'25",
      iconClass: "text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]",
      titleGradient:
        "bg-gradient-to-r from-purple-300 via-purple-400 to-pink-400"
    },
    description:
      "Minare 25 represents the pinnacle of technical excellence in mining engineering. As our flagship annual festival, it brings together innovative minds, industry leaders, and aspiring engineers to showcase the latest advancements in mining technology and sustainable practices.",
    items: [
      {
        icon: Pickaxe,
        title: "Technical Events",
        desc: "Hands-on workshops",
        iconColor: "text-purple-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
      },
      {
        icon: Mountain,
        title: "Exhibitions",
        desc: "Geological wonders",
        iconColor: "text-purple-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
      },
      {
        icon: Calendar,
        title: "25th Edition",
        desc: "Legacy of excellence",
        iconColor: "text-purple-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
      },
      {
        icon: Users,
        title: "Network",
        desc: "Industry connects",
        iconColor: "text-purple-400",
        iconDropShadow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
      }
    ],
    boxClasses:
      "group space-y-8 p-10 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-800/50 shadow-[0_0_50px_rgba(168,85,247,0.1)] hover:shadow-[0_0_80px_rgba(168,85,247,0.2)] transition-all duration-700"
  }
];
