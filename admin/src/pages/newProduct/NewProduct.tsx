import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { addProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import "./newProduct.css";

interface ProductInput {
  title: string;
  desc: string;
  img: string;
  categories: string;
  size: string;
  color: string;
  price: number;
  inventory: number;
  inStock: boolean;
}

export default function NewProduct() {
  const [inputs, setInputs] = useState<ProductInput>({
    title: "",
    desc: "",
    img: "",
    categories: "",
    size: "",
    color: "",
    price: 0,
    inventory: 1,
    inStock: true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === "inStock" ? value === "true" : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const formattedProduct = {
              ...inputs,
              img: downloadURL,
              categories: inputs.categories ? inputs.categories.split(",").map(cat => cat.trim()) : [],
              size: inputs.size ? inputs.size.split(",").map(s => s.trim()) : [],
              color: inputs.color ? inputs.color.split(",").map(c => c.trim()) : [],
              price: Number(inputs.price),
              inventory: Number(inputs.inventory),
            };
            addProduct(formattedProduct, dispatch).then(() => {
              setSuccessMessage("Product added successfully!");
              setTimeout(() => {
                navigate("/products"); // Redirect after a short delay
              }, 2000);
            });
          });
        }
      );
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add New Product</h1>
      {successMessage && (
      <div className="successMessageContainer">
        <div className="successMessage">{successMessage}</div>
      </div>
    )} {/* Display success message */}
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Product Title" name="title" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea placeholder="Product Description" name="desc" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Electronics, Gadgets" name="categories" onChange={handleChange} />
          <small>Comma-separated values</small>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="S, M, L" name="size" onChange={handleChange} />
          <small>Comma-separated values</small>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="Red, Blue, Black" name="color" onChange={handleChange} />
          <small>Comma-separated values</small>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="Price" name="price" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Inventory</label>
          <input type="number" placeholder="Inventory" name="inventory" onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select name="inStock" onChange={handleChange} required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" type="submit">Create Product</button>
      </form>
    </div>
  );
}
