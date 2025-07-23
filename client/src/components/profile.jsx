import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findMyPosts, setDatas } from "../action";
import { Image, Card, Button, Input, Upload } from "antd";
import { CommentOutlined, HeartOutlined, UploadOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Profile = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.data.myPosts);
  const auth = useSelector( state => state.auth.payload.email )


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(findMyPosts());
  }, [dispatch]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("Все поля обязательны!");
      return;
    }
    await dispatch(createPost(title, content, image));
    setTitle("");
    setContent("");
    setImage(null);
    dispatch(setDatas()); // обновляем список после отправки
    alert("Опубликованно")
  };

  const uploadProps = {
    beforeUpload: (file) => {
      setImage(file);
      return false; // не загружаем автоматически
    },
    showUploadList: image ? [{ name: image.name }] : false,
  };

  return (
    <div>
      <div className="create" style={{ maxWidth: 500, marginBottom: 20 }}>
        <h1>{auth}</h1>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ marginBottom: 10 }}
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          style={{ marginBottom: 10 }}
        />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
        </Upload>
        <Button type="primary" onClick={handlePost} style={{ marginTop: 10 }}>
          Запостить
        </Button>
      </div>

      {datas.map((d) => (
        <div key={d._id} className="main" style={{ marginBottom: 20 }}>
          <Card
            hoverable
            style={{ width: 500 }}
            cover={<Image src={`http://localhost:3001${d.imageUrl}`} />}
            className="card"
          >
            <Meta title={d.title} description={d.content} />
            <div className="items" style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <p><CommentOutlined /> {d.comments.length}</p>
              <p><HeartOutlined /> {d.likes.length}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Profile;
