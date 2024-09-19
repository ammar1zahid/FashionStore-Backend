import "./productList.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

// Define the type for a product row
interface ProductRow {
  id: string; // Use string if the ID is a MongoDB ObjectID
  img: string;
  name: string;
  stock: number;
  status: string;
  price: string;
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product?.products || []); // Handle undefined or null products

  const [data, setData] = useState<ProductRow[]>([]);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Map the products from Redux to match the structure of ProductRow
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedProducts = products.map((product: any) => ({
        id: product._id,
        img: product.img || "", 
        name: product.title,
        stock: product.inventory || 0, 
        status: product.inStock ? "Available" : "Out of Stock", // Set status based on availability
        price: `$${product.price?.toFixed(2)}`, // Format price as string
      }));
      setData(mappedProducts);
    }
  }, [products]);

  const handleDelete = (id: string) => {
    deleteProduct(id, dispatch);
  };

  // Define column configuration with proper typing
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
