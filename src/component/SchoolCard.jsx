function SchoolCard({ school }) {
  return (
    <div className="border rounded shadow bg-white">
      <img
        src={`data:image/jpeg;base64,${school.image}`}
        className="h-40 w-full object-cover rounded-t"
        alt=""
      />
      <div className="p-3">
        <h2 className="font-semibold text-lg">{school.name}</h2>
        <p className="text-sm">{school.address}</p>
        <p className="text-sm text-gray-600">{school.city}</p>
      </div>
    </div>
  );
}
export default SchoolCard;
