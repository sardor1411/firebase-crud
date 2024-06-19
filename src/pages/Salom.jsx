import { getDatabase } from "firebase/database";
import { QuerySnapshot, addDoc, collection, deleteDoc, getDocs, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { notification } from 'antd'
import { v4 as uuid } from "uuid";
const database = getDatabase();

function Salom() {
  const [box, setBox] = useState([]);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [img, setImg] = useState('');
  const [id, setId] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  let data = collection(db, 'blogs');

  useEffect(() => {
    onSnapshot(
      data, (snapshot) => {
        let malumot = []
        snapshot.docs.forEach((doc) => {
          malumot.push({ ...doc.data(), id: doc.id })
        });
        setBox(malumot)
      }
    )
  }, []);

  const database = collection(db, 'blogs');

  const handleCreate = async (e) => {
    if (title === "" || des === "" || img === "") {
      return notification.error({
        message: "input bo'sh",
        description: "Malumot to'liq kiritilmagan"
      });
    } else {
      e.preventDefault();
      await addDoc(database, {
        title: title,
        descript: des,
        img: img,
        id: uuid()
      });
      notification.success({
        message: "Ma'lumot kiritildi",
        description: "Sizning barcha ma'lumotlaringiz kiritildi"
      });

      setDes("");
      setTitle("");
      setImg("");
    }
  }

  const handleDelete = async (id) => {
    const deletePost = doc(db, 'blogs', id);
    await deleteDoc(deletePost);
    console.log(id);
  }

  const handleEdit = async(id, title, descript, img) => {
    setId(id);
    setTitle(title);
    setDes(descript);
    setImg(img);
    setShowCreateForm(false);
    setShowUpdateForm(true);
  }

  const handleUpdate = async () => {
    const updateData = doc(db, 'blogs', id);
    await updateDoc(updateData, {id, title, descript: des, img});
    setShowCreateForm(true);
    setShowUpdateForm(false);
    setDes("");
    setTitle("");
    setImg("");
  }

  return (
    <div>
      <div className="flex w-[80%] m-auto justify-center mt-[50px]">
        <label>
          <span>Is:</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="border border-black mx-3 rounded-[20px] text-center h-[35px]" />
        </label>

        <label>
          <span>Ma'lumot:</span>
          <input value={des} onChange={(e) => setDes(e.target.value)} type="text" className="border border-black mx-3 rounded-[20px] text-center h-[35px]" />
        </label>
        <label>
          <span>Rasm:</span>
          <input value={img} onChange={(e) => setImg(e.target.value)} type="text" className="border border-black mx-3 rounded-[20px] text-center h-[35px]" />
        </label>
        <div>
          {showCreateForm && <button onClick={handleCreate} className="border border-black w-[100px] rounded-[25px] h-[35px]">Create</button>}
          {showUpdateForm && <button onClick={handleUpdate} className="border border-black w-[100px] h-[35px] rounded-[25px]">Update</button>}
        </div>
      </div>

      <h1 className="text-center mt-[40px] mb-[40px] text-[25px]">
        DataBase Datas
      </h1>
      <div className="grid grid-cols-3 ">
        {box.map((mall) => {
          return (
            <div className="border border-black w-[400px]  text-center m-auto rounded-[5px] h-[450px] mt-[25px]" key={mall.id}>
              <div className="box">
                <img className="w-[100%] h-[250px]" src={mall.img} alt="" />
                <h3 className="mt-[5%]">Ism: {mall.title}</h3>
                <h2 className="mt-[5%] mb-[5%]">Ma'lumot: {mall.descript}</h2>
                <div className="flex justify-evenly">
                  <button onClick={() => handleEdit(mall.id, mall.title, mall.descript, mall.img)} className="w-[40%] border border-black bg-blue-600 text-white h-[40px] rounded-[5px]">Update</button>
                  <button onClick={() => handleDelete(mall.id)} className="w-[40%] border border-black bg-red-600 text-white h-[40px] rounded-[5px]">Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Salom;
