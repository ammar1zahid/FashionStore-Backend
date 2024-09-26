import "./productList.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

interface ProductRow {
  id: string;
  img: string;
  name: string;
  stock: number;
  status: string;
  price: string;
}

export default function ProductList() {
  const dispatch = useDispatch();
  const productsData = useSelector((state: RootState) => state.product || { products: [] });
  const [data, setData] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(dispatch);
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  const products = useMemo(() => productsData.products, [productsData.products]);

  useEffect(() => {
    if (products && products.length > 0) {
      const mappedProducts = products.map((product) => ({
        id: product._id as string,
        img: product.img || "",
        name: product.title,
        stock: product.inventory || 0,
        status: product.inStock ? "Available" : "Out of Stock",
        price: `$${product.price.toFixed(2)}`,
      }));
      setData(mappedProducts);
    }
  }, [products]);

  const handleDelete = (id: string) => {
    deleteProduct(id, dispatch);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => (
        <div className="productListItem">
          <img className="productListImg" src={params.row.img} alt="" />
          {params.row.name}
        </div>
      ),
    },
    { field: "stock", headerName: "Stock", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "price", headerName: "Price", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={"/product/" + params.row.id}>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div className="productList">
      {data.length > 0 ? (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
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
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
