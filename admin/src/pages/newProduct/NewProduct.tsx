import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import "./newProduct.css";

// Define the interface for the product inputs
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
  const [file, setFile] = useState<File | null>(null); // State to manage the file
  const dispatch = useDispatch();

  // Handle input change for fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert the `inStock` field from string to boolean
    setInputs(prev => ({
      ...prev,
      [name]: name === "inStock" ? value === "true" : value
    }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upload the file to Firebase Storage and get the download URL
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const formattedProduct = {
              ...inputs,
              img: downloadURL, // Set the image URL from Firebase Storage
              categories: inputs.categories ? inputs.categories.split(",").map(cat => cat.trim()) : [],
              size: inputs.size ? inputs.size.split(",").map(s => s.trim()) : [],
              color: inputs.color ? inputs.color.split(",").map(c => c.trim()) : [],
              price: Number(inputs.price),
              inventory: Number(inputs.inventory),
            };
            addProduct(formattedProduct, dispatch);
          });
        }
      );
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
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
        <button className="addProductButton" type="submit">Create</button>
      </form>
    </div>
  );
}
