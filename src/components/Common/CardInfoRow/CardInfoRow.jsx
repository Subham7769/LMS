const CardInfoRow = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      <p>
        {label}: {value}
      </p>
    </div>
  );
};

export default CardInfoRow;
