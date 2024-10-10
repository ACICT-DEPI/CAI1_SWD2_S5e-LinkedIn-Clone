const SearchInput = () => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search messages"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-200"
      />
    </div>
  );
};

export default SearchInput;
