import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addcomment, setDatas, toggleLike } from "../action";
import { Image, Card, Button, Input, Space } from "antd";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Main = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.data.posts);

  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [value, setValue] = useState("");

  // 🔑 Вытаскиваем userId из токена один раз
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const userId = getUserId(); // 👈 один раз получаем

  const hasUserLiked = (likesArray) => {
    if (!userId) return false;
    return likesArray.some((id) => id.toString() === userId);
  };

  const handdleComment = (id) => {
    dispatch( addcomment( id, value) )
  }

  useEffect(() => {
    dispatch(setDatas());
  }, [dispatch]);

  return (
    <div>
      {datas.map((d) => (
        <div key={d._id} className="main">
          <Card
            hoverable
            style={{ width: 500, }}
            cover={<Image src={`http://localhost:3001${d.imageUrl}`} />}
            className="card"
          >
            <h4>{d.author.username}</h4>
            <Meta title={d.title} description={d.content} />
            <div className="items">
              <p>
                <CommentOutlined
                  onClick={() =>
                    setActiveCommentPostId(
                      d._id === activeCommentPostId ? null : d._id
                    )
                  }
                />{" "}
                {d.comments.length}
              </p>
              <p>
                <HeartOutlined
                  style={{ color: hasUserLiked(d.likes) ? "red" : "gray" }}
                  onClick={() =>
                    userId && dispatch(toggleLike(d._id))
                  }
                />{" "}
                {d.likes.length}
              </p>
            </div>
          </Card>

          {activeCommentPostId === d._id && (
            <div className="comments">
              {[...d.comments].reverse().map((c) => (
                <div className="comment" key={c._id}>
                  <h5>{c.user.username}</h5> <p>{c.text}</p>
                </div>
              ))}
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={()=> handdleComment(d._id)} type="primary">Отправить</Button>
              </Space.Compact>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Main;
