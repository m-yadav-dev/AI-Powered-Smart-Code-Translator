const InfoCard = ({ label, value }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="font-semibold">{label}</h3>
      <p>{value}</p>
    </div>
  );
};

export default InfoCard;
