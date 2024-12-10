import React, { useEffect, useState } from 'react'
import { projectsData } from '../assets/asserts'
import { motion } from 'framer-motion';

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);

    // transition that moves images slides 
    useEffect(()=>{
        const updateCardsToShow = ()=>{
            if(window.innerWidth >= 1024){
                setCardsToShow(projectsData.length)
            }else{
                setCardsToShow(1)
            };
        };
            updateCardsToShow();

            window.addEventListener('resize', updateCardsToShow);
            return ()=> window.removeEventListener('resize', updateCardsToShow);
    },[])
    const nextProject = ()=>{
        setCurrentIndex((prevIndex)=> {
            if(prevIndex === projectsData.length-2){
                return prevIndex;
            }else{
                return prevIndex + 1;
            }
        })
    }
    const prevProject = ()=>{
        setCurrentIndex((prevIndex)=> {
            if(prevIndex === 0){
                return prevIndex;
            }
            return prevIndex - 1;
        })
    }
  return (
    <motion.div 
    initial={{opacity:0, x:-200}}
    transition={{duration:1}}
    whileInView={{opacity:1, x:0}}
    viewport={{once: true}} 
    className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full over' id='Projects'>
      <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Projects <span className='underline underline-offset-4 decoration-1 under font-light'>Completed</span></h1>
      <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Crafting Space, Building Legacies-Explore Our Portfolio</p>

      {/* slider btuttons */}
      <div className='flex justify-end items-center mb-8'>
        <button onClick={prevProject} className='p-3 bg-gray-200 hover:bg-gray-800 rounded mr-2 transition-all duration-500 ease-in-out' aria-label='Previous Project'>
            <img src="/images/left_arrow.svg" alt="Previous" />
        </button>
        <button onClick={nextProject} className='p-3 bg-gray-200 hover:bg-gray-800 rounded mr-2 transition-all duration-500 ease-in-out' aria-label='Next Project'>
            <img src="/images/right_arrow.svg" alt="Next" />
        </button>
      </div>
      {/* project slider container */}
        <div className='overflow-hidden'>
            <div className='flex gap-8 transition-transform duration-500 ease-in-out' style={{transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`}}>
                {projectsData.map((project, index)=>(
                    <div key={index} className='relative flex-shrink-0 w-full sm:w-1/4'>
                        <img src={project.image} alt={project.title} className='w-full h-auto mb-14'/>
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                                <h2 className='text-xl font-semibold text-gray-800'>{project.title}</h2>
                                <p className='text-gray-500 text-sm'>{project.price} <span className='px-1'>|</span> {project.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
  )
}

export default Projects
