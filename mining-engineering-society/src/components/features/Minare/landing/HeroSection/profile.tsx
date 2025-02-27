import React, { useState } from "react";
import {
  UserCircle2,
  X,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserFormInterface } from "@/config/Minare/Registration/type";
import Image from "next/image";
// import { UserFormInterface } from "../types/user";

export const Profile = ({ userData }: { userData: UserFormInterface }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-28 right-8 z-50 w-16 h-16 rounded-full bg-white/10 hover:bg-white/5 hover:scale-105 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg shadow-black/20"
        >
          {<UserCircle2 className="w-8 h-8 text-white/70" />}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm h-screen z-40">
              <div className="fixed inset-y-0 right-0 w-[20%] h-screen min-w-[340px] z-50">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 1
                  }}
                >
                  <div className="h-full bg-gradient-to-b from-zinc-900/90 to-black/90 backdrop-blur-md border-l border-white/10">
                    <div className="relative h-full overflow-auto">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                      </button>

                      <div className="p-8 pt-20">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full border-2 border-white/10 overflow-hidden ring-4 ring-white/5 ring-offset-4 ring-offset-black">
                              <Image
                                src="https://res.cloudinary.com/dehegwbs0/image/upload/v1739454607/vdo9fix806bqzzqg58l0.svg"
                                width={80}
                                height={80}
                                alt="Profile"
                                className="w-full h-full object-cover grayscale"
                              />
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="mt-8 space-y-6">
                            <h2 className="text-2xl font-light text-center text-white tracking-wider">
                              {userData.fullname}
                            </h2>

                            <div className="space-y-4 rounded-2xl p-6 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-lg border border-white/10 shadow-xl shadow-black/20">
                              {[
                                { icon: Mail, value: userData.email },
                                { icon: Phone, value: userData.phonenumber },
                                {
                                  icon: GraduationCap,
                                  value: userData.collegename
                                },
                                { icon: BookOpen, value: userData.branch },
                                {
                                  icon: Calendar,
                                  value: `Class of ${userData.graduationyear}`
                                }
                              ].map((item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                  <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300 group">
                                    <item.icon className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors duration-300" />
                                    <span className="text-sm text-white/70 font-light tracking-wide group-hover:text-white/90 transition-colors duration-300">
                                      {item.value}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
