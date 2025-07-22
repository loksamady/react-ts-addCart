import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";
const Store = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center py-12 text-2xl font-bold">
        {/* <h1 className="mb-8">Store Page</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-12">
          {storeItems.map((item) => (
            <StoreItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
