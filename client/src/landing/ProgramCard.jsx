const ProgramCard = ({ program, isVisible, delay }) => {
    return (
      <div
        className={`
          bg-white rounded-3xl p-10
          shadow-[0_25px_60px_rgba(0,0,0,0.15)]
          hover:shadow-[0_35px_90px_rgba(37,99,235,0.35)]
          border-2 border-gray-300
          hover:border-blue-600
          transition-all duration-700 ease-out
          hover:cursor-pointer
          transform hover:-translate-y-4 hover:scale-[1.02]
          flex flex-col items-center text-center
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Logo Box */}
        <div
          className="
            w-full h-36 mb-10 rounded-2xl
            flex items-center justify-center
            overflow-hidden
          "
        >
          <img
            src={program.logo}
            alt={program.title}
            className="
              max-h-28 object-contain
              transition-all duration-700
              hover:scale-110
            "
          />
        </div>
  
        {/* Program Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {program.title}
        </h3>
  
        {/* Tag */}
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          {program.tag}
        </span>
      </div>
    );
  };
  
  export default ProgramCard;
  