'use client';
// import { assets } from "next/image";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";
import PromptBox from '../components/PromptBox'
import Message from '../components/Message'
import { useAppContext } from '@/context/AppContext'

export default function  Home() {
    const [expand, setExpand] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { selectedChat } = useAppContext()

    return (
        <div>
            <div className="flex h-screen">
                <Sidebar expand={expand} setExpand={setExpand}/>
                <div className="flex-1 flex flex-col items-center px-4 pb-8 bg-[#292a2d] text-white relative overflow-hidden">
                    <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
                        <Image onClick={()=> (expand ? setExpand(false):setExpand(true))}
                        className="rotate-180" src={assets.menu_icon} alt=""/>
                        <Image className="ocacity-70" src={assets.menu_icon} alt=""/>
                    </div>

                    <div className="flex-1 overflow-y-auto w-full max-w-3xl mt-20 mb-32">
                        {selectedChat && selectedChat.messages && selectedChat.messages.length > 0 ? (
                            selectedChat.messages.map((msg, index) => (
                                <Message key={index} role={msg.role} content={msg.content} />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex  items-center gap-3">
                                    <Image src={assets.logo_icon} alt="" className="h-16"/>
                                    <p className="text-2xl font-medium">Hi, I'm Deepseek.</p>
                                </div>
                                <p className="text-sm mt-2">How can I help you today??</p>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
                        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
                    </div>
                    <p className="text-xs absolute bottom-1 text-gary-500">AI-generated, for referance only</p>
                </div>
            </div>
        </div>
    );
}