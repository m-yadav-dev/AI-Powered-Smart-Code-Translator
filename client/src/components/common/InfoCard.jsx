const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className=" text-emerald-300 font-[500]">{label}</h3>
      <p className="text-emerald-300">{value}</p>
    </div>
  );
};

export default InfoCard;
