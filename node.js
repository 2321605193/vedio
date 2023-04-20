const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" }); // 指定上传文件的保存目录

// 接收音频文件并保存
app.post("/upload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    res.status(400).send("未上传音频文件");
    return;
  }

  // 获取保存的文件路径
  const filePath = path.join(__dirname, req.file.path);

  // 在此处可以进行对音频文件的处理，例如存入数据库、转码等操作

  // 返回文件路径给前端
  res.json({ fileUrl: filePath });
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器已启动，监听端口 3000");
});
