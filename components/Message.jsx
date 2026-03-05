import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Message = ({role, content}) => {
    return(
        <div className='flex flex-center w-full max-w-3xl text-sm'>
            <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end'}`}>
                <div className={`group relative flex max-w-2xl py-3 rounded-xl ${role === 'user' ? 'bg-[#414158] px-5' : 'gap-3'}`}>
                    <div className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-left-16 top-2.5' : 'left-9 -bottom-6' } transition-all`}>
                        <div className='flex items-center gap-2 opacity-70'>
                            {
                                role === 'user' ? (
                                    <>
                                    <Image src={assets.copy_icon} alt='' className='w-4 cursor-pointer'/>
                                    <Image src={assets.copy_icon} alt='' className='w-4.5 cursor-pointer'/>
                                    </>
                                ):(
                                    <>
                                    <Image src={assets.copy_icon} alt='' className='w-4.5 cursor-pointer'/>
                                    <Image src={assets.regenerate_icon} alt='' className='w-4 cursor-pointer'/>
                                    <Image src={assets.like_icon} alt='' className='w-4 cursor-pointer'/>
                                    <Image src={assets.dislike_icon} alt='' className='w-4 cursor-pointer'/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {
                        role === 'user' ?
                        (
                            <span className='text-white/90'>{content}</span>
                        )
                        :
                        (
                            <>
                            <Image src={assets.logo_icon} alt='' className='h-9 w-9 p-1 border border-white/15 rounded-full'/>
                            <div className='prose prose-invert max-w-none w-full'>
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4">{children}</h1>,
                                        h2: ({children}) => <h2 className="text-xl font-bold text-white mb-3">{children}</h2>,
                                        h3: ({children}) => <h3 className="text-lg font-semibold text-white mb-2">{children}</h3>,
                                        p: ({children}) => <p className="text-white/90 mb-4 leading-relaxed">{children}</p>,
                                        ul: ({children}) => <ul className="list-disc list-inside text-white/90 mb-4 space-y-2">{children}</ul>,
                                        ol: ({children}) => <ol className="list-decimal list-inside text-white/90 mb-4 space-y-2">{children}</ol>,
                                        li: ({children}) => <li className="text-white/90">{children}</li>,
                                        code: ({inline, children}) => 
                                            inline ? 
                                            <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm">{children}</code> :
                                            <code className="block bg-gray-800 text-green-400 p-3 rounded-lg text-sm overflow-x-auto">{children}</code>,
                                        pre: ({children}) => <pre className="bg-gray-800 p-3 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                                        strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                                        em: ({children}) => <em className="text-white/90 italic">{children}</em>,
                                        blockquote: ({children}) => <blockquote className="border-l-4 border-gray-600 pl-4 text-white/80 italic">{children}</blockquote>,
                                        a: ({href, children}) => <a href={href} className="text-blue-400 hover:text-blue-300 underline">{children}</a>
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Message