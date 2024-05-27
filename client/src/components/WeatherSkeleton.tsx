export default function WeatherSkeleton() {
    return (
        <div className='py-4 bg-onSurface/5 animate-pulse w-full flex flex-col justify-center items-center
            h-[318px] rounded-lg border-2 border-onSurface/15 overflow-hidden'
        >
            <div className="bg-onSurface/10 w-[4rem] h-[3rem] my-1 rounded-md"></div>
            <div className="bg-onSurface/10 w-[1.7rem] h-[1.7rem] mt-4 mb-1 rounded-md"></div>
            <div className="bg-onSurface/10 w-[8rem] h-[16px] my-1 rounded-md"></div>
            <div className='mt-6 flex flex-col justify-center items-center gap-1 w-full'>
                <div className='rounded-full bg-onSurface/10 w-[94%] h-[12px]'></div>
                <div className='rounded-lg bg-onSurface/10 w-[95%] h-[20px] my-2'></div>
                <div className='rounded-full bg-onSurface/10 w-[94%] h-[12px]'></div>
            </div>
        </div>
    );
};
