import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { makeRequest } from "../../axios";
import { RootState } from "../../redux/store";
import { updateProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"; // Adjust the path as needed

interface StatsItem {
  _id: number;
  total: number;
}

interface Product {
  _id?: string;
  title: string;
  desc: string;
  img: string;
  categories?: string[];
  size?: string[];
  color?: string[];
  price: number;
  inventory: number;
  inStock: boolean;
}

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState<{ name: string; Sales: number }[]>([]);
  const [inputs, setInputs] = useState<Product>({
    title: "",
    desc: "",
    img: "",
    categories: [],
    size: [],
    color: [],
    price: 0,
    inventory: 0,
    inStock: true,
  });
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.product.products.find((product: Product) => product._id === productId)
  );

  useEffect(() => {
    if (product) {
      setInputs({
        title: product.title,
        desc: product.desc,
        img: product.img,
        categories: product.categories || [],
        size: product.size || [],
        color: product.color || [],
        price: product.price,
        inventory: product.inventory,
        inStock: product.inStock,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "categories" || name === "size" || name === "color") {
      setInputs((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: name === "inStock" ? value === "true" : value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed:", error);
        },
        async () => {
          // Handle successful uploads
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const formattedProduct = {
            ...inputs,
            img: downloadURL,
            price: Number(inputs.price),
            inventory: Number(inputs.inventory),
          };
          if (productId) {
            updateProduct(productId, formattedProduct, dispatch);
          }
        }
      );
    } else {
      const formattedProduct = {
        ...inputs,
        price: Number(inputs.price),
        inventory: Number(inputs.inventory),
      };
      if (productId) {
        updateProduct(productId, formattedProduct, dispatch);
      }
    }
  };

  const MONTHS = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await makeRequest.get(`orders/all/income?pid=${productId}`);
        const list: StatsItem[] = res.data.sort((a: StatsItem, b: StatsItem) => a._id - b._id);
        list.forEach((item: StatsItem) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.error(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt={product?.title} className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product?.inStock ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            <label>Description</label>
            <input
              type="text"
              name="desc"
              value={inputs.desc}
              onChange={handleChange}
              placeholder="Enter product description"
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChange}
              placeholder="Enter product price"
            />
            <label>Categories</label>
            <input
              type="text"
              name="categories"
              value={(inputs.categories ?? []).join(",")}
              onChange={handleChange}
              placeholder="Enter categories, separated by commas"
            />
            <label>Size</label>
            <input
              type="text"
              name="size"
              value={(inputs.size ?? []).join(",")}
              onChange={handleChange}
              placeholder="Enter sizes, separated by commas"
            />
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={(inputs.color ?? []).join(",")}
              onChange={handleChange}
              placeholder="Enter colors, separated by commas"
            />
            <label>Inventory</label>
            <input
              type="number"
              name="inventory"
              value={inputs.inventory}
              onChange={handleChange}
              placeholder="Enter inventory count"
            />
            <label>In Stock</label>
            <select
              name="inStock"
              value={inputs.inStock.toString()}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={inputs.img}
                alt={inputs.title}
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <button className="productButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
